const socket = io.connect()
socket.on ("Mi mensaje", data =>{
    alert(data)
})
