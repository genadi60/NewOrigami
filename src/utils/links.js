const Links = (user) => {

    const authenticated = [
        { 
            title: 'Post',
            path: '/share'
        },
        { 
            title: 'Profile',
            path: '/profile'
        },
    ];

    const guest = [
        { 
            title: 'Register',
            path: '/register'
        },
        { 
            title: 'Login',
            path: '/login'
        }
    ];

    return user ? authenticated : guest;
}

export default Links;