import { Outlet, Link, useNavigate } from "react-router-dom";

export default function LayoutUser() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }
    return <>
        <nav class="navbar navbar-expand-lg nav-bg">
            <div class="container-fluid flex flex-wrap">
                <div class="container-fluid d-flex justify-content-between">
                    <div class="d-inline-flex">
                        <img src="src/assets/TS4_Logo_Plumbob.jpg.webp" alt="Logo" width="30" />
                        <p class="navbar-brand text-white m-2">The Sims 4 Legacy Challenge Tracker</p>
                    </div>
                    <div class="align-content-center">
                        <button class="btn btn-login-nav" type="button" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
                <div class="d-flex w-50 justify-content-center link-row">
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to='/' class="nav-link" tabIndex={1}>Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='rules' class="nav-link" tabIndex={1}>Rules</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" tabIndex={1}>
                                Randomizer
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link to="dices" class="dropdown-item">Dices</Link></li>
                                <li><Link to="randomizers" class="dropdown-item">Randomizers</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <Outlet />

        <footer class="text-center text-lg-start footer-bg text-white fixed-bottom">
            <div class="text-center p-4">
                © 2025 Copyright
            </div>
        </footer>
    </>
}