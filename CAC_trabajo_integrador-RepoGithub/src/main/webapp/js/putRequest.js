document.addEventListener('DOMContentLoaded', function () {

    const imagenElement = document.getElementById('imagen');
    const imagenPreview = document.getElementById('imagenPreview');
    const imagenContainer = document.getElementById('imagenContainer');
    var id_editar = localStorage.getItem('id_editar');

    console.log("putRequest")

    imagenElement.addEventListener('change', function () {
        const selectedImage = imagenElement.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log(e);
                imagenPreview.src = e.target.result;
                imagenContainer.classList.remove("d-none");
            };
            reader.readAsDataURL(selectedImage);
        } else {
            imagenPreview.src = "";
        }
    });

    //const guardarFormBtn = document.getElementById('guardarFormBtn');
    const addForm = document.getElementById('addForm');

    addForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        if(imagenPreview.src==imagenDefectoFile){
            var imagenBlob = await fetch(imagenDefectoFile).then(res => res.blob());
        } else {
            var imagenBlob = await fetch(imagenPreview.src).then(res => res.blob())
        }

        const formData = new FormData(addForm);

        formData.set('imagen', imagenBlob, 'imagen');

        formData.append('action', "edit");

        formData.append('id', id_editar);

        // Obtener el valor del tipo de plato seleccionado y agregar al FormData
        const tipoPlatoRadioButtons = document.querySelectorAll('input[name="tipoPlato"]');
        let tipoPlatoSeleccionado;

        tipoPlatoRadioButtons.forEach(function (radioButton) {
            if (radioButton.checked) {
                tipoPlatoSeleccionado = radioButton.value;
            }
        });

        //for (const entry of formData.entries()) {
        //    console.log(entry[0], entry[1]);
        //}

        if (tipoPlatoSeleccionado && (imagenPreview.src != "")){  
            try { // si respondo con un json puedo enviar directamente el mensaje
                const response = await fetch('/app/menu', {
                    method: 'POST',
                    body: formData
                });
    
                if (response.ok) {
                    Toastify({
                        text: "Plato editado exitosamente",
                        style: {
                            background: "linear-gradient(to right, #28a745, #28a745)",
                        },
                        duration: 3000
                    }).showToast();
                } else {
                    Toastify({
                        text: "No se pudo editar el plato",
                        style: {
                            background: "linear-gradient(to right, #dc3545, #dc3545)",
                        },
                        duration: 3000
                    }).showToast();
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                    Toastify({
                        text: "Error en la solicitud para editar el plato",
                        style: {
                            background: "linear-gradient(to right, #dc3545, #dc3545)",
                        },
                        duration: 3000
                    }).showToast();
            }
        } else {
            Toastify({
                text: "Complete los campos.",
                style: {
                    background: "linear-gradient(to right, #dc3545, #dc3545)",
                },
                duration: 3000
            }).showToast();
        }
    });
});