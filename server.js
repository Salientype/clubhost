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
// const passport = require('passport');
// var express = require('express')
//   , http = require('http')
//   , util = require('util')
//   , LinkedInStrategy = require('passport-linkedin').Strategy;

const Sequelize = require('sequelize')
const GroupsModel = require('./models/groups')
const UsersModel = require('./models/users')
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
const Users = UsersModel(sequelize, Sequelize);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }

}))

// res.render('pages/users', {users: {firstName: "testfirstname", lastName: "test-last name", email: "req.session.email"}});

// API get groups endpoint
app.get('/api/groups', function (req, res) {
    
    Groups.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
        res.status(434).send('error retrieving groups');
    })

});

// render all groups on page view
app.get('/groups', function (req, res) {
    
    Groups.findAll().then((results) => {
        res.render('pages/groups', { groups: results });
    }).catch(function (e) {
        return 'no results'
    })

});


// API endpoint get info on selected group
app.get('/api/group_info/:id', function(req, res) {
    
    let id = req.params.id;
    
    Groups.findOne({ where: { id: id } }).then(results => {
        
        if (results) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        } else {
            res.status(434).send('group does not exist is DB');
        }

    }).catch(function (e) {
        console.log(e);
        res.status(434).send('error retrieving info on group');
    })
    
});

// render single group info to page
app.get('/group_info/:id', function(req, res) {
    
    let id = req.params.id;
    
    Groups.findOne({ where: { id: id } }).then(results => {
        res.render('pages/group_info', { group: results });
    }).catch(function (e) {
        return 'no results'
    })

});

// API update selected group 
app.put('/api/update_group', function (req, res) {

    let data = {

        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        logo_link: req.body.logo_link

    };

    Groups.findOne({ where: { id: data.id } }).then(function (group) {
        
        group.update({

            name: data.name,
            description: data.description,
            category: data.category,
            logo_link: data.logo_link

        }).then(function (newData) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newData));
        }).catch(function (e) {
            res.status(434).send('unable to update group')
        })
        
    }).catch(function (e) {
        res.status(434).send('unable to find group')
    })
    

});

// API delete selected group
app.delete('/api/destroy_group', function (req, res) {

    let data = {
        id: req.body.id
    };

    Groups.destroy({ where: { id: data.id } }).then(function (group) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(group));
    }).catch(function (e) {
        res.status(434).send('unable to delete group')
    })

});


// API get users of selected group endpoint
app.get('/api/users_in_group/:id', function(req, res) {
    
    let id =  req.params.id;
    
    Users.findAll({ where: { group_id: id } }).then(results => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
        res.status(434).send('error retrieving groups');
    })
    
});

app.get('/create_group', function (req, res) {
    res.render('pages/create_group');
});

app.get('/create_activity', function(req, res) {
    res.render('pages/create_activity');
});

app.get('/login', function (req, res) {
    res.render('pages/login');
});

app.get('/users', function (req, res) {
    if (req.session.user) {
        res.render('pages/users', { users: req.session.user });
    } else {
        res.redirect('/register');
    }
});

app.get('/register', function (req, res) {
    res.render('pages/register');
});

// API add a group to DB
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
    }).catch(function (e) {
        res.status(434).send('unable to create group')
    })

});

app.get('/api/activities', function (req, res) {
    Activities.findAll().then((results) => {
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

// API get single user's info
app.get('/api/user/:id', function(req, res){

    let id = req.params.id;
    
    Users.findOne({ where: { id: id } }).then(results => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    }).catch(err => {
        console.log(err);
        res.status(434).send('error retrieving info on user')
    });

});

// API update a single user's info
// app.put('/api/user/:id', function (req, res) {

//     let data = {

//         id: req.params.id.toString(),
//         first_name: req.body.first_name.trim(),
//         last_name: req.body.last_name.trim(),
//         email: req.body.email.toLowerCase().trim(),
//         password_hash: req.body.password.trim(),
//         gender: req.body.gender,
//         group_id: req.body.group_id,
//         is_admin: req.body.is_admin

//     };

//     Users.findOne({ where: { id: data.id } }).then( user => {
        
//         if (data.password_hash != null) {

//             var salt = bcrypt.genSaltSync(10);
//             var hash = bcrypt.hashSync(data.password_hash, salt);
//             data.password_hash = hash;
    
//         }

//         user.update({

//             first_name: data.first_name,
//             last_name: data.last_name,
//             email: data.email,
//             password_hash: data.password_hash,
//             gender: req.body.gender,
//             group_id: req.body.group_id,
//             is_admin: req.body.is_admin

//         }).then(function (newData) {
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(newData));
//         }).catch(function (e) {
//             res.status(434).send('unable to update user')
//         })
        
//     }).catch(function (e) {
//         console.log(e);
//         res.status(434).send(`unable to find user ${data.id}`)

//     })    

// });

app.post('/api/login', function (req, res) {
    
    let email = req.body.email.toLowerCase().trim();
    let password = req.body.password.trim();
    
    if (email && password) {
        Users.findOne({ where: { email: email } }).then( results => {
            bcrypt.compare(password, results.password_hash).then( matched => {
                if (matched) {
                    req.session.user = results.id;
                    //session.first_name = results.first_name;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                } else {
                    res.status(434).send(`${email} and password combination did not match`)
                }
            }).catch((e) => {
                res.status(434).send('bcrypt error')
            })
        }).catch((e) => {
            res.status(434).send('Email does not exist in the database')
        });
    } else {
        res.status(434).send('Both email and password is required to login')
    }
    
});

app.post('/api/register', function (req, res) {
    
    let data = {
        
        firstName: req.body.first_name.trim(),
        lastName: req.body.last_name.trim(),
        email: req.body.email.toLowerCase().trim(),
        password: req.body.password

    };
    
    if (data.firstName && data.lastName && data.email && data.password) {
        
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        data['password'] = hash;

        Users.create(data).then(function (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        });

    } else {
        
        res.status(434).send('First and Last name, email and password is required to register')
    
    }

});

//passport linkedin strategy

// passport.use(new LinkedInStrategy({
//     consumerKey: LINKEDIN_API_KEY,
//     consumerSecret: LINKEDIN_SECRET_KEY,
//     callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));


// app.get('/auth/linkedin',
//   passport.authenticate('linkedin'));

// app.get('/auth/linkedin/callback', 
//   passport.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

//   passport.use(new LinkedInStrategy({
//     // clientID, clientSecret and callbackURL
//     profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
//   },
//   // verify callback
// ));
// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(obj, done) {
//     done(null, obj);
//   });
  
  
//   // Use the LinkedInStrategy within Passport.
//   //   Strategies in passport require a `verify` function, which accept
//   //   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
//   //   invoke a callback with a user object.
//   passport.use(new LinkedInStrategy({
//       consumerKey: LINKEDIN_API_KEY,
//       consumerSecret: LINKEDIN_SECRET_KEY,
//       callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
//     },
//     function(token, tokenSecret, profile, done) {
//       // asynchronous verification, for effect...
//       process.nextTick(function () {
//         // To keep the example simple, the user's LinkedIn profile is returned to
//         // represent the logged-in user.  In a typical application, you would want
//         // to associate the LinkedIn account with a user record in your database,
//         // and return that user instead.
//         return done(null, profile);
//       });
//     }
//   ));
  
//   app.get('/', function(req, res){
//     res.render('index', { user: req.user });
//   });
  
//   app.get('/account', ensureAuthenticated, function(req, res){
//     res.render('account', { user: req.user });
//   });
  
//   app.get('/login', function(req, res){
//     res.render('login', { user: req.user });
//   });
  
//   // GET /auth/linkedin
//   //   Use passport.authenticate() as route middleware to authenticate the
//   //   request.  The first step in LinkedIn authentication will involve
//   //   redirecting the user to linkedin.com.  After authorization, LinkedIn will
//   //   redirect the user back to this application at /auth/linkedin/callback
// //   app.get('/auth/linkedin',
// //     passport.authenticate('linkedin'),
// //     function(req, res){
// //       // The request will be redirected to LinkedIn for authentication, so this
// //       // function will not be called.
// //     });
  
// //   // GET /auth/linkedin/callback
// //   //   Use passport.authenticate() as route middleware to authenticate the
// //   //   request.  If authentication fails, the user will be redirected back to the
// //   //   login page.  Otherwise, the primary route function function will be called,
// //   //   which, in this example, will redirect the user to the home page.
// //   app.get('/auth/linkedin/callback',
// //     passport.authenticate('linkedin', { failureRedirect: '/login' }),
// //     function(req, res) {
// //       res.redirect('/');
// //     });
  
// //   app.get('/logout', function(req, res){
//     req.logout();
//     res.redirect('/');
//   });
  
//   http.createServer(app).listen(app.get('port'), function(){
//     console.log('Express server listening on port ' + app.get('port'));
//   });
  
  
//   // Simple route middleware to ensure user is authenticated.
//   //   Use this route middleware on any resource that needs to be protected.  If
//   //   the request is authenticated (typically via a persistent login session),
//   //   the request will proceed.  Otherwise, the user will be redirected to the
//   //   login page.
//   function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     res.redirect('/login');
//   }







// // var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
 
// // passport.use(new LinkedInStrategy({
// //   clientID: LINKEDIN_KEY,
// //   clientSecret: LINKEDIN_SECRET,
// //   callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
// //   scope: ['r_emailaddress', 'r_liteprofile'],
// // }, function(accessToken, refreshToken, profile, done) {
// //   // asynchronous verification, for effect...
// //   process.nextTick(function () {
// //     // To keep the example simple, the user's LinkedIn profile is returned to
// //     // represent the logged-in user. In a typical application, you would want
// //     // to associate the LinkedIn account with a user record in your database,
// //     // and return that user instead.
// //     return done(null, profile);
// //   });
// // }));
// // //authenticate
// // app.get('/auth/linkedin',
// //   passport.authenticate('linkedin', { state: 'SOME STATE'  }),
// //   function(req, res){
// //     // The request will be redirected to LinkedIn for authentication, so this
// //     // function will not be called.
// //   });
// //   //login callback
// //   app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
// //     successRedirect: '/',
// //     failureRedirect: '/login'
// //   }));
// // // //GET user first, last, and profile pic
// // // GET https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))
// // // //GET email address
// // // GET https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))



app.listen(3000);
console.log('Clubs are listening');