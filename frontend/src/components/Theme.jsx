import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { IconButton, Button } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const fontSize = 14
const htmlFontSize = 16
const coef = fontSize / 14

const theme = createTheme({
    colors: {
        primary: '#1CD836',
        primary300: '#7ee679',
        black: '#0f0f0f',
        white: '#FBFDFB',
        blue: '#9DCBFE',
        red: '#FE3958',
        yellow: '#F7F581',
        pink: '#FECAD9'
    },
    typography: {
        pxToRem: size => `${(size / htmlFontSize) * coef}rem`,
    },
})

// Styled components
// Buttons
const StyledButton = styled(Button)`
    color: ${props => 
        props.primary 
        ? theme.colors.black 
        : theme.colors.primary};
    background-color: ${props => 
        props.primary
        ? theme.colors.white
        : theme.colors.black};
    font-weight: 400;
    border: 1px solid ${props => 
        props.primary
        ? theme.colors.white
        : props.secondary
        ? theme.colors.primary
        : theme.colors.black};
    margin-left: ${props => props.secondary ? '0.5rem' : '0'};
    
    &:hover {
        background-color: ${props => props.primary || props.secondary ? theme.colors.primary : theme.colors.black};
        color: ${props => props.primary || props.secondary ? theme.colors.black : theme.colors.yellow};
        border: 1px solid ${props => props.theme.colors.black};
    }
`

const StyledIconButton = styled(IconButton)`
    color: ${props => props.white ? theme.colors.white : theme.colors.black};

    &:hover {
        color: ${props => props.white ? theme.colors.primary : theme.colors.primary};
    }
`

export {
    theme,
    StyledButton,
    StyledIconButton
}