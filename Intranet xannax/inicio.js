



document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    if(usuario === "20231d071" && contraseña === "74685297") {
        window.location.href = "intranet.html";
    } else {
        alert("usuario o contraseña incorrecta");
    }
}); 