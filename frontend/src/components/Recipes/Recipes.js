import ReactDOM from 'react-dom'
import './Recipes.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DishCard from '../DishCard/DishCard'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function Recipes(){

    const [availableTypes, setAvailableTypes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedType, setSelectedType] = useState([null]);
    const [URL, setURL] = useState(["http://127.0.0.1:8000/api/dish_of_type?types="]);

    useEffect(async() => {
        let mounted = true;
        
        const typesURL = "http://127.0.0.1:8000/api/types";
        
        try{
            let response = await axios.get(typesURL);
            if(mounted){
                setAvailableTypes(response.data.data);
            }

            response = await axios.get(URL);
            setRecipes(response.data.data);


        }catch(err){
            alert(err);
        }

        return () => mounted = false;
    }, [])

    const getQueryURL = () =>{
        let result = 'http://127.0.0.1:8000/api/dish_of_type?types=';
        result += selectedType;
        console.log(result);
        return result;
    }

    const mainFun = (name) => {
        setSelectedType(name);
        setURL(getQueryURL());
    }

    return (
        <div className = "Recipes">
            <div className = "form_wrapper">
                <Form className="myForm">
                <Form.Label className="myLabel">Choose Type</Form.Label>
                    <select name="type" onChange={(e) => mainFun(e.target.value)}>
                        {availableTypes.map((type, k) =>{
                            return <option value={type} key={k}>{type.toUpperCase()}</option>
                        })}
                    </select>
                </Form>
            </div>
            
            <div className="recipes_wrapper">
                {recipes.map((recipe, i) => {
                    return ( 
                        <div className = "dishcard_wrapper" key = {i}>             
                            <DishCard  recipe={recipe}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}