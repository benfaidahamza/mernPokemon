import './App.css';
import {Route,Routes} from "react-router-dom";
import Accueil from './composants/Accueil/Accueil';
import ListePokemon from './composants/ListePokemon/ListePokemon';

function App() {
  return(
      <div>
        <Routes>
          <Route path="/"  element={<Accueil/>}/>
          <Route path="/ListePokemon"  element={<ListePokemon/>}/>
        </Routes>
        </div>
  )
}

export default App;
