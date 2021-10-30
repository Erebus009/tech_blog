const express = require("express");
const sequelize = require("./config/connection");
const helper = require("./utils/helpers");
const path = require("path");
const session = require("express-session");
const techblogRoutes = require('./routes/techblogRoutes')
const expressHBS = require("express-handlebars");
const hbs = expressHBS.create({ helper });

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "secretWord",
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    // session cookie will DELETE after 15 mins. 900000 miliseconds = 15mins.
    MaxAge: 900000,
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(techblogRoutes);

// Turns PORT into a server by listening and connects DB to it.
app.listen({ port : PORT }, async() => {
console.log(`Server located at http://localhost:${PORT}`);
await sequelize.sync({force : true})  
console.log('Database Synced!');
});
