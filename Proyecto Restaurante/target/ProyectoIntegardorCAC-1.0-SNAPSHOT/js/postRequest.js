document.addEventListener('DOMContentLoaded', function () {

    const imagenElement = document.getElementById('imagen');
    const imagenPreview = document.getElementById('imagenPreview');
    const imagenContainer = document.getElementById('imagenContainer');

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


    const limpiarFormBtn = document.getElementById('limpiarFormBtn');
    limpiarFormBtn.addEventListener('click', function () {
        limpiarFormulario();
    });

    //const guardarFormBtn = document.getElementById('guardarFormBtn');
    const addForm = document.getElementById('addForm');

    addForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(addForm);

        formData.append('action', "add");

        // Obtener el valor del tipo de plato seleccionado y agregar al FormData
        const tipoPlatoRadioButtons = document.querySelectorAll('input[name="tipoPlato"]');
        let tipoPlatoSeleccionado;

        tipoPlatoRadioButtons.forEach(function (radioButton) {
            if (radioButton.checked) {
                tipoPlatoSeleccionado = radioButton.value;
            }
        });

        for (const entry of formData.entries()) {
           console.log(entry);
        }

        if (tipoPlatoSeleccionado && (imagenPreview.src != "")){    
        try { // si respondo con un json puedo enviar directamente el mensaje
            const response = await fetch('/app/menu', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                limpiarFormulario();
                Toastify({
                    text: "Plato guardado exitosamente",
                    style: {
                        background: "linear-gradient(to right, #28a745, #28a745)",
                    },
                    duration: 3000
                }).showToast();
            } else {
                Toastify({
                    text: "No se pudo guardar el plato",
                    style: {
                        background: "linear-gradient(to right, #dc3545, #dc3545)",
                    },
                    duration: 3000
                }).showToast();
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
                Toastify({
                    text: "Error en la solicitud para guardar el plato",
                    style: {
                        background: "linear-gradient(to right, #dc3545, #dc3545)",
                    },
                    duration: 3000
                }).showToast();
        }} else {
            Toastify({
                text: "Complete los campos.",
                style: {
                    background: "linear-gradient(to right, #dc3545, #dc3545)",
                },
                duration: 3000
            }).showToast();
        }
    });

    function limpiarFormulario() {
        var formulario = document.getElementById('addForm');
        formulario.reset();
        var checkboxes = formulario.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        imagenContainer.classList.add("d-none");
        imagenPreview.src=""
    }
});



