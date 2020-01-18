require('dotenv').config();

const config = {
    
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,

};

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const GroupsModel = require('./models/groups');
const UsersModel = require('./models/users');

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {

    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

})

console.log(connectionString)

const Groups = GroupsModel(sequelize, Sequelize);
const Users = UsersModel(sequelize, Sequelize);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/groups', function (req, res) {
    const groups = Groups.findAll().then((results) => {
        res.render('pages/groups', { groups: results });
    }).catch(function (e) {
        return 'no results'
    })
});

app.get('/create_group', function (req, res) {
    res.render('pages/create_group');
});

app.get('/group_info/:id', function (req, res) {
    let id = req.params.id;
    const group = Groups.findOne({ where: { id: id } }).then(results => {
        res.render('pages/group_info', { group: results });
    }).catch(function (e) {
        return 'no results'
    })
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'login.html');
});

app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'register.html');
});

app.get('/api/groups', function (req, res) {
    Groups.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
        res.status(434).send('error retrieving groups');
    })
});

// add a group to DB
app.post('/api/groups', function (req, res) {
    let data = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.description,
        logo_link: req.body.logo_link
    };
    Groups.create(data).then(function (group) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(group));
    }).catch(function (e) {
        res.status(434).send('unable to create group')
    })
});

app.post('/api/login', function (req, res) {
    
    let email = req.body.email.toLowerCase().trim();
    let password = req.body.password;
    if (email && password) {
        Users.findOne({
            where: {
                email: email
            },
        }).then((results) => {
            bcrypt.compare(password, results.password).then(function (matched) {
                if (matched) {
                    req.session.user = results.id;
                    req.session.name = results.name;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                } else {
                    res.status(434).send('Email/Password combination did not match')
                }
            });
        }).catch((e) => {
            res.status(434).send('Email does not exist in the database')
        });
    } else {
        res.status(434).send('Both email and password is required to login')
    }
    
});

app.post('/api/register', function (req, res) {
    
    let data = {
        
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
        email: req.body.email.toLowerCase().trim(),
        password: req.body.password

    };
    
    if (data.first_name && data.last_name && data.email && data.password) {
        
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        data['password_hash'] = hash;

        Users.create(data).then(function (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        });

    } else {
        
        res.status(434).send('First and Last name, email and password is required to register')
    
    }

});

app.listen(3000);
console.log('Clubs are listening');