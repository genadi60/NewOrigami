import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import styles from '../index.module.css';
import Input from '../../form-components/input';
import Title from '../../form-components/title';
import Button from '../../form-components/button';
import authenticate from '../../../utils/authenticate';
import UserContext from '../../../Context';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: '',
        }
    }

    static contextType = UserContext;

    handleChange = (e, type) => {
        const newState = {};
        newState[type] = e.target.value;
        this.setState(newState);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const { username, password } = this.state;

        if(!username || !password) {
            return this.setState({
                error: 'Invalid input(s)'
            })
        }

        await authenticate(
            'http://localhost:9999/api/user/login', {
                username,
                password
            }, (user) => {
                this.context.logIn(user);
                this.props.history.push("/"); 
            }, (e) => {
                this.setState({
                    error: e.message
                })
            }
        );
    }

    render() {
        const { username, password, error} = this.state;
        return(
            <div className={styles.Login}>
                <Title title="Login page"/>
                <form onSubmit={this.handleSubmit}>
                    <Input type="text" name="username" id="username" value={username} label="Username" onChange={(e) => this.handleChange(e, "username")}/>
                    <Input type="password" name="password" id="password" value={password} label="Password" onChange={(e) => this.handleChange(e, "password")}/>
                    {error ? <div className={styles.error}><p >{error}</p></div> : null}
                    <Button type="submit" title="Login" />
                </form>
            </div>
        );
    }
    
}

export default withRouter(Login);