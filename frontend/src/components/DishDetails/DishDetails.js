import react from 'react';
import './DishDetails.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ReviewCard from '../ReviewCard/ReviewCard';
import ReviewForm from '../ReviewForm/ReviewForm';


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
                    <Card.Img variant = "top" src = {recipe.img}/>
                    <Card.Body className = "card_body">
                        <Card.Text className = "dish_name">{recipe.name}</Card.Text>
                        <Card.Text className = "dish_author">Author: {recipe.author}</Card.Text>
                        <Card.Text className = "dish_desc" >{recipe.description}</Card.Text>
                        <Card.Text >Składniki:</Card.Text>
                        {recipe.Ingredients && recipe.Ingredients.map((obj,i) =>
                            <div key = {i}>
                                <Card.Text className = "dish_ingre">{obj.name} - {obj.amount}</Card.Text>
                            </div>
                        )}
                        <Card.Body className = "types_body">
                        
                        </Card.Body>

                        <ListGroup>
                        {recipe.types && recipe.types.map((obj,i) =>
                            <div key = {i}>
                                <ListGroup.Item> {obj.name} </ListGroup.Item>
                            </div>
                        )}
                        </ListGroup>
                    
                    </Card.Body>
                </Card>
                <ReviewForm recipe={recipe}/>
                {recipe.reviews && recipe.reviews.map((review, i) =>{
                    return(
                        <ReviewCard review = {review} key={i}/>
                    )
                })}
            </div>
        </div>
    )
}