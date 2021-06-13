import react from 'react';
import ReactDOM from 'react-dom'
import './Recipes.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DishCard from '../DishCard/DishCard'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function Recipes(){

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const URL = 'http://127.0.0.1:8000/api/dish/';
        const filters = {
            "data": {
                "id": 1
            }
        };
        axios.get(URL,filters)
        .then(result => {
            console.log(result.data.data);
            setRecipes(result.data.data);
        })
        .catch(err => {
            setRecipes([]);
            console.log(err);
        });
    }, []);

    return (
        <div className="Recipes">
            {recipes.map((recipe, i) => {
                return (                  
                    <DishCard recipe={recipe}/>
                )
            })}
        </div>
    );
}