const formulario = document.querySelector("#formulario input")
const listaMensajes = document.querySelector("#lista-tweets")

let mensajes = []

document.addEventListener("DOMContentLoaded", (e) => {
  mensajes = JSON.parse(localStorage.getItem("mensajes")) || []
  pintarHtml()
})

formulario.addEventListener("click", (e) => {
  e.preventDefault()
  if (e.target.previousElementSibling.value.trim() === "") {
    alert("No puedes enviar un tweet vacío.")
    return
  }
  mensajes.push(e.target.previousElementSibling.value)
  e.target.previousElementSibling.value = ""
  localStorage.setItem("mensajes", JSON.stringify(mensajes))
  pintarHtml()
})

function pintarHtml() {
  listaMensajes.innerHTML = ""
  mensajes.forEach((mensaje, index) => {
    const mensajeItem = document.createElement("li")
    const mensajeContent = document.createElement("span")
    const mensajeButton = document.createElement("button")

    mensajeItem.style.display = "flex"
    mensajeItem.style.justifyContent = "space-between"

    mensajeContent.textContent = `@Tweet${index + 1}: ${mensaje}`

    mensajeButton.textContent = "X"
    mensajeButton.addEventListener("click", () => {
      mensajes.splice(index, 1)
      localStorage.setItem("mensajes", JSON.stringify(mensajes))
      pintarHtml()
    })

    mensajeItem.appendChild(mensajeContent)
    mensajeItem.appendChild(mensajeButton)

    listaMensajes.appendChild(mensajeItem)
  })
}