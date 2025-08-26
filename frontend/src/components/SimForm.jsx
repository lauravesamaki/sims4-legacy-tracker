import { useState } from "react";
import { useTranslation } from "react-i18next"
import { StyledButton } from "./Theme"
import InstantMessage from "./InstantMessage"

export default function SimForm({props}) {
    const sim = props?.sim?.state

    const [firstName, setFirstName] = useState(sim?.firstName || "")
    const [lastName, setLastName] = useState(sim?.lastName || "")
    const [gender, setGender] = useState(sim?.gender || "")
    const [occupation, setOccupation] = useState(sim?.occupation || "")
    const [occult, setOccult] = useState(sim?.occult.num || "")
    const [causeOfDeath, setCauseOfDeath] = useState(sim?.causeOfDeath || "")
    const [ageOfDeath, setAgeOfDeath] = useState(sim?.ageOfDeath || "")
    const [isDead, setIsDead] = useState(false)
    const [alert, setAlert] = useState(null)

    const { t } = useTranslation()

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            firstName,
            lastName,
            gender,
            occupation,
            occult,
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
                setAlert({ message: data.message, severity: "error"})
            }
            else {
                const data = await response.json()
                setFirstName("")
                setLastName("")
                setGender("")
                setAgeOfDeath("")
                setCauseOfDeath("")
                setOccult("")
                setOccupation("")
                setIsDead(false)
                
                setAlert({ message: data.message, severity: "success"})
            }
        } else {
            const id = sim.id
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
                setAlert({ message: data.message, severity: "error"})
            }
            else {
                const data = await response.json()
                setFirstName("")
                setLastName("")
                setGender("")
                setAgeOfDeath("")
                setCauseOfDeath("")
                setOccult("")
                setOccupation("")
                setIsDead(false)

                setAlert({ message: data.message, severity: "success"})
            }
        }
    }

    return <>
        <form class="row g-3" onSubmit={onSubmit}>
            <div class="col-md-6">
                <label for="inputFirstName" class="form-label">{t("firstName")}</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="inputFirstName"
                    placeholder={t("firstName")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div class="col-md-6">
                <label for="inputLastName" class="form-label">{t("lastName")}</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="inputLastName"
                    placeholder={t("lastName")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div class="col-md-6">
                <label for="inputGender" class="form-label">{t("gender")}</label>
                <select 
                    class="form-select" 
                    aria-label="Default select gender" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    required>
                        <option selected disabled value="">{t("gender")}</option>
                        <option value="1">{t("female")}</option>
                        <option value="2">{t("male")}</option>
                        <option value="3">{t("other")}</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="inputoccupation" class="form-label">{t("occupation")}</label>
                <input
                    type="text" 
                    class="form-control" 
                    id="inputoccupation"
                    placeholder={t("occupation")}
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                />
            </div>
            <div class="col-md-6">
                <label for="inputoccupation" class="form-label">{t("occult")}</label>
                <select 
                    class="form-select" 
                    aria-label="Default select occult" 
                    value={occult}
                    onChange={(e) => setOccult(e.target.value)}
                    required>
                        <option selected value="1">{t("human")}</option>
                        <option value="2">{t("alien")}</option>
                        <option value="3">{t("fairy")}</option>
                        <option value="4">{t("ghost")}</option>
                        <option value="5">{t("merfolk")}</option>
                        <option value="6">{t("servo")}</option>
                        <option value="7">{t("spellcaster")}</option>
                        <option value="8">{t("vampire")}</option>
                        <option value="9">{t("werewolf")}</option>
                </select>
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
                        {t("hasTheSimDied")}
                    </label>
                </div>
            </div>
            <div class="row g-3" hidden={!isDead}>
                <div class="col-md-6">
                    <label for="inputCauseOfDeath" class="form-label">{t("causeOfDeath")}</label>
                    <input
                        type="text" 
                        class="form-control" 
                        id="inputCauseOfDeath"
                        placeholder={t("causePlaceholder")}
                        value={causeOfDeath}
                        onChange={(e) => setCauseOfDeath(e.target.value)}
                    />
                </div>
                <div class="col-md-6">
                    <label for="inputAgeOfDeath" class="form-label">{t("ageOfDeath")}</label>
                    <select 
                        class="form-select"
                        aria-label="Default select ageOfDeath"
                        value={causeOfDeath}
                        onChange={(e) => setAgeOfDeath(e.target.value)}>
                            <option selected value="" disabled>{t("ageOfDeath")}</option>
                            <option value="1">{t("newborn")}</option>
                            <option value="2">{t("infant")}</option>
                            <option value="3">{t("toddler")}</option>
                            <option value="4">{t("child")}</option>
                            <option value="5">{t("teen")}</option>
                            <option value="6">{t("youngAdult")}</option>
                            <option value="7">{t("adult")}</option>
                            <option value="8">{t("elder")}</option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <StyledButton type="submit" tertiary>{props?.path == "add" ? t("addSim") : t("save")}</StyledButton>
            </div>
        </form>
        {alert && (
            <InstantMessage message={alert.message} severity={alert.severity} />
        )}
    </>
}