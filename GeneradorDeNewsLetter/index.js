let id = 1;
let numLink = 1
function validarURL(url) {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return regex.test(url);
}

function agregarTexto() {
    const input = document.getElementById('inputText');
    const texto = input.value.trim();
    const mensajeError = document.getElementById('mensajeError');

    mensajeError.textContent = '';

    if (texto !== "" && validarURL(texto)) {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = "Pagina Nº" + numLink;
        numLink ++;
        // Crear botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "btn btn-danger btn-sm";
        botonEliminar.onclick = function() {
            li.remove();
        };

        // Añadir el botón al elemento de lista
        li.appendChild(botonEliminar);

        // Añadir el nuevo elemento de lista al ul
        const lista = document.getElementById('lista');
        lista.appendChild(li);

        input.value = '';
    } else {
        mensajeError.textContent = 'Por favor, ingrese una URL válida.';
    }

    input.focus();
}

function insertarNum(){
    let texto = document.getElementById('newsN');
    texto.textContent = "Newsletter N° " + id;
}

document.addEventListener('DOMContentLoaded', function() {
    insertarNum();
});

function generarIA(){
    let mensajeAviso = document.getElementById('mensajeAviso');
    mensajeAviso.textContent = 'Esta función aún no está implementada';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

// Función para manejar la carga de imágenes

document.addEventListener("DOMContentLoaded", function() {
    configurarDragAndDrop('drop-area-1', 'fileInput1', 'image-container-1', 'remove-button-1');
    configurarDragAndDrop('drop-area-2', 'fileInput2', 'image-container-2', 'remove-button-2');
});

function configurarDragAndDrop(dropAreaId, fileInputId, imageContainerId, removeButtonId) {
    const dropArea = document.getElementById(dropAreaId);
    const fileInput = document.getElementById(fileInputId);
    const imageContainer = document.getElementById(imageContainerId);
    const removeButton = document.getElementById(removeButtonId);

    // Evita el comportamiento por defecto al arrastrar y soltar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Añade clases cuando el archivo esté siendo arrastrado dentro del área
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
    });

    // Maneja los archivos arrastrados
    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles({target: {files}});
    }

    function handleFiles(e) {
        let files = e.target.files;
        files = [...files];
        files.forEach(displayFile);
    }

    function displayFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            let img = document.createElement('img');
            img.src = reader.result;
            imageContainer.innerHTML = ''; // Borra la imagen anterior
            imageContainer.appendChild(img);
            removeButton.style.display = 'block'; // Muestra el botón de eliminar
        }
    }

    window.eliminarImagen = function(imagenId) {
        if (imagenId === 1) {
            document.getElementById('image-container-1').innerHTML = ''; // Borra la imagen del contenedor 1
            document.getElementById('remove-button-1').style.display = 'none'; // Oculta el botón de eliminar 1
        } else if (imagenId === 2) {
            document.getElementById('image-container-2').innerHTML = ''; // Borra la imagen del contenedor 2
            document.getElementById('remove-button-2').style.display = 'none'; // Oculta el botón de eliminar 2
        }
    }
}

function enviarInformacion() {
    // Obtener los valores de los campos
    const titulo = document.getElementById('titulo').value;
    const cuerpo = document.getElementById('cuerpo').value;
    
    // Aquí puedes realizar la acción deseada con los datos
    // Por ejemplo, enviar los datos a un servidor o mostrarlos en una alerta
    alert(`Título: ${titulo}\nCuerpo: ${cuerpo}`);
    
    // Limpiar los campos después de enviar
    document.getElementById('titulo').value = '';
    document.getElementById('cuerpo').value = '';
}
