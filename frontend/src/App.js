import logo from './logo.svg';
import NavBar from './components/NavBar/Navigation';
import Recipes from './components/Recipes/Recipes';
import Posts from './components/Posts/Posts';
import AddRecipe from './components/AddRecipe/AddRecipe'
import AddPost from './components/AddPost/AddPost';
import DishDetails from './components/DishDetails/DishDetails'
import Fridge from './components/Fridge/Fridge';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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

          <Route path = '/addpost' exact = {true}>
            <AddPost/>
          </Route>

          <Route path = '/dishdetails/:dishID' exact = {true} component={() => <DishDetails key = {window.location.pathname}/>}/>

          <Route path = '/fridge' exact = {true}>
            <Fridge/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
