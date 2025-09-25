import { useState } from "react";
import { useTranslation } from "react-i18next"
import { Button } from "@mui/material";
import InstantMessage from "./InstantMessage"
import { useDispatch } from "react-redux";
import { addSim } from "../services/simsSlice";
import { useAddSimMutation, useEditSimMutation } from "../services/simsApi";
import fetchWithRefresh from "../services/refreshtoken";
import { useNavigate } from "react-router-dom";

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
    const [addNewSim] = useAddSimMutation()
    const [editSim] = useEditSimMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = sessionStorage.getItem('user')
    const { t } = useTranslation()

    function resetForm(res) {
        setFirstName("")
        setLastName("")
        setGender("")
        setAgeOfDeath("")
        setCauseOfDeath("")
        setOccult("")
        setOccupation("")
        setIsDead(false)

        setAlert({ message: res.data.message, severity: "success"})
    }

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
            const req = () => addNewSim({
                username,
                newSim: data
            })
            let res = await fetchWithRefresh(req, dispatch, navigate)

            if (res.error) {
                setAlert({ message: "Error in adding sim", severity: "error"})
            } else {
                resetForm(res)
                const sim = [res.data.sim]
                dispatch(addSim(sim))
            }
        } else {
            const id = sim.id
            const req = () => editSim({
                id,
                sim: data
            })
            let res = await fetchWithRefresh(req, dispatch, navigate)

            if (res.error) {
                setAlert({ message: "Error in editing sim", severity: "error"})
            } else {
                resetForm(res)
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
                <Button 
                    type="submit" 
                    sx={{
                        color: "black.main",
                        bgcolor: "primary.main",
                        border: "1px solid primary.main",
                        "&:hover": {
                            color: "black.main",
                            bgcolor: "lightgreen.main"
                        }
                    }}>
                        {props?.path == "add" ? t("addSim") : t("save")}
                </Button>
            </div>
        </form>
        {alert && (
            <InstantMessage message={alert.message} severity={alert.severity} />
        )}
    </>
}