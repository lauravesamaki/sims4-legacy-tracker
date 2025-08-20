import { useState, useEffect } from 'react'
import SimCard from '../components/SimCard'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Sims() {
    const user = sessionStorage.getItem('user')
    const [sims, setSims] = useState([])
    const {t} = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        fetchSims()
    }, [])

    const fetchSims = async () => {
        const response = await fetch(`http://127.0.0.1:5000/user/${user}/sims`)
        const data = await response.json()
        setSims(data.sims)
        console.log(data.sims)
    }

    const listSims = sims != null ? sims.map(sim => 
            <div class="col">
                <SimCard props={sim} key={sim.id} />
            </div>
        ) : 'There are no sims yet!'

    const handleClick = () => {
        navigate(`/user/${user}/add_sim`)
    }

    return (
        <div class="mt-4">
            <div>
                <button class="btn btn-form-primary mb-4" onClick={handleClick}>{t('addSim')}</button>
            </div>
            <div class="row row-cols-1 row-cols-md-3">
                {listSims}
            </div>
        </div>
    )
}