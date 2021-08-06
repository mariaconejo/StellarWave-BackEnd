const express = require('express');
const mongoose = require('mongoose');
// variables de las rutas
const userRoute = require('./routes/user.route');
const favoriteRoute = require('./routes/favorites.route');
const recentRoute = require('./routes/recent.route');
const playlistRoute = require('./routes/playlist.route');

const app = express();
require('dotenv').config();

// puerto
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 3000;

// informa de los errores
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connection to db established'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// solicitudesde entrada con cargas codificadas en urlencoded se basa en body-parser
app.use(express.json());
app.use(express.urlencoded({
  type: 'application/x-www-form-urlencoded',
  extended: true,
}));

// rutas
app.use('/', userRoute);
app.use('/', favoriteRoute);
app.use('/', recentRoute);
app.use('/', playlistRoute);
app.use('*', (req, res) => {
  res.status(404);
  res.send('Path cannot found');
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
});
