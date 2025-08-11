import { useState } from "react";

const SimForm = ({ }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [gender, setGender] = useState("")
    const [professional, setProfessional] = useState("")
    const [causeOfDeath, setCauseOfDeath] = useState("")
    const [ageOfDeath, setAgeOfDeath] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            gender,
            professional,
            causeOfDeath,
            ageOfDeath
        }

        const url = "http://127.0.0.1:5000/add_sim"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        }
        else {
            //success
        }
    }

    return <form onSubmit={onSubmit} class="row g-3">
        <div class="container d-flex justify-content-center flex-wrap flex-row row-cols-2">
            <div class="col-md-5">
                <label htmlFor="firstName">First Name: </label>
                <input 
                    type="text" 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div class="col-md-5">
                <label htmlFor="lastName">Last Name: </label>
                <input 
                    type="text" 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div class="col-md-5">
                <label htmlFor="gender">Gender: </label>
                <input 
                    type="text" 
                    id="gender" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                />
            </div>
            <div class="col-md-5">
                <label htmlFor="professional">Professional: </label>
                <input 
                    type="text" 
                    id="professional" 
                    value={professional} 
                    onChange={(e) => setProfessional(e.target.value)}
                />
            </div>
            <div class="col-md-5">
            <label htmlFor="causeOfDeath">Cause Of Death: </label>
            <input 
                type="text" 
                id="causeOfDeath" 
                value={causeOfDeath} 
                onChange={(e) => setCauseOfDeath(e.target.value)}
            />
            </div>
            <div class="col-md-5">
                <label htmlFor="ageOfDeath">Age Of Death: </label>
                <input 
                    type="text" 
                    id="ageOfDeath" 
                    value={ageOfDeath} 
                    onChange={(e) => setAgeOfDeath(e.target.value)}
                />
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Create Sim</button>
    </form>
}

export default SimForm