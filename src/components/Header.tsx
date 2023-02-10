import {Fragment, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Box, Button, Grid} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ethers} from "ethers";
import {provider} from "../services/initweb3";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';



function Header() {
    const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(localStorage['isConnected'] && JSON.parse(localStorage['isConnected'])) {
            connectWalletHandler();
        }
    });

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const connectWalletHandler = () => {
        console.log('connectWithMetamask')
        if (window.ethereum) {
            provider?.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider?.getSigner());
            })
        } else {
            setOpen(true);
        }
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


    const accountChangedHandler = async (newAccount: any) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        localStorage.setItem('isConnected', true.toString());
        const balance = await newAccount.getBalance();
        setUserBalance(ethers.utils.formatEther(balance));
    }
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
