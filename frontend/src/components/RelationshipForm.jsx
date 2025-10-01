import { useEffect, useState } from 'react'
import { 
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Select,
    Button,
    MenuItem,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
 } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { selectSims } from '../services/simsSlice'
import { useDispatch, useSelector } from 'react-redux'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAddRelationshipMutation } from '../services/relationshipsApi'
import { fetchWithRefresh } from "../services/refreshtoken";
import { useNavigate } from 'react-router-dom'
import InstantMessage from "./InstantMessage"

export default function RelationshipForm(props) {
    const {t} = useTranslation()
    const sims = useSelector(selectSims)
    const [relationshipType, setRelationshipType] = useState("")
    const [sim, setSim] = useState("")
    const [simRelatedTo, setSimRelatedTo] = useState("")
    const [error, setError] = useState(false)
    const [open, setOpen] = useState(false)
    const [addRelationship] = useAddRelationshipMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alert, setAlert] = useState(null)

    const relationshipTypes = [
        {
            "id": 1,
            "type": t('parent')
        },
        {
            "id": 2,
            "type": t('child')
        },
        {
            "id": 3,
            "type": t('spouse')
        },
        {
            "id": 4,
            "type": t('sibling')
        },
        {
            "id": 5,
            "type": t('uncle')
        },
        {
            "id": 6,
            "type": t('aunt')
        },
        {
            "id": 7,
            "type": t('niece')
        },
        {
            "id": 8,
            "type": t('nephew')
        },
        {
            "id": 9,
            "type": t('grandparent')
        },
        {
            "id": 10,
            "type": t('grandchild')
        }
    ]

    function resetForm(res) {
        setSim("")
        setSimRelatedTo("")
        setRelationshipType("")

        setAlert({ message: res.data.message, severity: "success"})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const relType = relationshipType.toLowerCase()
        const data = {
            simId: sim,
            relatedToId: simRelatedTo,
            relationshipType: relType
        }
        
        const req = () => addRelationship(data)

        let res = await fetchWithRefresh(req, dispatch, navigate)
        
        if (res.error) {
            setAlert({ message: "Error in adding relationship", severity: "error"})
        } else {
            resetForm(res)
        }
    }

    const menuItems = sims?.map((sim) => {
        return <MenuItem key={sim.id} value={sim.id}>
            {sim.firstName} {sim.lastName}
        </MenuItem>
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    return <>
        <form class="row g-3" onSubmit={onSubmit}>
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
                </div>
                <div class="col-md-6">
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
                                    return <MenuItem key={type.id} value={type.type}>
                                        {type.type}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div class="col-md-6 align-content-center">
                    <IconButton
                        sx={{
                            color: "white.main",
                            "&:hover": {
                                color: "primary.main"
                            }
                        }}
                        onClick={handleClickOpen}>
                            <InfoOutlinedIcon />
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='info-dialog-title'
                        aria-describedby='info-dialog-description'>
                            <DialogTitle id='indo-dialog-title'>
                                {t('info')}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                        {t('infoText')}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>
                                    {t('close')}
                                </Button>
                            </DialogActions>
                    </Dialog>
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
        </form>
        {alert && (
            <InstantMessage message={alert.message} severity={alert.severity} />
        )}
    </>
}