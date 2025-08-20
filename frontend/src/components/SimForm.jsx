import { useState } from "react";

export default function SimForm({props}) {
    const [firstName, setFirstName] = useState(props?.firstName || "")
    const [lastName, setLastName] = useState(props?.lastName || "")
    const [gender, setGender] = useState(props?.gender || "")
    const [professional, setProfessional] = useState(props?.professional || "")
    const [causeOfDeath, setCauseOfDeath] = useState(props?.causeOfDeath || "")
    const [ageOfDeath, setAgeOfDeath] = useState(props?.ageOfDeath || "")
    const [isDead, setIsDead] = useState(false)

    console.log(props?.path)

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

        if (props?.path == 'add') {
            const url = `http://127.0.0.1:5000/user/${sessionStorage.getItem('user')}/add_sim`
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
                alert(data.message)
            }
        } else {
            const id = props?.id
            const url = `http://127.0.0.1:5000/sim/${id}`
            const options = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, options)
            if (response.status !== 201 && response.status !== 200) {
                const data = await response.json()
                alert(data.message)
            }
            else {
                alert(data.message)
            }
        }
    }

    return (
        <form class="row g-3" onSubmit={onSubmit}>
            <div class="col-md-6">
                <label for="inputFirstName" class="form-label">First name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="inputFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div class="col-md-6">
                <label for="inputLastName" class="form-label">Last name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="inputLastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div class="col-md-6">
                <label for="inputGender" class="form-label">Gender</label>
                <select 
                    class="form-select" 
                    aria-label="Default select gender" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    required>
                        <option selected disabled value="">Gender</option>
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                        <option value="3">Other</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="inputProfessional" class="form-label">Professional</label>
                <input
                    type="text" 
                    class="form-control" 
                    id="inputProfessional"
                    value={professional}
                    onChange={(e) => setProfessional(e.target.value)}
                />
            </div>
            <div class="col-12">
                <div class="form-check mb-3">
                    <input
                        class="form-check-input" 
                        type="checkbox"
                        checked={isDead}
                        onChange={() => setIsDead(!isDead)}
                        id="checkIfDead"
                    />
                    <label class="form-check-label" for="checkIfDead">
                        Has the sim died?
                    </label>
                </div>
            </div>
            <div class="death-div row" hidden={!isDead}>
                <div class="col-md-6">
                    <label for="inputCauseOfDeath" class="form-label">Cause Of Death</label>
                    <input
                        type="text" 
                        class="form-control" 
                        id="inputCauseOfDeath"
                        placeholder="Old age, fire etc"
                        value={causeOfDeath}
                        onChange={(e) => setCauseOfDeath(e.target.value)}
                    />
                </div>
                <div class="col-md-6">
                    <label for="inputAgeOfDeath" class="form-label">Age Of Death</label>
                    <select 
                        class="form-select"
                        aria-label="Default select ageOfDeath"
                        value={causeOfDeath}
                        onChange={(e) => setAgeOfDeath(e.target.value)}>
                            <option selected>Age Of Death</option>
                            <option value="1">Baby</option>
                            <option value="2">Toddler</option>
                            <option value="3">Child</option>
                            <option value="4">Teen</option>
                            <option value="5">Young Adult</option>
                            <option value="6">Adult</option>
                            <option value="7">Elder</option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-form-primary">Add sim</button>
            </div>
        </form>
    )
}