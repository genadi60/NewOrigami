import React from 'react';
import styles from './index.module.css';

const Post = ({description, author, index}) => {
    return(
        <div className={styles.post}>
            <img src="/blue-origami-bird.png" alt="Origami"/>
            <p className={styles.description}>
                <span>{index + 1} - </span>
                {description}
            </p>
            <div>
                <span>
                    <small>Author: </small>
                    {author}
                </span>
            </div>
        </div>
    );
}

export default Post;