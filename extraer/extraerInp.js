
function obtenerValor() {
    var inputTXT = document.getElementById('verificador');

    var valor = inputTXT.value;
    const input = valor;
    console.log(input)
    localStorage.removeItem('link');
    localStorage.setItem('link', input)

    location.href = '../prueba.html'
}