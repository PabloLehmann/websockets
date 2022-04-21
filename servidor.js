const express = require('express');
const { Server: IOServer } = require ("socket.io")
const { Server: HttpServer } = require ("http")

const routerProductos = require('../routers/index.js')

const app = express();
const httpServer = new HttpServer (app)
const io = new IOServer (httpServer)

const handlebars = require('express-handlebars');


app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })        
)
    
app.set('view engine', 'hbs');

app.set("views", "./public/views")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', routerProductos)
app.use(express.static("./public"))




app.get('/', (req, res) => {
    res.render('main');
})


const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const dataMensaje = [
    {
        autor:"Alejandra",
        texto: "Hola"
    },
    {
        autor: "Veronica",
        texto: "Hola"
    },
    {
        autor: "Franco",
        texto:"Hola"
    }
]

io.on ("connection", (socket) =>{
    console.log("Usuario conectado");
    socket.emit("mi mensaje", dataMensaje)


socket.on("new-message", (data) =>{
    dataMensaje.push(data)
    io.sockets.emit("mi mensaje", dataMensaje)

    })
})