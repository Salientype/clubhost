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
const ejsLint = require('ejs-lint');

const bcrypt = require('bcrypt');

const Sequelize = require('sequelize')
const GroupsModel = require('./models/groups')
const ActivitiesModel = require('./models/activities')

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
const Activities = ActivitiesModel(sequelize, Sequelize);

Groups.hasMany(Activities, {foreignKey: 'group_id'});
Activities.belongsTo(Groups, {foreignKey: 'group_id'});


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.set('view engine', 'ejs');

var sess;

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

app.get('/create_activity', function(req, res) {
    res.render('pages/create_activity');
});

app.get('/group_info/:id', function(req, res) {
    let id = req.params.id;
    const group = Groups.findOne({ where: { id: id } }).then(results => {
        res.render('pages/group_info', { group: results });
    })
    
    .catch(function(e) {
        return 'no results'
    })
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/' + 'login.html');
});

app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/public/' + 'register.html');
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

// add a group to DB
app.post('/api/groups', function (req, res) {
    let data = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        logo_link: req.body.logo_link
    };
    Groups.create(data).then(function (group) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(group));
    }).catch(function(e) {
        res.status(434).send('unable to create group')
    })
});

app.get('/api/activities', function (req, res) {
    const activities = Activities.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function(e) {
        console.log(e);
        res.status(434).send('error retrieving activities');
    })
});

app.post('/api/activities', function (req, res) {
    let data = {
        title: req.body.title,
        description: req.body.description,
        // date: req.body.date,
        // is_private: req.body.is_private,
        group_id: req.body.group_id
    };
    Activities.create(data).then(function (activity) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(activity));
    }).catch(function(e) {
        res.status(434).send('unable to create activity')
    })
});

// app.delete('/api/groups/:id', function (req, res) {
//     let id = req.params.id
//     Groups.destroy({
//         where: {
//             id: id
//         }
//     }).then(function(rowDeleted) {
//         if(rowDeleted === 1){
//             console.log('Deleted successfully');
//             }
//         }, function(err){
//         console.log(err);
//     })
// })

app.post('/api/login', function (req, res) {
    let email = req.body.email.toLowerCase().trim();
    let password = req.body.password;
    if (email && password) {
        Users.findOne({
            where: {
                email: email
            },
        }).then((results) => {
            bcrypt.compare(password, results.password).then(function(matched) {
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
    console.log(req.body.email);
  let data = {
      name: req.body.name,
      email: req.body.email.toLowerCase().trim(),
      password: req.body.password
  };
  if (data.name && data.email && data.password) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(data.password, salt);
      data['password'] = hash;
      Users.create(data).then(function (user) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(user));
      });;
  } else {
      res.status(434).send('Name, email and password is required to register')
  }
});

app.listen(3000);
console.log('Clubs are listening');