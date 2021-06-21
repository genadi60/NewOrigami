import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Post from '../post';
import styles from './index.module.css';
import Button from '../form-components/button';
import Title from '../form-components/title';
import UserContext from '../../Context';

class SharePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            posts: null,
            description: '',
            error: null
        }
    }

    static contextType = UserContext;
    

    getPosts = () => {
        const user = this.context.user;
        if (user === null) {
            this.setState({
                user: undefined,
                posts: [],
            })
            this.props.history.push('/');
        }else{
            this.setState({
                user,
                posts: user.posts.slice((user.posts.length - 3) >= 0 ? (user.posts.length - 3) : 0).reverse(),
            })
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const description  = e.target.description.value;

        const { error } = this.state;

        if (!error && !description) {
            this.setState( 
                {error: 'Invalid input'}
            );
            return this.getPosts();
        }
        
        const id = this.state.user._id;
    
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
            this.context.user = response;
            this.getPosts();
        }
         
    }

    componentDidUpdate(prevState){
        if ( prevState.posts !== null && prevState.posts !== undefined && prevState.posts !== this.state.posts) {
            this.render();
          }
    }

    renderPosts = () => {
        const { posts } = this.state;
        return posts.map((post, index) => {
            return (
                <Post key={post._id} index={index} description={post.description} author={this.context.user.username}/>
                );
        });
    }

    renderPage = () => {
        const { user, posts, error } = this.state;
        if (user === null) {
            return (<div>Loading...</div>);
        }
        return (
            <div className={styles.Input}>
                <Title title="Share your thoughts..."/>
                <form onSubmit={this.handleSubmit}>
                    <textarea type="text" name="description"></textarea>
                    { error ? <div className={styles.error}><p>{error}</p></div> : null }
                    <Button type="submit" title='Post'/>
                </form>
                <div className={styles.posts}>
                    <h2>Last 3 posts on your wall</h2>
                    { posts.length === 0 ? (<div>No posts available</div>) : this.renderPosts()}
                </div>
            </div>
        );
    }

    render() {

        return this.renderPage();
    }
    
}

export default withRouter(SharePost);