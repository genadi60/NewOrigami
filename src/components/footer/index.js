import React, { useContext }from 'react';
import { NavLink } from 'react-router-dom'
import styles from './index.module.css';
import LinkComponent from '../link';
import Links from '../../utils/links';
import UserContext from '../../Context';

const Footer = () => {

    const context = useContext(UserContext);
    
    const links = Links(context.user);
    return(
        <footer className={styles.footer}>
            <ul>
                { 
                    links.map((link, index) => {
                        return (
                            <LinkComponent key={index} title={link.title} href={link.path} type="footer"/>
                        );
                    })
                }
                <NavLink to="/"><img src="/blue-origami-bird-flipped.png" alt="bird"/></NavLink>
            </ul>
            <p>Software University &copy; 2021</p>
        </footer>
    );
}

export default Footer;