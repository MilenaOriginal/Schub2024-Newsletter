document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('linkForm');
    const linkInput = document.getElementById('linkInput');
    const linkList = document.getElementById('linkList');
    const downloadButton = document.getElementById('downloadButton');
    const extractButton = document.getElementById('extractButton');

    function loadLinks() {
        const links = JSON.parse(localStorage.getItem('links')) || [];
        linkList.innerHTML = ''; // Limpiar la lista antes de cargar
        links.forEach((link, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${link}
                <button onclick="removeLink(${index})">Eliminar</button>
            `;
            linkList.appendChild(li);
        });
    }

    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const links = JSON.parse(localStorage.getItem('links')) || [];

        if (links.length >= 5) {
            alert('No puedes agregar más de 5 links.');
            return;
        }

        const newLink = linkInput.value.trim();
        if (newLink) {
            links.push(newLink);
            localStorage.setItem('links', JSON.stringify(links));
            linkInput.value = '';
            loadLinks();
        }
    });

    window.removeLink = function(index) {
        const links = JSON.parse(localStorage.getItem('links')) || [];
        links.splice(index, 1);
        localStorage.setItem('links', JSON.stringify(links));
        loadLinks();
    };

    downloadButton.addEventListener('click', () => {
        const links = JSON.parse(localStorage.getItem('links')) || [];
        const blob = new Blob([JSON.stringify(links, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'links.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    extractButton.addEventListener('click', async () => {
        const links = JSON.parse(localStorage.getItem('links')) || [];
        const response = await fetch('/extract_content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ links: links })
        });

        if (response.ok) {
            window.location.href = '/static/newsletter.html'; // Redirige a la página estática de newsletter
        } else {
            alert('Error al extraer el contenido');
        }
    });

    loadLinks();
});
