const express = require("express");
const sequelize = require("./config/connection");

const helpers = require("./utils/helpers");
const path = require("path");

const route = require("./controllers");
const session = require("express-session");
const expressHBS = require("express-handlebars");

const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: 'Super secret secret',
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



const hbs = expressHBS.create({
  defaultLayout: "main",
  partialsDir: "views/partials/",
  helpers,
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.use(route);

// Turns PORT into a server by listening and connects DB to it.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
});
