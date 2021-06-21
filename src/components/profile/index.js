import React, { Component }from 'react';
import { withRouter } from 'react-router-dom';
import styles from './index.module.css';
import Post from '../post';
import Button from '../form-components/button';
import UserContext from '../../Context'

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            posts: null,
        }
    }

    static contextType = UserContext;

    logOut = () => {
        this.context.logOut();
    }

    componentDidMount(){
        const user = this.context.user;
        if (!user) {
            this.setState({
                user: undefined,
                posts: [],
            })
            this.props.history.push('/');
        }else{
            this.setState({
                user,
                posts: user.posts.slice(0, 3),
            })
        }
    }

    renderPosts = () => {
        const { user, posts } = this.state;
        return posts.length === 0 ? (<div>No posts available</div>) : posts.map((post, index) => {
            return<Post key={post._id} index={index} description={post.description} author={ user ? user.username : null }/>
        });
    }

    render() {

        const { user } = this.state;

        if (user === null) {
            return (<div>Loading...</div>);
        }

        return(
            <div className={ styles.Profile }>
                <img src="/person-bounding-box.png" alt="Person frame"/>
                <div className={ styles['personal-info'] }>
                    <p >
                        <span>Username: </span>
                        { user.username }
                    </p>
                    <p>
                        <span>Posts: </span>
                        { user.posts.length }
                    </p>
                </div>
                <Button type="button" title="Logout" onClick={this.logOut}/>
                <div className={ styles.posts }>
                    <h2>3 of your recent posts</h2>
                    { this.renderPosts() }
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);