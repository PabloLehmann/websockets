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
        texto: document.getElementById("textMessage").value
    };
    socket.emit("new-message", mensaje)
    return false
}

socket.on ("mensaje", (dataMensaje) =>{
    render(dataMensaje)
    
})