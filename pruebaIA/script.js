// Reemplaza con tu clave API
const API_KEY = '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';

// Función para traducir texto a inglés
async function translateText(text) {
    const TRANSLATE_API_URL = "https://api-inference.huggingface.co/models/google-t5/t5-base";
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
    };

    try {
        // Enviar solicitud de traducción al API de Hugging Face
        const response = await fetch(TRANSLATE_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ inputs: text }),
        });

        // Comprobar si la respuesta es válida
        if (!response.ok) {
            throw new Error('Error en la respuesta de traducción');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();

        // Devolver la traducción o el texto original si no se traduce
        return data.translations ? data.translations[0] : text; 
    } catch (error) {
        console.error('Error al traducir el texto:', error);
        // Devolver el texto original en caso de error
        return text; 
    }
}

// Función para resumir texto
async function summarizeText() {
    // Obtener el texto del input
    const inputText = document.getElementById('summaryInput').value;
    const outputDiv = document.getElementById('summaryOutput');

    try {
        // Traducir el texto a inglés
        const translatedText = await translateText(inputText);

        // Enviar el texto traducido al modelo de resumen
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: translatedText }),
        });

        // Comprobar si la respuesta es válida
        if (!response.ok) {
            throw new Error('Error en la respuesta de resumen');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();

        // Mostrar el resumen en la página
        outputDiv.innerText = data.summary_text || 'No se encontró resumen.';
    } catch (error) {
        // Mostrar mensaje de error en caso de fallo
        outputDiv.innerText = 'Error al obtener resumen.';
        console.error('Error:', error);
    }
}

// Función para generar imagen
async function generateImage() {
    // Obtener la descripción de la imagen del input
    const description = document.getElementById('imageDescription').value;
    const imageElement = document.getElementById('generatedImage');

    try {
        // Traducir la descripción a inglés
        const translatedDescription = await translateText(description);

        // Enviar la descripción traducida al modelo de generación de imágenes
        const response = await fetch('https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: translatedDescription }),
        });

        // Comprobar si la respuesta es válida
        if (!response.ok) {
            throw new Error('Error en la respuesta de generación de imágenes');
        }

        // Convertir la respuesta a formato Blob (imagen)
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        // Mostrar la imagen en la página
        imageElement.src = imageUrl;
    } catch (error) {
        // Mostrar mensaje de error en caso de fallo
        imageElement.alt = 'Error al generar imagen.';
        console.error('Error:', error);
    }
}
