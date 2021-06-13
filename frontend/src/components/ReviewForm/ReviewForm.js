import './ReviewForm.css';
import {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function ReviewForm(props){

    const [userName, setUserName] = useState("");
    const [text, setText] = useState("");
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const recipe = props.recipe;
        const toSend={
            "data": {
                userName,
                text,
                rating,
                "dishID": recipe.id
            }
        };

        const URL = 'http://localhost:8000/api/review/';

        try{
            const response = await axios.post(URL, toSend);
            alert("Successfully sent a new review!");
        }catch(err){
            alert(err);
        }
    }

    return(
        <div className="ReviewForm">
            <p id="reviewFormTitle">Insert a new review</p>
            <Form className="myForm" onSubmit={handleSubmit}>
                <Form.Group controlId="formUserName">
                    <Form.Label className="myLabel">User Name</Form.Label>
                    <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)}  required />
                </Form.Group>

                <Form.Group controlId="formUserName">
                    <Form.Label className="myLabel">Text</Form.Label>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} required></textarea>
                </Form.Group>

                <select name="rating" onChange={(e) => setRating(e.target.value)}>
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                </select>

                <Button className="submitButton" variant="warning" type="submit">
                    Send new review
                </Button>
            </Form>
        </div>
    )
}