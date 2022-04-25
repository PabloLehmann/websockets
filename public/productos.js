const socketP = io.connect()

const template = Handlebars.compile(`
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
socketP.emit("new-producto", producto)

document.getElementById("titulo").value=""
document.getElementById("precio").value=""
document.getElementById("thumbnail").value=""

return false
}

socketP.on("productos", (data)=>{
document.getElementById("productos").innerHTML= template({productos:data})
})
