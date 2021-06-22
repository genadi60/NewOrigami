import React , { useContext }from 'react';
import styles from './index.module.css';
import LinkComponent from '../link';
import Links from '../../utils/links';
import UserContext from '../../Context';


const Aside = () => {

    const context = useContext(UserContext);

    const links = Links(context.user);
    return(
        <aside className={styles.aside}>
            <ul>
                { 
                    links.map((link, index) => {
                        return <LinkComponent key={index} title={link.title} href={link.path} type="aside"/>;
                    })
                }
            </ul>
        </aside>
    );
}

export default Aside;