import { extract } from 'https://esm.sh/@extractus/article-extractor';
//var input = "https://www.cnbc.com/2022/09/21/what-another-major-rate-hike-by-the-federal-reserve-means-to-you.html" //funciona ejemplo
//var input = "https://www.lanacion.com.ar/economia/el-gobierno-oficializo-un-nuevo-aumento-en-servicios-publicos-y-consolida-su-politica-economica-nid30082024/";

//var input = "https://www.infobae.com/judiciales/2024/08/26/el-rumor-con-sofia-pacchi-y-el-alerta-del-ama-de-llaves-que-dijo-el-ex-intendente-de-olivos-en-la-causa-contra-alberto-fernandez/" //no funciona
//fetch('https://www.infobae.com/economia/2024/08/30/el-gobierno-confirmo-los-aumentos-en-tarifas-de-luz-y-gas-que-llegaran-en-septiembre/', { mode: 'no-cors' })
extraerArticulo();
const API_KEY = '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';

async function extraerArticulo(){
    var input = localStorage.getItem('link');
    let cajaArt = document.getElementById('extraido');
    var proxyURL = `http://localhost:3000/proxy?url=${encodeURIComponent(input)}`;
    
    try {
        const article = await extract(proxyURL);
        console.log(article);
    } catch (err) {
        console.error(err);
    }
    
    const article = await extract(proxyURL);
    console.log(article);
    const claves = Object.keys(article);
    cajaArt.innerHTML += '<h1>' + article.title + '</h1>';
    let parrafoE = cajaArt.innerHTML += '<div>' + article.content + '</div>';
    mostrarParrafos();
    mostrarImagenes();
    
} 

function mostrarImagenes(){
    let cajaArt = document.getElementById('extraido');
    const mImg = cajaArt.getElementsByTagName('img');
    console.log(mImg.item(1))
    let imagenesMuestra = document.getElementById('muestraImagen');
    
    for(let i = 0; i < mImg.length; i++){
        imagenesMuestra.appendChild(mImg.item(i));
    }
   
   /* mImg.forEach(imgUrl => {
        let imgElemento = document.createElement('img');
        imgElemento.src = imgUrl;
        imagenesMuestra.appendChild(imgElemento);
    });
    console.log(listaImagenes)
    */
}
function mostrarParrafos(){
    const parrafos = document.querySelectorAll('p');
    let parrafoExtraido = document.getElementById('muestra');
    let listaParrafo = [].slice.call(parrafos); 
    let cont = '';
    let listaVaciaSoloTxt = [];
    var contador = 0;
    //para convertir de nodelist a array
    listaParrafo.forEach((div) =>{
        cont = div.textContent;
        if(cont !== ''){
            parrafoExtraido.innerHTML += '<h3>' + 'Parrafo N°' + (contador+1) + '</h3>'  + '<br>' +'<p>' + cont + '</p>' + '<br>';
            listaVaciaSoloTxt[contador] = cont;
            contador++;
        }
    });
  
    //  console.log(listaVaciaSoloTxt)

    const parrafosVaciosEliminar = document.querySelectorAll('p:empty');
    parrafosVaciosEliminar.forEach((p) =>{
        p.remove();
    });
}
/*no funciona pero lo guardo

    for(let i = 0; i < imagenes.length; i++){
        listaImagenes[i] = imagenes[i];
    }    
    for(let g = 0; g < listaImagenes.length; g++){
        imagenesMuestra.innerHTML += '<img>' + listaImagenes[g] + '</img>';
    }

    */