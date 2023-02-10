import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Box, Button} from "@mui/material";

function Header() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Molecule
                    </Typography>
                    <Button variant="outlined" color="secondary">
                        Connect with MetaMask
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
