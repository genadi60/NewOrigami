import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './index.module.css';


const LinkComponent = ({title, href, type}) => {
    return(
        <div className={styles[`${type}-list-item`]}>
            <NavLink to={href}>{title}</NavLink>
        </div>
    );
}

export default LinkComponent;