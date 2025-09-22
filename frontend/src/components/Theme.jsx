import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { IconButton, Button } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { main } from '@popperjs/core'

const fontSize = 14
const htmlFontSize = 16
const coef = fontSize / 14

const theme = createTheme({
    palette: {
        primary: {
            main: '#1CD836',
        },
        black: {
            main: '#0f0f0f'
        },
        lightpink: {
            main: '#FFCBE2'
        },
        pink: {
            main: "#ff4a9a"
        },
        white: {
            main: '#FBFDFB'
        },
        blue: {
            main: '#9DCBFE'
        },
        red: {
            main: '#FE3958'
        },
        darkred: {
            main: '#860224'
        },
        yellow: {
            main: '#F7F581'
        },
        lightgreen: {
            main: '#D5FFCA'
        },
        lilac: {
            main: '#C8BDFF'
        }
    },
    typography: {
        pxToRem: size => `${(size / htmlFontSize) * coef}rem`,
    },
    spacing: [0, 4, 8, 16, 32, 64]
})

export {
    theme
}