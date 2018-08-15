 const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {

  var now = new Date().toString();

  var log = '${now}: ${req.method} ${req.url}';

  console.log(log);
  fs.appendFile('server.log',log + '\n');
  next();
});

app.get('/', (request,response) => {

	response.render('home.hbs',{
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear : new Date().getFullYear()
  });
})
app.get('/bad',(req,res) => {

  res.send({
    error:'Unable to send'
  });
});


app.listen(port, () => {
  console.log('Server is up on port' + port);
});
