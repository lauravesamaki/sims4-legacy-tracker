import { useState } from "react"

export default function LogIn() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username,
            email,
            password
        }
    }

    return <>
        <div class="container-fluid d-flex justify-content-center">
            <div class="mb-3 mt-3">
                <h4 class="mb-3">Log In</h4>
                <input
                    type="email"
                    class="form-control mb-3"
                    id="email"
                    placeholder="Email"
                 />
                 <input
                    type="password"
                    class="form-control mb-3"
                    id="password"
                    placeholder="Password"
                 />
                 <button type="submit" class="btn btn-login">Log In</button>
            </div>
        </div>
    </>
}