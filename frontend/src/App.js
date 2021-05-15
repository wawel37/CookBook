import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar';
import Recipes from './components/Recipes/Recipes';
import Posts from './components/Posts/Posts';
import AddRecipe from './components/AddRecipe/AddRecipe'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>

        <Switch>

          <Route path='/' exact={true}>
            <Recipes/>
          </Route>
          <Route path='/posts' exact={true}>
            <Posts/>
          </Route>
          <Route path = '/recipes' exact={true}>
            <Recipes/>
          </Route>
          <Route path = '/addrecipe' exact = {true}>
            <AddRecipe/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
