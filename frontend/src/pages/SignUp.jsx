export default function SignUp() {
    return <>
        <div class="container-fluid d-flex justify-content-center">
            <form class="mb-3 mt-3">
                <h4 class="mb-3">Sign Up</h4>
                <input 
                    type="text"
                    class="form-control mb-3"
                    id="username"
                    placeholder="Username"
                />
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
                 <button type="submit" class="btn btn-signup">Sign Up</button>
            </form>
        </div>
    </>
}