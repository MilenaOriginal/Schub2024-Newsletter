# Instalar newspaper3k
!pip install newspaper3k

import json
from newspaper import Article
from google.colab import files

# Subir archivo JSON con URLs
uploaded = files.upload()

# Suponemos que el archivo subido es el único archivo en el directorio
json_file_path = next(iter(uploaded.keys()))

# Ruta del archivo JSON para guardar el resultado
output_filename = 'articles_info.json'

def process_articles(json_file_path, output_filename):
    # Leer el archivo JSON
    with open(json_file_path, 'r') as f:
        data = json.load(f)

    # Obtener la lista de URLs del JSON
    urls = data.get('urls', [])

    articles_info = []

    for url in urls:
        if url:
            # Crear un objeto Article
            article = Article(url)

            # Descargar y analizar el artículo
            article.download()
            article.parse()

            # Obtener el título y el texto del artículo
            titulo = article.title
            cuerpo = article.text

            # Crear un diccionario con los datos
            article_info = {
                'title': titulo,
                'text': cuerpo
            }

            articles_info.append(article_info)
        else:
            print(f"No se encontró la URL válida: {url}")

    # Convertir la lista de diccionarios a JSON
    articles_json = json.dumps(articles_info, indent=4, ensure_ascii=False)

    # Guardar el JSON en un archivo, sobrescribiendo el archivo existente
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(articles_json)

    print(f'Archivo guardado como: {output_filename}')

    # Descargar el archivo a tu dispositivo
    files.download(output_filename)

# Ejecutar la función
process_articles(json_file_path, output_filename)
