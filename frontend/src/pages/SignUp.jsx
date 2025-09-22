import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username,
            password
        }

        const url = "http://127.0.0.1:5000/signup"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            const data = await response.json()
            sessionStorage.setItem("token", data.access_token)
            const username = data.user
            dispatch(loginUser(username))
            navigate(`/user/${username}`)
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
        </div>
    </>
}