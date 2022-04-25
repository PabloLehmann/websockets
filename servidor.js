const express = require('express');
const routerProductos = require("./routers/index")
const{ productos, guardarProducto} = require ("./controllers/container")

const { Server: HttpServer } = require ("http")
const { Server: IOServer } = require ("socket.io")



const app = express();
const httpServer = new HttpServer (app)
const io = new IOServer (httpServer)

const handlebars = require('express-handlebars');


app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/public/views/layouts',
        partialsDir: __dirname + '/public/views/partials'
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
        texto: "Hola",
        date: "Wed Apr 20 2022 18:22:41 GMT-0300 (hora estándar de Argentina)"
    },
    {
        autor: "Veronica",
        texto: "Hola",
        date: "Wed Apr 20 2022 18:22:41 GMT-0300 (hora estándar de Argentina)"
    },
    {
        autor: "Franco",
        texto:"Hola",
        date: "Wed Apr 20 2022 18:22:41 GMT-0300 (hora estándar de Argentina)"
    }
]
console.log(dataMensaje);
io.on ("connection", (socket) =>{
    console.log("Usuario conectado");
    
    socket.emit("mensaje", dataMensaje)
    socket.on("new-message", (data) =>{
        dataMensaje.push(data)
        io.sockets.emit("mensaje", dataMensaje)

    })
    socket.emit("productos", productos())
    socket.on("new-producto", (producto)=>{
        guardarProducto(producto)
        io.sockets.emit("productos", productos())
    })
})