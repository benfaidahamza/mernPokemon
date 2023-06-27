import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './ListePokemon.css';
import Navbar from '../Navbar/Navbar';
import pokeballImage from '../../assets/pokemon-logo-png-1447.png';

function ListePokemon() {
  const [Data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 20;
  const pagesVisited = pageNumber * itemsPerPage;
  const [deletedPokemonIds, setDeletedPokemonIds] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showFrenchName, setShowFrenchName] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('pokedex.json');
        const data = response.data;
        const storedData = localStorage.getItem('pokedexData');
        if (storedData) {
          setData(JSON.parse(storedData));
        } else {
          setData(data);
          localStorage.setItem('pokedexData', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données JSON', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const jsonData = JSON.stringify(Data);
    localStorage.setItem('pokemonData', jsonData);
  }, [Data]);

  useEffect(() => {
    const jsonData = localStorage.getItem('pokemonData');
    if (jsonData) {
      const data = JSON.parse(jsonData);
      setData(data);
    }
  }, []);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getTypeColorClass = (type) => {
    switch (type) {
      case 'Grass':
        return 'grass-type';
      case 'Poison':
        return 'poison-type';
      case 'Fire':
        return 'fire-type';
      case 'Flying':
        return 'flying-type';
      case 'Water':
        return 'water-type';
      case 'Bug':
        return 'bug-type';
      case 'Normal':
        return 'normal-type';
      case 'Electric':
        return 'electric-type';
      case 'Ground':
        return 'ground-type';
      case 'Fairy':
        return 'fairy-type';
      case 'Fighting':
        return 'fighting-type';
      case 'Psychic':
        return 'psychic-type';
      case 'Rock':
        return 'rock-type';
      case 'Steel':
        return 'steel-type';
      case 'Ice':
        return 'ice-type';
      case 'Ghost':
        return 'ghost-type';
      case 'Dragon':
        return 'dragon-type';
      case 'Dark':
        return 'dark-type';
      default:
        return '';
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (pokemon) => {
    return (
      pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase())
    ) && !deletedPokemonIds.includes(pokemon.id);
  };

  const handleDelete = (id) => {
    const updatedData = Data.filter((pokemon) => pokemon.id !== id);
    setData(updatedData);
    setDeletedPokemonIds([...deletedPokemonIds, id]);
    localStorage.setItem('pokedexData', JSON.stringify(updatedData));
  };

  const handleEdit = (id, updatedData) => {
    const updatedPokemon = Data.find((pokemon) => pokemon.id === id);
    if (updatedPokemon) {
      updatedPokemon.name = updatedData.name;
      setData([...Data]);
      localStorage.setItem('pokedexData', JSON.stringify(Data));
    }
  };

  const editPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
  };

  const handleToggleLanguage = () => {
    setShowFrenchName(!showFrenchName);
  };

  const filteredPokemons = Data.filter(handleSearch);

  const displayPokemons = filteredPokemons
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((pokemon) => (
      <div key={pokemon.id} className={`pokemon-card ${getTypeColorClass(pokemon.type[0])}`}>
        <div className="card mb-4">
          <img src={pokeballImage} alt="Poké Ball" className="pokeball-image" />
          <div className="card-body">
            <h5 className="card-title">{showFrenchName ? pokemon.name.french : pokemon.name.english}</h5>
            <p className="card-text">Types: {pokemon.type.join(', ')}</p>
            <p className="card-text">HP: {pokemon.base.HP}</p>
            <p className="card-text">Attack: {pokemon.base.Attack}</p>
            <p className="card-text">Defense: {pokemon.base.Defense}</p>
            <p className="card-text">Sp. Attack: {pokemon.base['Sp. Attack']}</p>
            <p className="card-text">Sp. Defense: {pokemon.base['Sp. Defense']}</p>
            <p className="card-text">Speed: {pokemon.base.Speed}</p>
            <div className="button-container">
              <button onClick={() => handleDelete(pokemon.id)}>Supprimer</button>
              <button onClick={() => editPokemon(pokemon)}>Modifier</button>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container">
      <Navbar />
      <div className="top">
        <h1 className="stylish-text">Liste des Pokémons</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="toggle-language">
          <label>
            <input type="checkbox" checked={showFrenchName} onChange={handleToggleLanguage} />
            Afficher le nom français
          </label>
        </div>
        <div className="row">{displayPokemons}</div>
        <div className="d-flex justify-content-center">
          <ReactPaginate
            previousLabel={'Précédent'}
            nextLabel={'Suivant'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredPokemons.length / itemsPerPage)}
            onPageChange={changePage}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            disabledClassName={'disabled'}
          />
        </div>

        <div className="d-flex justify-content-end">
          <p>Page {pageNumber + 1} sur {Math.ceil(filteredPokemons.length / itemsPerPage)}</p>
        </div>
      </div>
      {selectedPokemon && (
        <div className="popup">
          <div className="popup-content">
            <h3>Modifier le Pokémon</h3>
            <form>
              <div className="form-group">
                <label htmlFor="frenchName">Nom (Français)</label>
                <input type="text" id="frenchName" defaultValue={selectedPokemon.name.french} />
              </div>
              <div className="form-group">
                <label htmlFor="englishName">Nom (Anglais)</label>
                <input type="text" id="englishName" defaultValue={selectedPokemon.name.english} />
              </div>
              <div className="form-group">
                <label htmlFor="types">Types</label>
                <input type="text" id="types" defaultValue={selectedPokemon.type.join(', ')} />
              </div>
              <div className="form-group">
                <label htmlFor="hp">HP</label>
                <input type="number" id="hp" defaultValue={selectedPokemon.base.HP} />
              </div>
              <div className="form-group">
                <label htmlFor="attack">Attaque</label>
                <input type="number" id="attack" defaultValue={selectedPokemon.base.Attack} />
              </div>
              <div className="form-group">
                <label htmlFor="defense">Défense</label>
                <input type="number" id="defense" defaultValue={selectedPokemon.base.Defense} />
              </div>
              <div className="form-group">
                <label htmlFor="spAttack">Attaque Spéciale</label>
                <input type="number" id="spAttack" defaultValue={selectedPokemon.base['Sp. Attack']} />
              </div>
              <div className="form-group">
                <label htmlFor="spDefense">Défense Spéciale</label>
                <input type="number" id="spDefense" defaultValue={selectedPokemon.base['Sp. Defense']} />
              </div>
              <div className="form-group">
                <label htmlFor="speed">Vitesse</label>
                <input type="number" id="speed" defaultValue={selectedPokemon.base.Speed} />
              </div>
              <div className="button-container">
                <button type="submit">Enregistrer</button>
                <button onClick={handleClosePopup}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListePokemon;

        //j'ai utilisé ce bloc de code pour savoir combien de types et lesquelle 
        /*
        const types = [];
        data.forEach((pokemon) => {
        pokemon.type.forEach((type) => {
        if (!types.includes(type)) {
            types.push(type);
            }
            });
            });
            console.log(type)
        */