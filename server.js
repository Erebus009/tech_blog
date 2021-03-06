const express = require('express');
var bodyParser = require('body-parser');

const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');


const hbs = exphbs.create({
  defaultLayout: "main",
  partialsDir: "views/partials/",
  helpers,
});



const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret?',
  cookie: {
    maxAge: 6 * 100000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const routes = require('./controllers');

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(routes);

// Turns PORT into a server by listening and connects DB to it.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
});
