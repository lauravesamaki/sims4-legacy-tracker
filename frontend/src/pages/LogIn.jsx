import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from "../services/userApi"
import InstantMessage from "../components/InstantMessage"
import { loginUser as loginUserSlice} from "../services/userSlice"

export default function LogIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [loginUser] = useLoginUserMutation()

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username: username,
            password: password
        }

        /* const url = "http://127.0.0.1:5000/login"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }

        const response = await fetch(url, options)
        if (response !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            const data = await response.json()
            const user = data.user
            sessionStorage.setItem('user', user)
            navigate(`/user/${user}`)
        } */

        const res = await loginUser(data)
        
        if (res?.data?.login) {
            const username = res.data.user
            sessionStorage.setItem('user', username)

            const options = {
                credentials: "include"
            }

            const response = await fetch("http://127.0.0.1:5000/csrf-token", options)
            const data = await response.json()
            sessionStorage.setItem('csrf', data.token)
            dispatch(loginUserSlice({"user": username, "loggedIn": true}))
            navigate(`/user/${username}`)
        } else {
            setAlert({ message: res.error.message, severity: "error"})
        }
    }

    return <>
        <div class="container-fluid d-flex justify-content-center">
            <form class="mb-3 mt-3" onSubmit={onSubmit}>
                <h4 class="mb-3">{t("login")}</h4>
                <input
                    type="text"
                    class="form-control mb-3"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}

                 />
                 <input
                    type="password"
                    class="form-control mb-3"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                <Button
                    sx={{
                        color: "primary.main",
                        bgcolor: "black.main",
                        border: 1,
                        borderColor: "primary.main",
                        borderStyle: "solid",
                        "&:hover": {
                            color: "black.main",
                            bgcolor: "primary.main",
                            border: 1,
                            borderColor: "black.main",
                            borderStyle: "solid",
                        }
                    }}
                    type="submit">
                        {t('login')}
                </Button>
            </form>
            {alert && (
                <InstantMessage message={alert.message} severity={alert.severity} />
            )}
        </div>
    </>
}