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
import {fetchWithRefresh, refreshtoken} from '../../services/refreshtoken'

export default function Sims() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const simsList = useSelector(selectSims)
    const user = useSelector(selectUser)
    const { data, error, isLoading } = useGetSimsQuery(user.user)
    const [deleteSim] = useDeleteSimMutation()

    const [alert, setAlert] = useState(null)
    const [simsData, setSimsData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetchSims()

    }, [data])

    const fetchSims = async () => {
        if (error && error.status === 302) {
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

    const handleClick = () => {
        navigate(`/user/${user.user}/add_sim`)
    }

    return (
        <div class="mt-4">
            <div>
                <Button 
                    onClick={handleClick}
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
            </div>
            <div class="row row-cols-1 row-cols-md-3 mt-4">
                {listSims}
            </div>
            {alert != null ? <InstantMessage message={alert?.message} severity={alert?.message} /> : <></>}
        </div>
    )
}