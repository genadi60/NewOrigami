import { useState, useEffect, useContext }from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import Post from '../post';
import Button from '../form-components/button';
import UserContext from '../../Context'

const Profile = () => {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const history = useHistory();
    const context = useContext(UserContext);

    
    useEffect(() => {
        const user = context.user;
        if (!user) {
            setUser(undefined);
            setPosts([]);
            history.push('/');
        }else{
            setUser(user);
            setPosts(user.posts.slice(0, 3));
        }
        // eslint-disable-next-line
    }, []);

    const logOut = () => {
        context.logOut();
        history.push('/');
    }

    const renderPosts = () => {
        return posts.length === 0 ? (<div>No posts available</div>) : posts.map((post, index) => {
            return<Post key={ post._id } index={ index } description={ post.description } author={ user ? user.username : null }/>
        });
    }

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
            <Button type="button" title="Logout" onClick={ logOut }/>
            <div className={ styles.posts }>
                <h2>3 of your recent posts</h2>
                { renderPosts() }
            </div>
        </div>
    );
}

export default Profile;