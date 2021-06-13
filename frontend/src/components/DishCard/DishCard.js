import react from 'react';
import {Button, Card} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function DishCard(props){
        return (             
            <div className = "card_div">
                <Card className = 'recipe_wrapper'>
                    <Card.Img className = "card_img" variant="top" src = {props.recipe.img}/>
                    <Card.Body>
                        <Card.Title>{props.recipe.name}</Card.Title>
                        <Card.Text>{props.recipe.text}</Card.Text>
                        <Link to={'/dishdetails/' + props.recipe['id']}>
                            <Button variant="primary">Szczegóły</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }