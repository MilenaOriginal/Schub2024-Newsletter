<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $url = $_POST['url'];

    
    $html = file_get_contents($url); //file get contents para leer el html de la pagina

    
    $dom = new DOMDocument(); //cargar HTML
    @$dom->loadHTML($html);  // Suprime advertencias de HTML mal formado

    $xpath = new DOMXPath($dom);

    $nodes = $xpath->query('//h1');
    $nodes2 = $xpath->query('//p');
    $nodes3 = $xpath->query('//img');

    if ($nodes->length > 0) {
        foreach ($nodes as $node) {
            echo $dom->saveHTML($node);
        }
    } else {
        echo "no hay elementos disponibles";
    }
    if ($nodes2->length > 0) {
        foreach ($nodes2 as $node) {
            echo $dom->saveHTML($node);
        }
    } else {
        echo "no hay elementos disponibles";
    }

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div>
        <script>
            const h1 = document.getElementsByTagName("h1");
            const p = document.getElementsByTagName("p");
            const h2 = document.getElementsByTagName("h2");
            const a = document.getElementsByTagName("a");
            const b = document.getElementsByTagName("b");
            var listaParrafo = [];
            localStorage.clear();
            for (let i = 0; i < p.length; i++) {
                let texto = 'texto' + i+1;
                let parrafoActual = p[i].innerText;
                listaParrafo.push(parrafoActual);
                
            }
            localStorage.setItem('lista', listaParrafo);
            function seleccionarParrafo(){
                var parrafoS = document.getElementById('parrafoS').value;
                
                let numP = parseInt(parrafoS);
                let extraido = listaParrafo[numP];
                var body = document.getElementsByTagName("body");
                console.log(extraido)
            }
        </script>
    </div>
    <div class="cajaImg">
    <?php
        $nodes3 = $xpath->query('//img');

    
        if ($nodes3->length > 0) {
            foreach ($nodes3 as $node) {
                echo $dom->saveHTML($node);
            }
        } else {
            echo "no hay elementos disponibles";
        }
    ?> 
    </div>
    <h1>Seleccion</h1>
    <input type="number" name="url" placeholder="Ingresa la URL" id="parrafoS" required>
    <button onclick="seleccionarParrafo()" type="submit">Buscar</button>
</body>
</html>