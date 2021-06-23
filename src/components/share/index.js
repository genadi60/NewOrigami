import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Post from '../post';
import styles from './index.module.css';
import Button from '../form-components/button';
import Title from '../form-components/title';
import UserContext from '../../Context';

const SharePost = () => {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory();
    const context = useContext(UserContext);
    

    useEffect(() => {
        getPosts();
    // eslint-disable-next-line    
    }, []);

    const getPosts = () => {
        const user = context.user;
        if (!user) {
            setUser(undefined);
            setPosts([]);
            history.push('/');
        }else{
            setUser(user);
            setPosts(user.posts.slice((user.posts.length - 3)).reverse());
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const description  = e.target.description.value;

        if (!error && !description) {
            setError('Invalid input');
            return getPosts();
        }
        
        const id = user._id;
        const token = document.cookie.split('=')[1]
        
        const promise = await fetch("http://localhost:9999/api/origami", {
            method: 'POST',
            body: JSON.stringify({ description, author: id}),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const response = await promise.json();
        if (response.username) {
            e.target.description.value = '';
            context.user = response;
            getPosts();
        }
         
    }

    const renderPosts = () => {
        return posts.map((post, index) => {
            return (
                <Post key={post._id} index={index} description={post.description} author={user.username}/>
                );
        });
    }

    
    if (user === null) {
        return (<div>Loading...</div>);
    }
    return (
        <div className={styles.Input}>
            <Title title="Share your thoughts..."/>
            <form onSubmit={handleSubmit}>
                <textarea type="text" name="description"></textarea>
                { error ? <div className={styles.error}><p>{error}</p></div> : null }
                <Button type="submit" title='Post'/>
            </form>
            <div className={styles.posts}>
                <h2>Last 3 posts on your wall</h2>
                { posts.length === 0 ? (<div>No posts available</div>) : renderPosts()}
            </div>
        </div>
    );
}

export default SharePost;