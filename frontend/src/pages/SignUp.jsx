import { useState } from "react"

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
            console.log(data.message)
        }
    }

    return <>
        <div class="container-fluid d-flex justify-content-center">
            <form class="mb-3 mt-3" onSubmit={onSubmit}>
                <h4 class="mb-3">Sign Up</h4>
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
                 <button type="submit" class="btn btn-signup">Sign Up</button>
            </form>
        </div>
    </>
}