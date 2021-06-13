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
            <div>
                <Card className = 'recipe_wrapper'>
                    <Card.Img variant="top" src = "https://img.pixers.pics/pho_wat(s3:700/FO/38/36/70/32/700_FO38367032_fd592404425a175a344f045cb2b8c764.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/naklejki-hamburger.jpg.jpg"/>
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