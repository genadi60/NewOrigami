import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import styles from '../index.module.css';
import Input from '../../form-components/input';
import Title from '../../form-components/title';
import Button from '../../form-components/button';
import authenticate from '../../../utils/authenticate';
import UserContext from '../../../Context';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repassword: '',
            error: '',
        }
    }

    static contextType = UserContext;

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const { username, password, repassword } = this.state;

        if (!username || !password || !repassword) {
           return this.setState({
                error: 'Invalid input(s)'
            })
        }

        if (password.localeCompare(repassword) !== 0) {
            return this.setState({
                error: 'Password and Re-password not match'
            })
        }

        await authenticate(
            'http://localhost:9999/api/user/register', { 
                username,
                password 
            }, (user) => {
                this.context.logIn(user);
                this.props.history.push('/');
            }, (e) => {
                this.setState({
                    error: e.message
                })
            }
        )

    }

    handleChange = (e, type) => {
        const newState = {};
        newState[type] = e.target.value;
        this.setState(newState);
    }

    render() {

        const { username, password, repassword, error } = this.state;
        return(
            <div className={styles.Register}>
                <Title title="Register page"/>
                <form onSubmit={this.handleSubmit}>
                    <Input type="text" name="username" id="username" value={username} label="Username" onChange={(e) => this.handleChange(e, "username")}/>
                    <Input type="password" name="password" id="password" value={password} label="Password" onChange={(e) => this.handleChange(e, "password")}/>
                    <Input type="password" name="repassword" id="repassword" value={repassword} label="Re-password" onChange={(e) => this.handleChange(e, "repassword")}/>
                    { error ? <div className={styles.error}><p>{error}</p></div> : null }
                    <Button type="submit" title="Register" />
                </form>
            </div>
        );
    }
    
}

export default withRouter(Register);