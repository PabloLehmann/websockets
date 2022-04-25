const socket = io.connect()

function render (data) {
    const html = data.map((elem, index)=>{
        return(`
        <li>
            <strong>${elem.autor}</strong>
            <span>[${elem.date}]: </span>
            <em>${elem.texto}</em>
        </li>
        `)
    }).join(" ")
    document.getElementById("mensaje").innerHTML= html
}
function addMessage(e){
    const date = Date()
    const mensaje={
        autor: document.getElementById("userEmail").value,
        texto: document.getElementById("textMessage").value,
        fecha: date
    };
    socket.emit("new-message", mensaje)
    document.getElementById("textMessage").value=""
    return false
}
/* const template = Handlebars.compile(`
    {{#each productos}}
        <tr>
            <td>{{titulo}}</td>
            <td>{{precio}}</td>
            <td><img src="{{thumbnail}}" alt="{{titulo}}" width="100"></td>
        </tr>
    {{/each}}
`)

function addproducto(e){
    const producto = {
        titulo:document.getElementById("titulo").value,
        precio:document.getElementById("precio").value,
        thumbnail:document.getElementById("thumbnail").value
    }
    console.log(producto);
    socket.emit("new-producto", producto)

    document.getElementById("titulo").value=""
    document.getElementById("precio").value=""
    document.getElementById("thumbnail").value=""

    return false
}

socket.on("productos", (data)=>{
    document.getElementById("productos").innerHTML= template({productos:data})
})
 */
socket.on ("mensaje", (dataMensaje) =>{
    render(dataMensaje)
    
})