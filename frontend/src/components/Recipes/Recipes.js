import react from 'react';
import './Recipes.css';
import axios from 'axios';
import {useState, useEffect} from 'react';


export default function Recipes(){

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const URL = 'http://127.0.0.1:8000/api/recipe/';
        const filters = {
            "id": 1
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
            Przepisy
            {recipes.map((recipe, i) => {
                return (
                    <div key={i} className = 'recipe_wrapper'>
                        <p>{recipe.description}</p>
                    
                        {recipe.ingredients.map((ing, j) => {
                            return(
                                <div key ={j}>
                                    <p>{ing.name} || {ing.amount}</p>
                                </div>
                            )
                        })}
                        
                    </div>
                )
            })}
        </div>
    );
}