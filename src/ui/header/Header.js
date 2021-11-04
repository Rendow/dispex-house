import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";

export function Header(){
    return(
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" >
                </IconButton>
                <Typography variant="h6" color="inherit">
                    House
                </Typography>
            </Toolbar>
        </AppBar>)
}