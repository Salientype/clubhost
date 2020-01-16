const config = {
    host: 'localhost',
    port: 5432,
    database: 'clubhost',
    user: 'postgres'
};
  
  const express = require('express');
  const bodyParser = require('body-parser');
  const pgp = require('pg-promise')();
  const db = pgp(config);
  const cors = require('cors');
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  
   let group = [
    {
    name: "First Group",
    description: "super awesome group",
        
    }
  ]
  app.get('/api/groups', cors(), (req, res) => {
  res.json(group);
  })
  
  app.post('/api/groups', cors(), (req,res) => {
      
        const data = {
          name: req.body.name,
          description:req.body.description,
        }
          post.push(data);
         res.json(data);
      
    });





app.listen(3000, function(){
    console.log('Clubs are listening');
})
