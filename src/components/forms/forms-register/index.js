import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../index.module.css';
import Input from '../../form-components/input';
import Title from '../../form-components/title';
import Button from '../../form-components/button';
import authenticate from '../../../utils/authenticate';
import UserContext from '../../../Context';

const Register = () => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState('');
  

    const context = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { username, password, repassword } = this.state;

        if (!username || !password || !repassword) {
           return setError('Invalid input(s)')
        }

        if (password.localeCompare(repassword) !== 0) {
            return setError('Password and Re-password not match')
        }

        await authenticate(
            'http://localhost:9999/api/user/register', { 
                username,
                password 
            }, (user) => {
                context.logIn(user);
                history.push('/');
            }, (e) => {
                setError(e.message)
            }
        )

    }

    const handleChange = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'repassword':
                setRepassword(value);
                break;
            default:
                break;
        }
    }

    return(
        <div className={styles.Register}>
            <Title title="Register page"/>
            <form onSubmit={handleSubmit}>
                <Input type="text" name="username" id="username" value={username} label="Username" onChange={(e) => handleChange(e, "username")}/>
                <Input type="password" name="password" id="password" value={password} label="Password" onChange={(e) => handleChange(e, "password")}/>
                <Input type="password" name="repassword" id="repassword" value={repassword} label="Re-password" onChange={(e) => handleChange(e, "repassword")}/>
                { error ? <div className={styles.error}><p>{error}</p></div> : null }
                <Button type="submit" title="Register" />
            </form>
        </div>
    );
}

export default Register;