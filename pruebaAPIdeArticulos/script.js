// script.js
function submitLinks() {
    // Obtener los enlaces del formulario
    const links = [
        document.getElementById('link1').value,
        document.getElementById('link2').value,
        document.getElementById('link3').value,
        document.getElementById('link4').value,
        document.getElementById('link5').value
    ].filter(link => link.trim() !== '');

    if (links.length === 0) {
        alert('Por favor, ingrese al menos un enlace.');
        return;
    }

    // Crear el objeto JSON con los enlaces
    const jsonData = {
        urls: links
    };

    // Convertir el objeto JSON a una cadena
    const jsonString = JSON.stringify(jsonData, null, 4);

    // Crear un blob con el contenido del JSON
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'links.json';
    link.click();

    // Mostrar los enlaces ingresados en la página
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Enlaces Ingresados:</h2><ul>' +
        links.map(link => `<li>${link}</li>`).join('') +
        '</ul>';
}
