import { useState } from 'react'
import { useTranslation } from "react-i18next"
import { GB, FI } from 'country-flag-icons/react/3x2'
import { IconButton, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

export default function LanguageSelector() {    
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)

    const handleClick = (e) => {
        setAnchor(e.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null)
    }

    const handleChangeLng = (code) => {
        i18n.changeLanguage(code)
        handleClose()
    }

    let countries = [
        {
            code: "en",
            name: "English",
            country_code: "gb"
        },
        {
            code: "fi",
            name: "Suomi",
            country_code: "fi"
        }
    ]

    const { t, i18n } = useTranslation()

    return <>
        <IconButton
            sx={{
                color: "white.main",
                "&:hover": {
                    color: "primary.main"
                }
            }}
            aria-label="lngSelect"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
                <LanguageOutlinedIcon />
        </IconButton>

        <Menu
            id='basic-menu'
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'lngSelect'
                }
            }}>
                {countries.map((lng) => {
                    return (
                        <MenuItem 
                            key={lng.code}
                            onClick={() => handleChangeLng(lng.code)}>
                            <ListItemIcon>
                                <span class={`fi fi-${lng.country_code} me-2`}></span>
                                <ListItemText>{lng.name}</ListItemText>
                            </ListItemIcon>
                        </MenuItem>
                    )
                })}
        </Menu>
    </>
}