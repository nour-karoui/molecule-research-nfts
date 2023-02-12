import {Fragment, SyntheticEvent, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Box, Button} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ethers} from "ethers";
import {getAccountAddress, getAccountBalance, provider} from "../../services/initweb3";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';



function Header() {
    const [defaultAccount, setDefaultAccount] = useState<string | null | undefined>(null);
    const [userBalance, setUserBalance] = useState<string | null | undefined>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setAccount();
        setBalance();
    });

    const setAccount = async () => {
        const address = await getAccountAddress();
        if(address) {
            setDefaultAccount(address);
        } else {
            setOpen(true);
        }
    };

    const setBalance = async () => {
        const balance = await getAccountBalance();
        if(balance) {
            setUserBalance(balance);
        }
    };


    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const connectWalletHandler = async () => {
        console.log('connectWithMetamask');
        await setAccount();
    }

    const action = (
        <Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}
            />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Molecule
                    </Typography>
                    {localStorage['isConnected'] && JSON.parse(localStorage['isConnected']) ?
                        <Box>
                            <AccountCircleIcon style={{fontWeight: 'bold', marginRight: '10px'}}></AccountCircleIcon>
                            <span>{defaultAccount?.slice(0, 17)}...</span>
                        </Box>
                        :
                        <Button onClick={() => connectWalletHandler()} variant="outlined" color="info">
                            Connect with MetaMask
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
