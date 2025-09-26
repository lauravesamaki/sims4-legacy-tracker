import { useEffect, useState } from 'react'
import { 
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Select,
    Button,
    MenuItem,
 } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { selectSims } from '../services/simsSlice'
import { useSelector } from 'react-redux'


export default function RelationshipForm(props) {
    const {t} = useTranslation()
    const sims = useSelector(selectSims)
    const [relationshipType, setRelationshipType] = useState("")
    const [sim, setSim] = useState("")
    const [simRelatedTo, setSimRelatedTo] = useState("")
    const [error, setError] = useState(false)

    const relationshipTypes = [
        {
            "id": 1,
            "type": "Kumppani"
        },
        {
            "id": 2,
            "type": "Lapsi"
        }
    ]

    const onSubmit = () => {
        console.log("test")
    }

    const menuItems = sims?.map((sim) => {
        return <MenuItem key={sim.id} value={sim.id}>
            {sim.firstName} {sim.lastName}
        </MenuItem>
    })
    
    return (
        <FormControl 
            class="row g-3" 
            onSubmit={onSubmit} 
            fullWidth 
            variant='outlined'>
                <div class="col-md-6">
                    <FormControl fullWidth>
                        <InputLabel 
                            id="select-label1" 
                            sx={{
                                color: error ? "red.main": "black.main",
                                bgcolor: sim !== '' ? "white.main" : "none",
                                borderRadius: "2px",
                                "&.Mui-focused": {
                                    color: error ? "red.main": "primary.main",
                                    bgcolor: "white.main"
                                }
                            }}
                            required>
                                {t("selectFirstSim")}
                        </InputLabel>
                        <Select
                            labelId="select-label1"
                            id="select1"
                            value={sim}
                            label={t("selectFirstSim")}
                            onChange={(e) => {
                                setSim(e.target.value)
                                if (e.target.value === simRelatedTo) {
                                    setError(true)
                                } else {
                                    setError(false)
                                }
                            }}
                            error={error}
                            sx={{
                                bgcolor: "white.main"
                            }}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                </div>
                <div class="col-md-6">
                    <FormControl fullWidth>
                        <InputLabel 
                            id="select-label2" 
                            sx={{
                                color: error ? "red.main": "black.main",
                                bgcolor: sim !== '' ? "white.main" : "none",
                                borderRadius: "2px",
                                "&.Mui-focused": {
                                    color: error ? "red.main": "primary.main",
                                    bgcolor: "white.main"
                                }
                            }}
                            required>
                                {t("selectSecondSim")}
                        </InputLabel>
                        <Select
                            labelId="select-label2"
                            id="select2"
                            value={simRelatedTo}
                            label={t("selectSecondSim")}
                            onChange={(e) => {
                                setSimRelatedTo(e.target.value)
                                if (sim === e.target.value) {
                                    setError(true)
                                } else {
                                    setError(false)
                                }
                            }}
                            error={error}
                            sx={{
                                bgcolor: "white.main",
                                width: "100%"
                            }}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                </div><div class="col-md-6">
                    <FormControl fullWidth>
                        <InputLabel 
                            id="select-label3" 
                            sx={{
                                color: "black.main",
                                bgcolor: relationshipType !== '' ? "white.main" : "none",
                                borderRadius: "2px",
                                "&.Mui-focused": {
                                    bgcolor: "white.main"
                                }
                            }}
                            required>
                                {t("selectRelationshipType")}
                        </InputLabel>
                        <Select
                            labelId="select-label3"
                            id="select3"
                            value={relationshipType}
                            label={t("selectRelationshipType")}
                            onChange={(e) => setRelationshipType(e.target.value)}
                            sx={{
                                bgcolor: "white.main",
                                width: "100%"
                            }}
                        >
                            {
                                relationshipTypes.map((type) => {
                                    return <MenuItem key={type.id} value={type.id}>
                                        {type.type}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
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
                            {props?.path == "add" ? t("addRelationship") : t("save")}
                    </Button>
                </div>
        </FormControl>
    )
}