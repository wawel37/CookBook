import react, {useState, useEffect} from 'react';
import './Posts.css';
import axios from 'axios';


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
        <div className="Posts">
            posty:
            {posts.map((post, i) => {
                return (
                    <div key={i} className="post">
                        <p>{post.userName}</p>
                        <h1>{post.title}</h1>
                        <h1>{post.text}</h1>
                        <img src={post.img}></img>
                    </div>
                )
            })}
        </div>
    );
}