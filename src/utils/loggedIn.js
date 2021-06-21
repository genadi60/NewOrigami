const LoggedIn = () => {
    if (!document.cookie.split('; ').find(row => row.startsWith('x-auth-token='))) {
        return false;
    }
    return true;
}

export default LoggedIn;