import { useState, useEffect } from 'react'
import SimCard from '../../components/SimCard'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { StyledButton } from '../../components/Theme'
import InstantMessage from '../../components/InstantMessage'

export default function Sims() {
    const user = sessionStorage.getItem('user')
    const [sims, setSims] = useState([])
    const [alert, setAlert] = useState(null)
    const {t} = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        fetchSims()
    }, [])

    const fetchSims = async () => {
        const response = await fetch(`http://127.0.0.1:5000/user/${user}/sims`)
        const data = await response.json()
        setSims(data.sims)
    }

    const handleDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/sim/${id}`, options)
            
            if (response.status == 200) {
                setSims((prev) => prev.filter((sim) => sim.id !== id))
            } else {
                setAlert({ message: "Failed to delete sim", severity: "error"})
            }
        } catch (error) {
            setAlert({ message: error, severity: "error"})
        }
    }

    const listSims = sims != null ? sims.map(sim => 
            <div class="col" key={sim.id}>
                <SimCard props={sim} onDelete={handleDelete} />
            </div>
        ) : 'There are no sims yet!'

    const handleClick = () => {
        navigate(`/user/${user}/add_sim`)
    }

    return (
        <div class="mt-4">
            <div>
                <StyledButton onClick={handleClick}>{t('addSim')}</StyledButton>
            </div>
            <div class="row row-cols-1 row-cols-md-3 mt-4">
                {listSims}
            </div>
            <InstantMessage message={alert.message} severity={alert.message} />
        </div>
    )
}