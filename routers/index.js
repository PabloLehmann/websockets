const express = require ("express")
const {Router} = express
const {productos, guardarProducto} = require ("../controllers/container.js")

const routerProductos = Router();

routerProductos.get("/", (req,res) =>{
    let producto = productos()
    res.render("main", {productos: producto})
})


module.exports= routerProductos