import React, { Component }from 'react';
import Posts from '../posts';

class Home extends Component {

    render() {
        return(
            <main>
                <h1>Publications</h1>
                <Posts/>
            </main>
        );
    }
}

export default Home;