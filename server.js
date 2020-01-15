const config = {
    host: 'localhost',
    port: 5432,
    database: 'clubhost',
    username: 'postgres',
    password: '',
};

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');


const Sequelize = require('sequelize')
const GroupsModel = require('./models/groups')

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


var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/groups', function(req, res) {
    const groups = Groups.findAll().then((results) => {
        res.render('pages/groups', { groups: results });
    }).catch(function(e) {
        return 'no results'
    })
});

app.get('/create_group', function(req, res) {
    res.render('pages/create_group');
});

app.get('/group_info', function(req, res) {
    const group = Groups.findOne({ where: { id: 1 } }).then(results => {
        res.render('pages/group_info', { group: results });
    }).catch(function(e) {
        return 'no results'
    })
});

app.get('/api/groups', function (req, res) {
    Groups.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function(e) {
        console.log(e);
        res.status(434).send('error retrieving groups');
    })
});

app.post('/api/groups', function (req, res) {
    let data = {
        name: req.body.name,
        description: req.body.description,
        group_image: req.body.group_image
    };
    Groups.create(data).then(function (group) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(group));
    }).catch(function(e) {
        res.status(434).send('unable to create group')
    })
});


app.listen(3000);
console.log('Clubs are listening');