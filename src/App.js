import React,{ useEffect , useState} from 'react';
import './App.css';
import Recipe from './recipe'

const App = () => {

  const APP_ID = "c76ae69f";
  const APP_KEY = "e2891de1e150df87c191145182b0f087";

  const [recipes, setRecipes ] = useState([]);
  const [search, setSearch] = useState("");
  const [query,setQuery] = useState("chicken")

  useEffect( () => {
    getReceipes()
  }, [query]);

  const getReceipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <h1 className="header">Food Receipe Site</h1>
      <form onSubmit={getSearch} class="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="search your food"/>
        <button className="search-button" type="submit" >submit</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      <footer>
        <span>Powered By <a href="https:/devrushi.com" className="color" >DevRushi</a></span>
      </footer>
      
    </div>
  );
}

export default App;
