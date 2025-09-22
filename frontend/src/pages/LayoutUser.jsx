import { Outlet, Link, useNavigate } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector"
import { useTranslation } from "react-i18next"
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../services/userSlice";

export default function LayoutUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        sessionStorage.clear()
        dispatch(logoutUser())
        navigate('/')
    }
    
    const username = sessionStorage.getItem("user")
    const {t} = useTranslation()

    return (
        <div class="d-flex flex-column min-vh-100">
            <nav class="navbar navbar-expand-lg nav-bg position-sticky">
                <div class="container-fluid flex flex-wrap">
                    <div class="container-fluid d-flex justify-content-between">
                        <div class="d-inline-flex">
                            <img src="/src/assets/TS4_Logo_Plumbob.jpg.webp" alt="Logo" width="30" />
                            <p class="navbar-brand text-white m-2">The Sims 4 Legacy Challenge Tracker</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <Button 
                                type="button" 
                                onClick={handleLogout} 
                                sx={{
                                    color: "black.main",
                                    bgcolor: "white.main",
                                    border: "1px solid white.main",
                                    "&:hover": {
                                        color: "black.main",
                                        bgcolor: "primary.main",
                                        border: "1px solid black.main"
                                    }
                                }}>
                                    {t("logout")}
                            </Button>
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
            <div class="container-fluid row flex-grow-1">
                <div class="col-1 sidebar">
                    <Link to={`/user/${username}`} class="w-100 nav-link">{t("profile")}</Link>
                    <Link to={`/user/${username}/sims`} class="w-100 nav-link">{t("sims")}</Link>
                    <Link to={`/user/${username}/trees`} class="w-100 nav-link">{t("familyTrees")}</Link>
                </div>
                <div class="col-11">
                    <Outlet />
                </div>
            </div>

            <footer class="text-center text-lg-start footer-bg text-white mt-auto">
                <div class="text-center p-4">
                    © 2025 Copyright
                </div>
            </footer>
        </div>
    )
}