import { Outlet, Link, useNavigate } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector"
import { useTranslation } from "react-i18next"

export default function LayoutUser() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        navigate('/')
    }
    
    const username = sessionStorage.getItem('user')
    const {t} = useTranslation()

    return <>
        <nav class="navbar navbar-expand-lg nav-bg position-sticky">
            <div class="container-fluid flex flex-wrap">
                <div class="container-fluid d-flex justify-content-between">
                    <div class="d-inline-flex">
                        <img src="/src/assets/TS4_Logo_Plumbob.jpg.webp" alt="Logo" width="30" />
                        <p class="navbar-brand text-white m-2">The Sims 4 Legacy Challenge Tracker</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-primary-new" type="button" onClick={handleLogout}>Log Out</button>
                        <LanguageSelector />
                    </div>
                </div>
                <div>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to='/' class="nav-link" tabIndex={1}>{t('home')}</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='rules' class="nav-link" tabIndex={1}>{t('rules')}</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" tabIndex={1}>
                                {t('randomizers')}
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link to="dices" class="dropdown-item">{t('dices')}</Link></li>
                                <li><Link to="randomizers" class="dropdown-item">{t('randomizers')}</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row align-items-start">
                <div class="col-1 d-flex justify-content-center flex-wrap">
                    <Link to={`/user/${username}`} class="w-100 nav-link">Profile</Link>
                    <Link to={`/user/${username}/sims`} class="w-100 nav-link">Sims</Link>
                    <p class="w-100">Tree</p>
                </div>
                <div class="col-11">
                    <Outlet />
                </div>
            </div>
        </div>

        <footer class="text-center text-lg-start footer-bg text-white">
            <div class="text-center p-4">
                © 2025 Copyright
            </div>
        </footer>
    </>
}