document.addEventListener('DOMContentLoaded', function () {

    const Usuario = document.getElementById('Usuario');
    const Contraseña = document.getElementById('Contraseña');
    const guardarFormBtn = document.getElementById('guardarFormBtn');
    var usuarios = [];
    // const addForm = document.getElementById('addForm');

    //envía petición al server
    fetch("/app/login?action=getAll")
    .then(response => response.json())
    .then(data => {
        data.forEach(UsuarioRecibido => {
            usuarios.push(UsuarioRecibido)  
        })
    });

    guardarFormBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        if (seLogeo()){
            var Logeado = true;
            localStorage.setItem('Logeado', Logeado);
            window.location.href = "../index.html"    
        } else {
            Toastify({
                text: "Usuario o contraseña incorrectos.",
                style: {
                    background: "linear-gradient(to right, #dc3545, #dc3545)",
                },
                duration: 3000
            }).showToast();
        }
    });

    function seLogeo() {
        for (const UsuarioRecibido of usuarios) {
            if (UsuarioRecibido.nombreDeUsuario == Usuario.value && UsuarioRecibido.contraseña == Contraseña.value) {
                return true;
            }
        }
        return false
    }
});



