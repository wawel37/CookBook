import react, {useState, useEffect} from 'react';
import './Posts.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

export default function Posts(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const URL = 'http://127.0.0.1:8000/api/post/';
        const filters = {
            "userName": "slazak"
        };
        axios.get(URL)
        .then(result => {
            console.log(result.data.data);
            setPosts(result.data.data);
        })
        .catch(err => {
            setPosts([]);
            console.log(err);
        });
    }, []);

    return (
        <div className="Posts" style={{ width: "100%"}}>
            {posts.map((post, i) => {
                return (
                    <div key = {i} classname = "post_wrapper">
	                    <Card className = "post_card">
                            <Card.Header className="title_wrapper">{post.title}</Card.Header>	
                            <Card.Img className="post_img" variant="top" src={post.img} />
                            <Card.Body>
                                <Card.Text className = "post_content_wrapper" text = 'primary'>{post.text}</Card.Text>
	                    	</Card.Body>
                            
                            <Card.Footer>
                                <small className="text-muted">{post.userName}</small>
                            </Card.Footer>
	                    </Card>
                    </div>
                    /*
                    <div key={i} className="post">
                        <p>{post.userName}</p>
                        <h1>{post.title}</h1>
                        <h1>{post.text}</h1>
                        <img src={post.img}></img>
                    </div>
                    */
                )
            })}
        </div>
    );
}