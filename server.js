const express = require("express");
const sequelize = require("./config/connection");

const helper = require("./utils/helpers");
const path = require("path");


const route = require('./controllers')
const session = require("express-session");
const expressHBS = require("express-handlebars");

const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);





const sess = {
  secret: "secretWord",
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    // session cookie will DELETE after 15 mins. 900000 miliseconds = 15mins.
    maxAge: 9000,
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


const hbs = expressHBS.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(route);


// Turns PORT into a server by listening and connects DB to it.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
});
