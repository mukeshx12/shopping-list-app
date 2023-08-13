const express = require('express');
const ejs = require('ejs');
var connection = require('./sqlConnection');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public1'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('top');
});


// Add the route for the list page
app.get('/index', (req, res) => {
    
    connection.query(
      'SELECT * FROM items',
      (error, results) => {
    
        res.render('index.ejs',{items: results});               
          
      });
    
});

// Add a route to display the create page
app.get('/new', (req,res)=>{
    res.render('new.ejs');
});

// Add a route method for creating items
app.post('/create', (req, res) => {
    // Write a query to add data to the database
    console.log(req.body.itemName);
    let sql = "INSERT INTO items (name) VALUES (?)";
    let value = req.body.itemName;
    connection.query(sql, [value], function(err,result){
      if(err) console.log(err);
      // else console.log("Added");
          res.redirect('/index');
    })
    

});

// Add a route for deleting items
app.post('/delete/:id',(req,res)=>{
  
  connection.query(
    'DELETE FROM items where id=?',
    [req.params.id],(error,results)=>{
      res.redirect('/index');
    });
});

app.get('/edit/:id', (req, res) => {
  // Write code to get the selected item from the database
  connection.query('SELECT* FROM items WHERE id = ?',[req.params.id],
  (error,results)=>{
    res.render('edit.ejs',{item: results[0]});
  }
  
  );
  
  
});

// Add a route for updating items
app.post('/update/:id',(req,res)=>{
  connection.query('UPDATE items set name=? where id =?',[req.body.itemName, req.params.id],
  (error,results)=>{
    res.redirect('/index');
  });
})


app.listen(3001, () => console.log("port is running at server  port 3001"));
module.exports = app;