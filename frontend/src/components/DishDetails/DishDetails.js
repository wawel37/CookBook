import react from 'react';
import './DishDetails.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
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
        <div>
            <div className="DishDetails">
                <Card className = "dish_det_wrapper">
                    <Card.Img variant = "top" src = "https://img.pixers.pics/pho_wat(s3:700/FO/38/36/70/32/700_FO38367032_fd592404425a175a344f045cb2b8c764.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/naklejki-hamburger.jpg.jpg"/>
                    <Card.Body className = "card_body">
                        {/* <Card.Text>{recipe.Ingredients[0]['name']} </Card.Text> */}
                        <Card.Text>{recipe.name}</Card.Text>
                        <Card.Text>{recipe.author}</Card.Text>
                        <Card.Text>{recipe.description}</Card.Text>
                        
                        {recipe.Ingredients && recipe.Ingredients.map((obj,i) =>
                            <div key = {i}>
                                <Card.Text>{obj.name} - {obj.amount}</Card.Text>
                            </div>
                        )}
                        <Card.Body className = "types_body">
                        {recipe.types && recipe.types.map((obj,i) =>
                            <div key = {i}>
                                <Card.Text className = "type"> {obj.name} </Card.Text>
                            </div>
                        )}
                        </Card.Body>
                    
                    </Card.Body>
                </Card>
            </div>
        
           
            

        </div>
    )
}