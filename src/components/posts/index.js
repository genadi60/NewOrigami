import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Post from '../post';

const Posts = () => {

    
    const [posts, setPosts] = useState(null);

    const getPosts = async() => {
        const data = await fetch("http://localhost:9999/api/origami");
        const posts = await data.json();
        setPosts(posts);
    }

    const renderPosts = () => {
        return posts.map((post, index) => {
            return (
             <Post key={post._id} description={post.description} author={post.author} index={index}/>
            );
        });
    }

    useEffect(() => {
        getPosts();
    }, [])

    if (posts === null) {
        return (
            <div>Loading...</div>
        );
    }

    return(
        <div className={styles.posts}>
            { posts.length === 0 ? (<div>No posts available</div>) : renderPosts() }
        </div>
    );
}

export default Posts;