import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../index.module.css';
import Input from '../../form-components/input';
import Title from '../../form-components/title';
import Button from '../../form-components/button';
import authenticate from '../../../utils/authenticate';
import UserContext from '../../../Context';

const Login = () => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const context = useContext(UserContext);

    const handleChange = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!username || !password) {
            return setError('Invalid input(s)');
        }

        await authenticate(
            'http://localhost:9999/api/user/login', {
                username,
                password
            }, (user) => {
                context.logIn(user);
                history.push("/"); 
            }, (e) => {
                setError(e.message)
            }
        );
    }

    return(
        <div className={styles.Login}>
            <Title title="Login page"/>
            <form onSubmit={handleSubmit}>
                <Input type="text" name="username" id="username" value={username} label="Username" onChange={(e) => handleChange(e, "username")}/>
                <Input type="password" name="password" id="password" value={password} label="Password" onChange={(e) => handleChange(e, "password")}/>
                {error ? <div className={styles.error}><p >{error}</p></div> : null}
                <Button type="submit" title="Login" />
            </form>
        </div>
    );
}

export default Login;