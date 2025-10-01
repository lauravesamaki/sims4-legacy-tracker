import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSim, removeSim, selectSims } from '../../services/simsSlice'
import SimCard from '../../components/SimCard'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import InstantMessage from '../../components/InstantMessage'
import { selectUser } from '../../services/userSlice'
import { useGetSimsQuery, useDeleteSimMutation } from "../../services/simsApi";
import { Button } from '@mui/material'
import { refreshtoken } from '../../services/refreshtoken'
import {theme} from '../../components/Theme'
import { addRelationships } from '../../services/relationshipSlice'

export default function Sims() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const simsList = useSelector(selectSims)
    const user = useSelector(selectUser)
    const [deleteSim] = useDeleteSimMutation()
    const { data, error, isLoading } = useGetSimsQuery(user.user)
    const [alert, setAlert] = useState(null)
    const [simsData, setSimsData] = useState([])

    useEffect(() => {
        fetchSims()
    }, [data])

    const fetchSims = async () => {
        if (!data || (error && error.status === 302)) {
            const refreshed = await refreshtoken(dispatch, navigate)

            if (refreshed) {
                setSimsData(data?.sims)
                dispatch(addSim(data?.sims))
            }
        } else {
            setSimsData(data?.sims)
            dispatch(addSim(data?.sims))            
        }
    }

    const handleDelete = async (id) => {
        const res = await deleteSim(id)

        if (res.error) {
            setAlert({ message: "Failed to delete sim", severity: "error"})
        } else {
            dispatch(removeSim(id != id))
            setAlert({ message: "Sim has been deleted succesfully!", severity: "success"})
        }
    }

    const listSims = simsData != null ? simsData.map(sim => 
            <div class="col" key={sim.id}>
                <SimCard props={sim} onDelete={handleDelete} />
            </div>
        ) : 'There are no sims yet!'

    function handleClick(page){
        if(page === 'sim') {
            navigate(`/user/${user.user}/add_sim`)
        } else {
            navigate(`/user/${user.user}/relationships/add`)
        }
    }

    return (
        <div class="mt-4">
            <h2>{t('sims')}</h2>
            <div>
                <Button 
                    onClick={() => handleClick('sim')}
                    sx={{
                        color: "black.main",
                        bgcolor: "primary.main",
                        "&:hover": {
                            color: "black.main",
                            bgcolor: "white.main",
                        }
                    }}
                    >
                        {t('addSim')}
                </Button>
                <Button
                    onClick={() => handleClick('rel')}
                    sx={{
                        color: "black.main",
                        bgcolor: "primary.main",
                        marginLeft: theme.spacing(2),
                        "&:hover": {
                            color: "black.main",
                            bgcolor: "white.main",
                        }
                    }}>
                    {t("addRelationship")}
                </Button>
            </div>
            <div class="row row-cols-1 row-cols-md-3 mt-4">
                {listSims}
            </div>
            {alert != null ? <InstantMessage message={alert?.message} severity={alert?.message} /> : <></>}
        </div>
    )
}