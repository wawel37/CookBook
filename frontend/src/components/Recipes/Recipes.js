import react from 'react';
import ReactDOM from 'react-dom'
import './Recipes.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
                    
                        
                    <div key = {i}>
                        <Card className = 'recipe_wrapper'>
                            <Card.Img variant="top" src = "https://img.pixers.pics/pho_wat(s3:700/FO/38/36/70/32/700_FO38367032_fd592404425a175a344f045cb2b8c764.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/naklejki-hamburger.jpg.jpg"/>
                            <Card.Body>
                                <Card.Title>{recipe.name}</Card.Title>
                                <Card.Text>{recipe.text}</Card.Text>
                                <Link to={'/dishdetails/' + recipe['id']}>
                                    <Button variant="primary">Szczegóły</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    
                    /*
                    <div key={i} className = 'recipe_wrapper'>
                        <p>{recipe.description}</p>
                    
                        {recipe.Ingredients.map((ing, j) => {
                            return(
                                <div key ={j}>
                                    <p>{ing.name} || {ing.amount}</p>
                                </div>
                            )
                        })}
                        
                    </div>
                    */
                )
            })}
        </div>
    );
}