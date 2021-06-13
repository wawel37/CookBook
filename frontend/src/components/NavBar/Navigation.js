import react from 'react';
import './Navigation.css';
import { Button, Nav, NavBar, Navbar, NavItem } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";




export default function Navigation(){


    return(
        <div className="Navigation">
            <Navbar className = "nav_wrapper" variant="light" fixed="top" >
                <Nav className="button_wrapper">
                    <Navbar.Brand className= "nav_brand"><Link className="nav-link" to="/recipes"><span className="navItem">🍔Recipes🍔</span></Link> </Navbar.Brand>
                    <div className="ml-auto">
                        <NavItem className = "side_but"><Link className="nav-link" to="/posts"><span className="navItem">Posts</span></Link> </NavItem> 
                        <NavItem className = "side_but"><Link className="nav-link" to="/addrecipe"><span className="navItem">Add Recipe</span></Link> </NavItem> 
                        <NavItem className = "side_but"><Link className="nav-link" to="/addpost"><span className="navItem">Add Post</span></Link> </NavItem>
                        <NavItem className = "side_but"><Link className="nav-link" to="/fridge"><span className="navItem">Fridge Search</span></Link> </NavItem>
                    </div>
                </Nav>
            </Navbar>
        </div>
    )
}