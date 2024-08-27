// articulos.js
document.addEventListener('DOMContentLoaded', function() {
    // Ruta del archivo JSON
    const jsonFile = 'json/articles_info.json';

    // Función para cargar el archivo JSON y mostrar los artículos
    function loadArticles() {
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                const articles = data; // Lista de artículos
                const container = document.getElementById('articlesContainer');

                container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos artículos

                articles.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    const title = document.createElement('h2');
                    title.textContent = article.title;

                    const text = document.createElement('p');
                    text.textContent = article.text;

                    card.appendChild(title);
                    card.appendChild(text);
                    container.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    }

    // Llamar a la función para cargar los artículos al iniciar la página
    loadArticles();
});
