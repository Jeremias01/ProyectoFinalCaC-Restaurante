var imagenDefectoFile = null;

document.addEventListener('DOMContentLoaded', function () {

    var nombreInput = document.getElementById('nombre');
    var descripcionInput = document.getElementById('descripcion');
    var precioInput = document.getElementById('precio');
    var Principal = document.getElementById('principal');
    var Entrada = document.getElementById('entrada');
    var Postre = document.getElementById('postre');
    var Aperitivo = document.getElementById('aperitivo');
    var aptoCeliacoInput = document.getElementById('aptoCeliaco');
    var aptoVeganoInput = document.getElementById('aptoVegano');
    var enFaltaInput = document.getElementById('enFalta');
    const imagenElement = document.getElementById('imagen');
    const imagenPreview = document.getElementById('imagenPreview');
    const imagenContainer = document.getElementById('imagenContainer');
    var id_editar = localStorage.getItem('id_editar');

    function loadPlato() {
        //envía petición al server
        fetch("/app/menu?action=getAll")
                .then(response => response.json())
                .then(data => {
                    inputPlato(data);
                });
    }
    loadPlato();
    function inputPlato(data) {
        data.forEach(plato => {
            if (id_editar==plato.platoId){
                nombreInput.value=plato.nombre;
                descripcionInput.value=plato.descripcion;
                precioInput.value=plato.precio;
                eval(plato.tipoPlato).checked=true;          
                aptoCeliacoInput.checked=plato.aptoCeliaco;
                aptoVeganoInput.checked=plato.aptoVegano;
                enFaltaInput.checked=plato.enFalta;
                if(plato.imagenBase64){
                    var hayImg = true;
                    imagenDefectoFile = `data:img/jpeg;base64,${plato.imagenBase64}`
                    imagenPreview.src = imagenDefectoFile;                    
                    imagenContainer.classList.remove("d-none");
                } else {
                    var hayImg= false;
                    imagenElement.required = true;
                    // tengo que sacarlo, no se puede crear plato sin imagen
                }
            }
        })
    }
})


