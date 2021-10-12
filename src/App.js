import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagen';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpagina, guardarTotalPaginas] = useState(1);

  useEffect( () => {

      const consultarAPI = async () => {
        
        if(busqueda === '' ) return;
        const imagenesPorPagina = 30;
        const key = '23700562-f4bcfdc6f2fbf52ec67f1ee7c';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page${imagenesPorPagina}&page=${paginaactual}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits)

        const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
        guardarTotalPaginas(calcularTotalPaginas);

        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior: 'smooth'})
      }

      consultarAPI();

  }, [busqueda, paginaactual])

  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0 ) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpagina) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario
          guardarBusqueda = {guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
      
      { (paginaactual === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
           >&laquo; Anterior
          </button>
      )}

      { (paginaactual === totalpagina) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Sigueinte &raquo;
          </button>
      )}


      </div>
    </div>
  );
}

export default App;
