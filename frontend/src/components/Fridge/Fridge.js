import {useState, useEffect} from 'react';
import axios from 'axios';
import './Fridge.css';
import { Form, Button, Badge } from 'react-bootstrap';
import DishCard from '../DishCard/DishCard';

export default function Fridge(){

    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [ingredientChoice, setIngredientChoice] = useState(null);
    const [ingredientChoiceList, setIngredientChoiceList] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect( async () => {
        let isMounted = true;
        const URLavailableIngredients = 'http://127.0.0.1:8000/api/ingredient';
        const URLrecipes = getQueryURL();

        try{
            let response = await axios.get(URLavailableIngredients);
            if(isMounted){
                setAvailableIngredients(response.data.data);
                setIngredientChoice(response.data.data[0]);
            }

            response = await axios.get(URLrecipes);
            setRecipes(response.data.data);
            
            

        }catch(err){
            alert(err);
        }

        return () => isMounted = false;
    }, [ingredientChoiceList])

    const handleAdd = (e) =>{
        e.preventDefault();
        if(!ingredientChoiceList.includes(ingredientChoice)){
            setIngredientChoiceList(ingredientChoiceList => [ingredientChoice, ...ingredientChoiceList]);
        }
    }

    const handleRemoval = (key) =>{
        setIngredientChoiceList(ingredientChoiceList.filter((item, index) => index !== key));
    }

    const getQueryURL = () =>{
        let result = 'http://127.0.0.1:8000/api/dish_with_ingredient?ingredients=';
        for(const ingredient of ingredientChoiceList){
            result += ingredient + ",";
        }
        return result;
    }


    return(
        <div className="Fridge">

            <Form className="myForm" onSubmit={handleAdd}>
            <Form.Label className="myLabel">Ingredient</Form.Label>
                <select name="Ingredient" onChange={(e) => setIngredientChoice(e.target.value)}>
                    {availableIngredients.map((ingredient, key) =>{
                        return <option value={ingredient} key={key}>{ingredient.toUpperCase()}</option>
                    })}
                </select>

                <Button className="submitButton" variant="primary" type="submit">
                    +
                </Button>
            </Form>

            {ingredientChoiceList.map((choice, i) =>{
                return (
                    <div key={i} className="Choice">
                        <Badge className="myBadge" variant="warning">
                            <span>{choice}</span>
                            <Button className="RemoveOneItem" variant="danger" onClick={() => handleRemoval(i)}>-</Button>
                        </Badge>
                    </div>
                )
            })}

            {recipes.map((recipe, key) =>{
                return(
                    <DishCard recipe={recipe} key={key}/>
                )
            })}
        </div>
    )
}