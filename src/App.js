import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './components/cards/Cards';

function App() {
  const [characters, setCharacters] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchCharacters = async (url = 'https://rickandmortyapi.com/api/character/') => {
    const params = new URLSearchParams();
    if (nameFilter) params.append('name', nameFilter);
    if (speciesFilter) params.append('species', speciesFilter);
    if (statusFilter) params.append('status', statusFilter);
    if (genderFilter) params.append('gender', genderFilter);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await axios.get(url);
      setCharacters(response.data.results);
      setNextPage(response.data.info.next);
      setPrevPage(response.data.info.prev);
    } catch (err) {
      console.log(err);
      setCharacters([]);
    }
  };

  useEffect(() => {
    const fetchAllSpecies = async () => {
      let allCharacters = [];
      let nextPage = 'https://rickandmortyapi.com/api/character';

      while (nextPage) {
        const response = await axios.get(nextPage);
        allCharacters = allCharacters.concat(response.data.results);
        nextPage = response.data.info.next;
      }

      const speciesList = [...new Set(allCharacters.map((character) => character.species))];
      setSpeciesList(speciesList);
    };

    fetchAllSpecies();
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [nameFilter, speciesFilter, statusFilter, genderFilter]);

  const clearFilters = () => {
    setNameFilter('');
    setSpeciesFilter('');
    setStatusFilter('');
    setGenderFilter('');
  };

  const goToNextPage = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (prevPage) {
      fetchCharacters(prevPage);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <div className='logo'>
        <img src='/assets/img/img-ricknMorty.png' alt='Logo rick n morty' />
      </div>

      {/* Filtros */}
      <div className="filters-container">
        {/* Filtro por nombre */}
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        {/* Botón para mostrar/ocultar filtros en móviles */}
        <button className="mobile-filter-button" onClick={() => setShowFilters(!showFilters)}>
          Filtros
        </button>

        {/* Filtros en ventana flotante para móviles */}
        {showFilters && (
          <div className="mobile-filters-overlay">
            <div className="mobile-filters">
              {/* Filtro por especie */}
              <select
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              >
                <option value="">Todas las especies</option>
                {speciesList.map((species, index) => (
                  <option key={index} value={species}>
                    {species}
                  </option>
                ))}
              </select>

              {/* Filtro por estado */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="Alive">Vivo</option>
                <option value="Dead">Muerto</option>
                <option value="unknown">Desconocido</option>
              </select>

              {/* Filtro por género */}
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">Todos los géneros</option>
                <option value="Female">Femenino</option>
                <option value="Male">Masculino</option>
                <option value="Genderless">Sin género</option>
                <option value="unknown">Desconocido</option>
              </select>

              {/* Botón para cerrar la ventana flotante */}
              <button onClick={() => setShowFilters(false)}>Cerrar</button>
            </div>
          </div>
        )}

        {/* Filtros en pantallas grandes */}
        <div className="desktop-filters">
          {/* Filtro por especie */}
          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
          >
            <option value="">Todas las especies</option>
            {speciesList.map((species, index) => (
              <option key={index} value={species}>
                {species}
              </option>
            ))}
          </select>

          {/* Filtro por estado */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>

          {/* Filtro por género */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">Todos los géneros</option>
            <option value="Female">Femenino</option>
            <option value="Male">Masculino</option>
            <option value="Genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        {/* Botón para borrar filtros */}
        <button onClick={clearFilters}>Borrar filtros</button>
      </div>

      {/* Mostrar los personajes filtrados */}
      <div className="characters-container">
        {characters.length > 0 ? (
          <section>
            {characters.map(character => (
              <Cards key={character.id} character={character} />
            ))}
          </section>
        ) : (
          <p>No se encontraron personajes.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={!prevPage}>
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button onClick={goToNextPage} disabled={!nextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;