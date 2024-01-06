document.addEventListener('DOMContentLoaded', function () {
    const menuCards = document.getElementById('menu');
    const buscarPlatoBtn = document.getElementById('buscarPlato');
    const accesoCuenta = document.getElementById('accesoCuenta');
    const liAgregarPlato = document.getElementById('liAgregarPlato');
    const botonFiltro = document.getElementById('botonFiltro');
    const footer = document.getElementById('footer');

    var Logeado = localStorage.getItem('Logeado') === "true";
    var menu = [];

    var precioMin = document.getElementById("precioMin")
    precioMin.value = "-"

    var precioMax = document.getElementById("precioMax")
    precioMax.value = "-"

    function opcionVaciaPrecio(tipo){
        tipo.addEventListener('blur', function (e) {
            e.preventDefault();
            if (tipo.value == '') {
                precioCualquiera(tipo)
            }
        })
    
        tipo.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("adentroclick")
        if (tipo.type == "search") {
            tipo.value = ""
            tipo.type="number"
            tipo.step="5"
        }
        })
    }

    function precioCualquiera(tipo) {
    tipo.step= ""
    tipo.type = "search"  
    tipo.value = "-" 
    }

    opcionVaciaPrecio(precioMin)
    opcionVaciaPrecio(precioMax)

    if (!Logeado) {
        accesoCuenta.innerHTML = `<a href="pages/logIn.html" class="nav-link">Iniciar sesión</a>`
    } else {
        accesoCuenta.innerHTML = `<a href="#" class="nav-link" id="Salir">Cerrar sesión</a>`
        liAgregarPlato.innerHTML = `<a class="nav-link btn btn-outline-success me-2" href="pages/agregar_plato.html" role="button">Agregar Plato</a>`
        const Salir = document.getElementById('Salir');
        Salir.addEventListener('click', async function (event) {
            localStorage.setItem('Logeado', false);
            Logeado = localStorage.getItem('Logeado') === "true";
            location.reload();
    })};

    const searchForm = document.querySelector("form[role='search']");
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const platosBuscados = menu.filter(buscarPlatos);        
        menuCards.innerHTML = "";
        mostrarPlatos(platosBuscados, false)
        formulario.reset();
        precioCualquiera(precioMin)
        precioCualquiera(precioMax) 
    });

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        if (precioMin.value < precioMax.value || precioMin.value == "-" || precioMax.value == "-") {
            const platosBuscadosEnFiltro = menu.filter(buscarPlatos)           
            const platosFiltrados = platosBuscadosEnFiltro.filter(filtrarPlatos);
            menuCards.innerHTML = "";
            mostrarPlatos(platosFiltrados, false)
        } else {
            Toastify({
                text: "Ingrese límites de precio correctos.",
                style: {
                    background: "linear-gradient(to right, #dc3545, #dc3545)",
                },
                duration: 3000
            }).showToast();
        }
    });

    const botonReiniciar = document.getElementById("botonReiniciar");
    botonReiniciar.addEventListener("click", function (e) {
        e.preventDefault();
        formulario.reset()
        precioCualquiera(precioMin)
        precioCualquiera(precioMax)
    })


    function loadMenu() {
        //envía petición al server
        fetch("/app/menu?action=getAll")
                .then(response => response.json())
                .then(data => {
                    mostrarPlatos(data, true)
                });
    }
    loadMenu();

    function putPlatosConStock(data, clase, push) {
        data.forEach(plato => {
            if (!plato.enFalta) {
                if (push) {
                    menu.push(plato);
                }
                var colCardBody = 8
                var vegano_src = ""
                var celiaco_src = ""
                if(plato.aptoVegano){
                    vegano_src= "media/logoVegano.png"
                } else {
                    var claseImgVegana = "d-none"
                }
                if(plato.aptoCeliaco){
                    celiaco_src= "media/logoCeliaco.png"
                } else {
                    var claseImgCeliaca = "d-none"
                }
                if (claseImgCeliaca === "d-none" && claseImgVegana === "d-none"){
                    var clasesVacias="d-none"
                    colCardBody = 12
                }
                menuCards.innerHTML += `
                <div class="cartaPlato ident col-lg-3 mx-4 my-4" data-plato-id = ${plato.platoId}>
                <div class="card animate-hover-card">
                    <img src="data:img/jpeg;base64,${plato.imagenBase64}" class="card-img-top" alt="foto plato">
                    <div class="d-flex">
                      <div class="card-body col-${colCardBody}">
                        <p class="text-center nombrePlato">${plato.nombre}</p>
                        <p>${plato.descripcion}</p>
                        <p>Tipo: ${plato.tipoPlato}</p>
                      </div>
                      <div class="col-4 my-3 ${clasesVacias}">
                      <img class="${claseImgVegana}" src="${vegano_src}" width="50" height="50" alt="">
                      <img class="${claseImgCeliaca}" src="${celiaco_src}" width="50" height="50" alt="">
                      </div>
                    </div>
                    <p class="text-center fs-5">
                        $${plato.precio}
                    </p>
                    <a class="btn ${clase} btn-primary" href="pages/editar_plato.html" role="button" id="BtnEditar${plato.platoId}">Editar</a>
                </div>
            </div> 
            
                           `;
            }
        }); 
    }

    function putPlatosSinStock(data, clase, push) {
        data.forEach(plato => {
            if (plato.enFalta) {
                if (push) {
                    menu.push(plato);
                }
                var colCardBody = 8
                var vegano_src = ""
                var celiaco_src = ""
                if(plato.aptoVegano){
                    vegano_src= "media/logoVegano.png"
                } else {
                    var claseImgVegana = "d-none"
                }
                if(plato.aptoCeliaco){
                    celiaco_src= "media/logoCeliaco.png"
                } else {
                    var claseImgCeliaca = "d-none"
                }
                if (claseImgCeliaca === "d-none" && claseImgVegana === "d-none"){
                    var clasesVacias="d-none"
                    colCardBody = 12
                }
                menuCards.innerHTML +=`
                <div class="cartaPlato ident col-3  mx-4 my-4" data-plato-id = ${plato.platoId}>
                <div class="card animate-hover-card ColorCartaEnFalta cartaAdentro position-relative">
                <div class="enFaltaEtiqueta position-absolute">
                En falta
              </div>
                    <img src="data:img/jpeg;base64,${plato.imagenBase64}" class="card-img-top" alt="foto plato">
                    <div class="d-flex">
                      <div class="card-body col-${colCardBody}">
                        <p class="text-center nombrePlato">${plato.nombre}</p>
                        <p>${plato.descripcion}</p>
                        <p>Tipo: ${plato.tipoPlato}</p>
                      </div>
                      <div class="col-4 my-3 ${clasesVacias}">
                      <img class="${claseImgVegana}" src="${vegano_src}" width="50" height="50" alt="">
                      <img class="${claseImgCeliaca}" src="${celiaco_src}" width="50" height="50" alt="">
                      </div>
                    </div>
                    <p class="text-center fs-5">
                        $${plato.precio}
                    </p>
                    <a class="btn ${clase} btn-primary btn-sin-stock" href="pages/editar_plato.html" role="button" id="BtnEditar${plato.platoId}">Editar</a>
                </div>
            </div> 
                           `;            
            }
        }); 
    }

    function platosVacios(){
    menuCards.innerHTML += `
    <p class="text-center plato text-white fuenteLobster fs-2">No hay platos.</p>
`;
    footer.classList.add('footerPlatosVacios');
    console.log(footer)
}

    function filtrarPlatos(plato){
        var tipoPlato = document.getElementById("tipoPlatoFiltro")
        var aptoCeliaco = document.getElementById("aptoCeliacoFiltro")
        var aptoVegano = document.getElementById("aptoVeganoFiltro")
        var enFalta = document.getElementById("enFaltaFiltro")

        function opcionElegidaBoolean(opcion) {
            return  opcion.value == "si" ? true : false
        }

        var booleanPrecio = (precioMax.value == "-" ? plato.precio: precioMax.value) >= plato.precio && plato.precio >= (precioMin.value == "-" ? 0: precioMin.value)
        var booleanTipoPlato = tipoPlato.value == "cualquiera" ? true : (tipoPlato.value == plato.tipoPlato ? true : false)
        var booleanCeliaco = aptoCeliaco.value == "cualquiera" ? true : (opcionElegidaBoolean(aptoCeliaco) == plato.aptoCeliaco ? true : false)
        var booleanVegano = aptoVegano.value == "cualquiera" ? true : (opcionElegidaBoolean(aptoVegano) == plato.aptoVegano ? true : false)
        var booleanEnFalta = enFalta.value == "cualquiera" ? true : (opcionElegidaBoolean(enFalta) == plato.enFalta ? true : false)

        return booleanPrecio && booleanTipoPlato && booleanCeliaco && booleanVegano && booleanEnFalta ? true : false
    }

    function buscarPlatos(plato) {
        var searchTerm = searchForm.querySelector("input[type='search']").value;
        return plato.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    }

    function mostrarPlatos(platos, booleano) {
        if (platos.length === 0) {
            platosVacios()
        } else {
            if(footer.classList.contains('footerPlatosVacios')) {
                footer.classList.remove('footerPlatosVacios');
            }                    
            if (Logeado) {
                putPlatosConStock(platos, "", booleano);
                putPlatosSinStock(platos, "", booleano);
            } else {
                putPlatosConStock(platos, "d-none", booleano);
                putPlatosSinStock(platos, "d-none", booleano);
            }
            platos.forEach(plato => {
                var btnEditar = document.getElementById(`BtnEditar${plato.platoId}`);
                btnEditar.addEventListener("click", function (e) {
                    var id_editar = plato.platoId
                    localStorage.setItem('id_editar', id_editar);
                });   
            });
        }
    }
    

 
    // console.log(menuCards.childNodes)
    // for (let i = 0; i < menuCards.children.length; i++) {
    //     console.log(menuCards.children[i]); // Hacer algo con cada elemento hijo
    // }

    

    // for (let i = 0; i < menuCards.children.length; i++) {
    //     eval(`BtnEditar${menuCards.children[i].dataset.platoId}`).addEventListener('click', function (e) {
    //         e.preventDefault();
    //         var carta = editarCardBtn.closest('.carta').closest('.ident');
    //         var id_editar =menuCards.children[i].dataset.platoId;
    //         console.log(id_editar);
    //         console.log(typeof(id_editar));
    //     });
    // }

    })

