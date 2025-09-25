import { useTranslation } from "react-i18next"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../services/userSlice";

export default function SimCard({props, onDelete}) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const sim = props
    const name = `${sim.firstName} ${sim.lastName}`
    const gender = sim.gender
    const occupation = sim.occupation != null ? sim.occupation : '-'
    const occult = sim.occult.name
    

    const handleClick = (sim) => {
        navigate(`/user/${user.user}/edit_sim`, {state: sim})
    }

    return (
        <div class="card card-sim">
            <div class="card-body">
                <h5 class="card-title">{name} {gender == 1 ? <FemaleIcon color="pink" /> : gender == 2 ? <MaleIcon color="blue" /> : <TransgenderIcon />}</h5>
                <hr class="hr" />
                <p style={{
                    fontStyle: "oblique"
                }}>
                        {t(occult)}
                </p>
                {
                    occupation != '-' ? <p>{t(occupation)}</p> : <></>
                }
                <hr class="hr" />
                <div class="container-fluid d-flex justify-content-end">
                    <Tooltip title={t("edit")}>
                        <IconButton
                            sx={{
                                color: "black.main",
                                "&:hover": {
                                    color: "primary.main"
                                }
                            }}
                            onClick={() => handleClick(sim)}>
                                <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t("delete")}>
                        <IconButton 
                            sx={{
                                color: "red.main",
                                "&:hover": {
                                    color: "darkred.main"
                                }
                            }}
                            onClick={() => onDelete(sim.id)}>
                                <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}