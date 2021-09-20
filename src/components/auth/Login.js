import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import "./Login.css"


export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserEmailCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8000/users?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const existingUserPasswordCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8000/users?password=${loginUser.password}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }


    const handleLogin = (e) => {
        e.preventDefault()

        existingUserEmailCheck() && existingUserPasswordCheck()
            .then(exists => {
                if (exists) {
                    // The user id is saved under the key nutshell_user in session Storage. Change below if needed!
                    sessionStorage.setItem("midea_user", exists.id)
                    history.push("/")
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <div className="login-body">
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <p className="login">Log In</p>
                    <p className="login_note">login here using your username and password</p>
                    <fieldset className="login_info">
                        <label htmlFor="inputEmail" className="label_text"> Email address: </label>
                        <input type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />

                        <label htmlFor="inputPassword" className="label_text"> Password: </label>
                        <input type="password"
                            id="password"
                            className="form-control"
                            placeholder="password"
                            required autoFocus
                            value={loginUser.password}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="sign-in">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register" className="register_note">Register for an account</Link>
            </section>
        </main>
        </div>
    )
}
