document.addEventListener('DOMContentLoaded', function () {

    const Usuario = document.getElementById('Usuario');
    const Contraseña = document.getElementById('Contraseña');
    const ContraseñaRepetida = document.getElementById('ContraseñaRepetida');
    const addForm = document.getElementById('addForm');
    var usuarios = [];

    //envía petición al server
    fetch("/app/login?action=getAll")
    .then(response => response.json())
    .then(data => {
        data.forEach(UsuarioRecibido => {
            usuarios.push(UsuarioRecibido)
        })
    });

    addForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        const formData = new FormData(addForm);
        formData.append('action', "add");
         
        switch (errores()) {
            case 'SinError':
                try { // si respondo con un json puedo enviar directamente el mensaje
                    const response = await fetch('/app/login', {
                        method: 'POST',
                        body: formData
                    });
        
                    if (response.ok) {
                        var Logeado = true;
                        localStorage.setItem('Logeado', Logeado);
                        window.location.href = "../index.html"
                        console.log("Registro exitoso")
                    } else {
                        Toastify({
                            text: "No se pudo registrar",
                            style: {
                                background: "linear-gradient(to right, #dc3545, #dc3545)",
                            },
                            duration: 3000
                        }).showToast();
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                        Toastify({
                            text: "Error en la solicitud para Registrarse",
                            style: {
                                background: "linear-gradient(to right, #dc3545, #dc3545)",
                            },
                            duration: 3000
                        }).showToast();
                }
                break;
            
            case 'UsuarioCaracteres':
                Toastify({
                    text: "Caracteres del nombre de usuario inválidos",
                    style: {
                        background: "linear-gradient(to right, #dc3545, #dc3545)",
                    },
                    duration: 3000
                }).showToast();   
                break;

            case 'UsuarioExiste':
                Toastify({
                    text: "El nombre de usuario ya existe",
                    style: {
                        background: "linear-gradient(to right, #dc3545, #dc3545)",
                    },
                    duration: 3000
                }).showToast();  
                break;

            case 'Contraseña':
                Toastify({
                    text: "Las contraseñas no coinciden",
                    style: {
                        background: "linear-gradient(to right, #dc3545, #dc3545)",
                    },
                    duration: 3000
                }).showToast(); 
                break;
        }     
    });



    function usuarioExistente() {     
        for (const UsuarioRecibido of usuarios) {
            if (UsuarioRecibido.nombreDeUsuario == Usuario.value) {
                return true;
            }
        }
    return false
    }

    function errores() {        
        const regex = /[^a-zA-Z0-9ñÑüÜáéíóúÁÉÍÓÚ\s]/g;
        var booleanUsuarioCaracteres = regex.test(Usuario.value)==true
        var booleanUsuarioExiste = usuarioExistente()
        var booleanContraseña = Contraseña.value != ContraseñaRepetida.value
        
        var estado = booleanUsuarioCaracteres ? "UsuarioCaracteres" : (booleanUsuarioExiste ? "UsuarioExiste" : (booleanContraseña ? "Contraseña" : "SinError"))
        console.log(estado)

        return estado
    }
});