import { useTranslation } from "react-i18next"
import { StyledIconButton } from "./Theme"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SimCard({props, onDelete}) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const user = sessionStorage.getItem('user')
    const sim = props
    const name = `${sim.firstName} ${sim.lastName}`
    const gender = sim.gender
    const occupation = sim.occupation != null ? sim.occupation : '-'
    const occult = sim.occult.name

    const handleClick = (sim) => {
        navigate(`/user/${user}/edit_sim`, {state: sim})
    }

    return (
        <div class="card card-sim">
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <hr class="hr" />
                <ul>
                    <li>{gender == 1 ? t('female') : gender == 2 ? t('male') : t('other')}</li>
                    <li>{occupation}</li>
                    <li>{t(occult)}</li>
                </ul>
                <hr class="hr" />
                <div class="container-fluid d-flex justify-content-end">
                    <Tooltip title={t("edit")}>
                        <StyledIconButton
                            onClick={() => handleClick(sim)}>
                                <EditOutlinedIcon />
                        </StyledIconButton>
                    </Tooltip>
                    <Tooltip title={t("delete")}>
                        <StyledIconButton 
                            delete
                            onClick={() => onDelete(sim.id)}>
                                <DeleteOutlineOutlinedIcon />
                        </StyledIconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}