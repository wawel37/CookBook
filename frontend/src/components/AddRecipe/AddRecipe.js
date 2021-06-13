import react from 'react';
import './AddRecipe.css';
import { Form, Button, Badge } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function AddRecipe(){


    const [formName, setFormName] = useState('');
    const [formUserName, setFormUserName] = useState('');
    const [formSingleType, setFormSingleType] = useState('');
    const [formTypes, setFormTypes] = useState([]);
    const [formDescription, setFormDescription] = useState('');
    const [formSingleIngredient, setFormSingleIngredient] = useState('');
    const [formIngredients, setFormIngredients] = useState([]);
    const [formImg, setFormImg] = useState('');
    const [formSingleIngredientAmount, setFormSingleIngredientAmount] = useState('');
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const URL = 'http://localhost:8000/api/dish/';

        const toSend = {
            "data": {
                "name": formName,
                "author": formUserName,
                "types": formTypes.map(type=>{
                    return {
                        "name": type
                    };
                }),
                "description": formDescription,
                "Ingredients": formIngredients.map(ingredient=>{
                    return {
                        "name": ingredient[0],
                        "amount": ingredient[1]
                    };
                }),
                "reviews": [],
                "img": formImg
            }
        }

        try{
            const reponse = await axios.post(URL, toSend);
            setFormDescription('');
            setFormImg('');
            setFormIngredients([]);
            setFormName('');
            setFormSingleIngredient('');
            setFormSingleType('');
            setFormTypes([]);
            setFormUserName('');

            alert('Successfully sent a new recipe!');
        }catch(err){
            alert(err.response.data.error);
        }
    }

    const addNewType = () => {
        if(formSingleType){
            setFormTypes([...formTypes, formSingleType]);
            setFormSingleType('');
        }
    }

    const addNewIngredient = () =>{
        if(formSingleIngredient){
            setFormIngredients([...formIngredients, [formSingleIngredient, formSingleIngredientAmount]]);
            setFormSingleIngredient('');
            setFormSingleIngredientAmount('');
        }
    }

    const removeOneType = (key) => {
        setFormTypes(formTypes.filter((item, index) => index !== key));
    }

    const removeOneIngredient = (key) =>{
        setFormIngredients(formIngredients.filter((item, index) => index !== key));
    }

    return(
        <div className="AddRecipe">
            <p>Add a new Recipe</p>
            <Form className="myForm" onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label className="myLabel">Dish Name</Form.Label>
                    <Form.Control type="text" value={formName} onChange={(e) => setFormName(e.target.value)}  required />
                </Form.Group>

                <Form.Group controlId="formUserName">
                    <Form.Label className="myLabel">User Name</Form.Label>
                    <Form.Control type="text" value={formUserName} onChange={(e) => setFormUserName(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="formTypes">
                    <Form.Label className="myLabel">Dish Types</Form.Label>
                    <Form.Control className="ingredientInput" type="text" value={formSingleType} onChange={(e) => setFormSingleType(e.target.value)}></Form.Control>
                    <Button className="AddOneItem" variant="info" onClick={() => addNewType()}><span>+</span></Button>
                    {formTypes.map((type, i) => {
                        return(
                            <div key={i}>
                                <Badge className="myBadge" variant="warning">
                                    {type}
                                    <Button className="RemoveOneItem" variant="danger" onClick={() => removeOneType(i)}>-</Button>
                                </Badge>
                            </div>
                        )
                    })}
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label className="myLabel">Description</Form.Label><br></br>
                    <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} required></textarea>
                </Form.Group>

                <Form.Group controlId="formIngredients">
                    <Form.Label className="myLabel">Ingredient</Form.Label>
                    <Form.Control type="text" value={formSingleIngredient} onChange={(e) => setFormSingleIngredient(e.target.value)}></Form.Control>
                    
                    
                </Form.Group>

                <Form.Group controlId="formIngredientsAmount">
                    <Form.Label className="myLabel">Amount</Form.Label><br></br>
                    <Form.Control type="text" value={formSingleIngredientAmount} onChange={(e) => setFormSingleIngredientAmount(e.target.value)}></Form.Control>
                    <Button className="AddOneItem" variant="info" onClick={() => addNewIngredient()}><span>+</span></Button>
                    {formIngredients.map((ingredient, i) => {
                        return(
                            <div key={i}>
                                <Badge className="myBadge" variant="warning">
                                    {ingredient[0]}: {ingredient[1]}
                                    <Button className="RemoveOneItem" variant="danger" onClick={() => removeOneIngredient(i)}>-</Button>
                                </Badge>
                            </div>
                        )
                    })}
                </Form.Group>

                <Form.Group controlId="formImg">
                    <Form.Label className="myLabel">Image URL</Form.Label>
                    <Form.Control type="text" value={formImg} onChange={(e) => setFormImg(e.target.value)} required/>
                </Form.Group>

                <Button className="submitButton" variant="warning" type="submit">
                    Send new recipe
                </Button>
            </Form>
        </div>
    )
}