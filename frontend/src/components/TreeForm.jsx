import { useState } from 'react'
import { 
    FormControl,
    InputLabel,
    Button,
    OutlinedInput,
    MenuItem,
    Select,
    Checkbox,
    ListItemText
 } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import InstantMessage from "./InstantMessage"
import { useTranslation } from 'react-i18next'
import { selectSims } from '../services/simsSlice'
import { useSelector } from 'react-redux'

export default function TreeForm(props) {
    const simsData = useSelector(selectSims)
    const {t} = useTranslation()
    const [alert, setAlert] = useState(null)
    const [name, setName] = useState('')
    const [sims, setSims] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
        const tree = {
            name: name,
            sim
        }
    }

    const handleChange = (event) => {
        const {
        target: { value }
        } = event;
        
        setSims(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
        console.log(sims)
    };

    return <>
        <form class="row g-3" onSubmit={onSubmit}>
                <div class="col-md-12">
                    <FormControl fullWidth>
                        <InputLabel htmlFor="name-input">
                                {t('name')}
                        </InputLabel>
                        <OutlinedInput
                            id='name-input'
                            label={t('name')}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                bgcolor: "white.main"
                            }}
                        />
                    </FormControl>
                </div>
                <div class="col-md-12">
                    <FormControl fullWidth>
                        <InputLabel 
                            id="select-label1"
                            sx={{
                                color: "black.main"
                            }}
                        >
                                {t("selectSims")}
                        </InputLabel>
                        <Select
                            labelId="select-label1"
                            id="select1"
                            multiple
                            value={sims}
                            label={t("selectSims")}
                            onChange={handleChange}
                            renderValue={(selected) => selected.map((id) => {
                                const sim = simsData.find((s) => s.id === id)
                                return sim ? `${sim.firstName} ${sim.lastName}` : ""
                            }).join(', ')}
                            sx={{
                                bgcolor: "white.main",
                            }}
                        >
                            {
                                simsData?.map((sim) => (
                                    <MenuItem key={sim.id} value={sim.id}>
                                        <Checkbox checked={sims.includes(sim.id)} />
                                        <ListItemText primary={sim.firstName + ' ' + sim.lastName} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div class="col-md-6">
                    
                </div>
                <div class="col-md-6">
                    
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
                            {props?.path == "add" ? t("addTree") : t("save")}
                    </Button>
                </div>
        </form>
        {alert && (
            <InstantMessage message={alert.message} severity={alert.severity} />
        )}
    </>
}
