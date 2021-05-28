import react from 'react';
import './DishDetails.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';


export default function DishDetails(){
    const { dishID } = useParams();

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        const URL = 'http://127.0.0.1:8000/api/dish?id=' + dishID;
        console.log(URL)
        
        axios.get(URL)
        .then(result => {
            console.log(result.data.data[0]);
            setRecipe(result.data.data[0]);
        })
        .catch(err => {
            setRecipe([]);
            console.log(err);
        });
    }, []);

    return(
        <div className="DishDetails">
            <p> {recipe.name} </p>
        </div>
    )
}