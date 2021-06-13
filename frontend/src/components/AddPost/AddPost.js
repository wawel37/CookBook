import './AddPost.css';
import { Form, Button } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';



export default function AddPost(){

    const [formUserName, setFormUserName] = useState('');
    const [formText, setFormText] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [formImg, setFormImg] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const URL = 'http://localhost:8000/api/post/';
        const toSend = {
            "data":{
                "text": formText,
                "userName": formUserName,
                "title": formTitle,
                "img": formImg
            }
        }

        try{
            const response = await axios.post(URL, toSend);
            setFormText('');
            setFormTitle('');
            setFormImg('');
            setFormUserName('');
            alert('Successfully sent a new post!');

        }catch(err){
            alert(err.response.data.error);
        }
    }

    return(
        <div className="AddPost">
            <p>Add a new post</p>
            <Form className="myForm" onSubmit={handleSubmit}>
                <Form.Group controlId="formUserName">
                    <Form.Label className="myLabel">User Name</Form.Label>
                    <Form.Control type="text" value={formUserName} onChange={(e) => setFormUserName(e.target.value)}  required />
                </Form.Group>

                <Form.Group controlId="formTitle">
                    <Form.Label className="myLabel">Title</Form.Label>
                    <Form.Control type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="formText">
                    <Form.Label className="myLabel">Text</Form.Label><br></br>
                    <textarea value={formText} onChange={(e) => setFormText(e.target.value)} required></textarea>
                </Form.Group>

                <Form.Group controlId="formImg">
                    <Form.Label className="myLabel">Image URL</Form.Label>
                    <Form.Control type="text" value={formImg} onChange={(e) => setFormImg(e.target.value)} required/>
                </Form.Group>

                <Button className="submitButton" variant="warning" type="submit">
                    Send new post
                </Button>
            </Form>
        </div>
    )
}