const express = require('express')
const routes = express.Router()

const helper = require('./utils/helpers')
const path = require('path')
const session = require('express-session')
const PORT = process.env.PORT || 3001;

const expressHBS = require('express-handlebars')
const hbs = expressHBS.create({ helper })
const sequelize = require('./config/connection')

const app = express()
const sequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret:'secretWord',
    resave: true,
    rolling: true, 
    saveUninitalized: true, 
    cookie :{
        // session cookie will DELETE after 15 mins. 900000 miliseconds = 15mins.
        MaxAge: 900000,
    },
    store: new sequelizeStore ({
        db: sequelize
    })
};

app.use(express.json)
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session(sess))

app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')

app.use(routes)

// Turns PORT into a server by listening and connects DB to it. 
sequelize.sync({force: false}).then(() => {
    app.listen(PORT), () => console.log(`Server located at http://localhost:${PORT}`);
})

