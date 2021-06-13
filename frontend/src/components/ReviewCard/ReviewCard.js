import react from 'react';
import {Button, Card} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './ReviewCard.css';

export default function ReviewCard(props){
        return (             
            <div className="ReviewCard">
                <Card className = 'recipe_wrapper'>
                    <Card.Body>
                        <Card.Title>{props.review.userName}</Card.Title>
                        <Card.Text>{props.review.text}</Card.Text>
                        <Card.Text>Rating: {props.review.rating}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }