import React, { useContext }from 'react';
import { NavLink } from 'react-router-dom'
import styles from './index.module.css';
import LinkComponent from '../link';
import Links from '../../utils/links';
import UserContext from '../../Context';

const Header = () => {

    const context = useContext(UserContext);

    const links = Links(context.user);
    return(
        <nav className={styles.navigation}>
            <ul>
                <NavLink to="/"><img src="/white-origami-bird.png" alt="bird"/></NavLink>
                { 
                    links.map((link, index) => {
                        return (
                            <LinkComponent key={index} title={link.title} href={link.path} type="nav"/>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default Header;