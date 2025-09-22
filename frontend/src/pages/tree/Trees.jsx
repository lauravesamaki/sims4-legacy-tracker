import { useTranslation } from "react-i18next"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Trees() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const username = sessionStorage.getItem('user')

    const handleClick = () => {
        navigate(`/user/${username}/trees/add_tree`)
    }

    return <>
        <div>
            <h2>{t("familyTrees")}</h2>
            <Button 
                sx={{
                    color: "black.main",
                    bgcolor: "primary.main",
                    "&:hover": {
                        color: "black.main",
                        bgcolor: "lightgreen.main",
                    }
                }}
                onClick={handleClick}>
                    {t("createNewTree")}
            </Button>
        </div>
    </>
}