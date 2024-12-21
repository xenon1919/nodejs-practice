const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// Express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://rishi:ucantcatchme@nodetuts.it5x8ol.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
  .then((result) => {
    console.log('Connected to MongoDB');
    // Listen for requests only after the DB connection is established
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => console.log('DB Connection Error: ', err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

app.use((req,res,next)=> {
  res.locals.path=req.path
  next()
})


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
