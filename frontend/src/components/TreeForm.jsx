import { useState } from 'react'
import { 
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Select
 } from '@mui/material'

export default function TreeForm() {
    const [relationshipType, setRelationshipType] = useState("")
    const [sim, setSim] = useState("")
    const [simRelatedTo, setSimRelatedTo] = useState("")
    
    return (
        <div class="container-fluid mt-4">
            <FormControl fullWidth>
                <InputLabel id="select-label" required>Select Root Sim</InputLabel>
                <Select
                    labelId="select-label"
                    id="select">

                </Select>
            </FormControl>
        </div>
    )
}