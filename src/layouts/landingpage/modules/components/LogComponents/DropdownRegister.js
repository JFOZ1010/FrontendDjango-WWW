import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { ButtonT } from './butt-titulo'

export default function DropdownRegister () {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
        <Button
            color="inherit"
            variant="h6"
            underline="none"
            id="signup-button"
            aria-controls={open ? 'sign-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            Registrarse
        </Button>
        <Menu
            id="sign-menu"
            aria-labelledby="signup-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
            }}
        >
            <ButtonT returnTo='/Dashboard/RegistroAdmin' action='signup' titulo="Admin" />
            <ButtonT returnTo='/Dashboard/RegistroCliente' action='signup' titulo="Cliente" />
            <ButtonT returnTo='/Dashboard/RegistroSupplier' action='signup' titulo="Supplier" />
        </Menu>
        </div>
    )
}