const hasCookie = (cookieName) => {
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith(cookieName));

    if (!cookie) {
        return false;
    }
    return true;
};

const getToken = (promise) => {
    return promise.headers.get('Authorization').split(' ')[1];
}

const authenticate = async (url, body, onSuccess, onError) => {
    try {
        const promise = await fetch(url, { 
            method: 'POST', 
            body: JSON.stringify(body), 
            headers: { 'Content-Type': 'application/json' }
        });

        const authToken = getToken(promise);
        const response = await promise.json();
        if(response.username && authToken) {

            if(!hasCookie('x-auth-token')){
                document.cookie = `x-auth-token=${authToken};max-age=3600`;
            }  
            onSuccess(
                response
            );
        } else if(response.error){
            throw new Error(response.error);
        }else {
            throw new Error('Unauthenticated request!')
        }
    } catch (err) {
        onError(err);
    }
}
export default authenticate;