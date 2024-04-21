import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        // Initialize Google One Tap client
        /* global google */ // Add this comment to inform ESLint that 'google' is globally defined
        if (typeof google !== "undefined" && google.accounts) {
            google.accounts.id.initialize({
                client_id: '142853328057-0scqefs2cv8p8kj1en1fgfpo7su2sohs.apps.googleusercontent.com',
                callback: handleGoogleSignIn
            });
            google.accounts.id.prompt();
        }
    }, []);

    // Handle response from Google One Tap
    // function handleCredentialResponse(response) {
    //     const credential = response.credential;
    //     // Use credential to authenticate user or sign up user
    //     // For now, let's just log the response
    //     console.log(credential);
    // }
    const handleGoogleSignIn = (response) => {
        // Handle the signed in user's profile information
        console.log(response.credential); // The ID Token
      }
    async function submit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/", { email, password });
            if (res.data === "exist") {
                history("/home", { state: { id: email } });
            } else if (res.data === "notexist") {
                alert("User has not signed up");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging in");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={submit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/signup">Signup Page</Link>
        </div>
    )
}

export default Login;
