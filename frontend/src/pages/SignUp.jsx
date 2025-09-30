import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useAddUserMutation } from "../services/userApi"
import { loginUser } from "../services/userSlice"
import InstantMessage from "../components/InstantMessage"

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [addUser] = useAddUserMutation()
    const [alert, setAlert] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username,
            password
        }

        const res = await addUser(data)

        if(res?.data?.addedUser) {
            const username = res.data.user
            const token = res.data.csrf

            sessionStorage.setItem('user', username)
            sessionStorage.setItem('csrf', token)

            dispatch(loginUser({"user": username, "loggedIn": true}))
            navigate(`/user/${username}`)
        } else {
            setAlert({ message: res.error.message, severity: "error"})
        }
    }

    return <>
        <div class="container-fluid d-flex justify-content-center">
            <form class="mb-3 mt-3" onSubmit={onSubmit}>
                <h4 class="mb-3">{t("signup")}</h4>
                <input 
                    type="text"
                    class="form-control mb-3"
                    id="username"
                    placeholder={t("username")}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password"
                class="form-control mb-3"
                id="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
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
                    }}>
                    {t('signup')}
                </Button>
            </form>
            {alert && (
                <InstantMessage message={alert.message} severity={alert.severity} />
            )}
        </div>
    </>
}