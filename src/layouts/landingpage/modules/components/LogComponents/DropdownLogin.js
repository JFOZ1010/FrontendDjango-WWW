import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { ButtonT } from './butt-titulo'

export default function DropdownLogin () {
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
            id="login-button"
            aria-controls={open ? 'login-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            Ingresar
        </Button>
        <Menu
            id="login-menu"
            aria-labelledby="login-button"
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
            <ButtonT action='login' titulo="Admin" />
            <ButtonT action='login' titulo="Cliente" />
            <ButtonT action='login' titulo="Supplier" />

        </Menu>
        </div>
    )
}