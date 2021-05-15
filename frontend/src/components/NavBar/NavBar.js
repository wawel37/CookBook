import react from 'react';
import './NavBar.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  



export default function NavBar(){


    return(
        <div className="NavBar">
            <Link to='/recipes'>
                <button className = "siema_button">hello guys B)</button>
            </Link>
            <Link to='/posts'>Posts</Link>
            <Link to='/addrecipe'>Add recipe</Link>
        </div>
    )
}