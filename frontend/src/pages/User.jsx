import { useState, useEffect } from 'react'

export default function User() {
    const [sims, setSims] = useState([])

    useEffect(() => {
        fetchSims()
    }, [])

    const fetchSims = async () => {
        const response = await fetch("http://127.0.0.1:5000/user/laura")
        const data = await response.json()
        setSims(data.sims)
        console.log(data.sims)
    }

    return (
        <div class="container-fluid">
            {sims != null ? 'There are at least one sim' : 'There are no sims yet'}
        </div>
    )
}