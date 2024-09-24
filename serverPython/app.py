from flask import Flask, request, jsonify, send_from_directory
import json
from newspaper import Article

app = Flask(__name__)

# Ruta para servir archivos estáticos
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/extract_content', methods=['POST'])
def extract_content():
    data = request.json
    links = data.get('links', [])

    articles_info = []

    for link in links:
        try:
            article = Article(link)
            article.download()
            article.parse()
            articles_info.append({
                'title': article.title,
                'text': article.text
            })
        except Exception as e:
            print(f"Error al procesar el enlace {link}: {e}")

    # Guardar el contenido en el archivo JSON
    with open('static/articles_info.json', 'w') as f:
        json.dump(articles_info, f, indent=4)

    return jsonify({'message': 'Contenido extraído y guardado exitosamente'})

@app.route('/newsletter')
def newsletter():
    return send_from_directory('static', 'newsletter.html')

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
