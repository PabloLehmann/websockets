const producto = [
    {
        titulo: "cuadro 1",
        precio: 12000,
        id: 1,
        thumbnail:"https://drive.google.com/uc?export=view&id=1NH2VuVUBeoC3oZicR-y6CRgmuQ0fvCLp"
    },
    {
        titulo: "cuadro 2",
        precio: 22000,
        id: 2,
        thumbnail:"https://drive.google.com/uc?export=view&id=1NH2VuVUBeoC3oZicR-y6CRgmuQ0fvCLp"
    },
    {
        titulo: "cuadro 3",
        precio: 15000,
        id: 3,
        thumbnail:"https://drive.google.com/uc?export=view&id=1NH2VuVUBeoC3oZicR-y6CRgmuQ0fvCLp"
    },
]

const productos = ()=>{
  return producto
}

    const guardarProducto = (productoNuevo)=>{
    let lastIndex = producto.length - 1
    let lastId = producto[lastIndex].id
    let newId = parseInt(lastId) + 1
    const newProduct = { ...productoNuevo, id: newId }
    producto.push(newProduct)
    return producto
}

module.exports= {productos, guardarProducto}