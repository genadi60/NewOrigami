import React, { Component }from 'react';
import { NavLink } from 'react-router-dom'
import styles from './index.module.css';
import LinkComponent from '../link';
import Links from '../../utils/links';
import UserContext from '../../Context';

class Header extends Component {

    static contextType = UserContext;

    render() {

        const { user } = this.context;
        const links = Links(user);
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
    
}

export default Header;