import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./Context";

const App = (props) => {
    
    const context= useContext(UserContext);
    const history = useHistory();
    const [user, setUser] = useState(null);

    const logIn = (user) => {
        setUser(user);
        context.user = user;
    };

    const logOut = () => {
        document.cookie =
            "x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(undefined);
        history.push("/");
    };

    const getToken = (cookieName) => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(cookieName));

        if (!cookie) {
            return null;
        }

        return cookie.split("=")[1];
    };

    useEffect(() => {
        const token = getToken("x-auth-token");
        if (token === null && user !== null) {
            return logOut();
        }

        fetch(`http://localhost:9999/api/user/check`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((promise) => promise.json())
        .then((response) => {
            if (response.status) {
                return logIn(response.user);
            }
            logOut();
        })
        .catch(() => {
            history.push("/");
        });
        // eslint-disable-next-line
    }, []);

   
        if (user === null) {
            return <div> Loading... </div>;
        }
        return (
            <UserContext.Provider
                value={{
                    user,
                    logIn,
                    logOut,
                }}>
                {props.children}
            </UserContext.Provider>
        );
   
}

export default App;
