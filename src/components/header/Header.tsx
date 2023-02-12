import {Fragment, SyntheticEvent, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Box, Button, Grid} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {getAccountAddress, getAccountBalance, provider} from "../../services/initweb3";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Header() {
    const [defaultAccount, setDefaultAccount] = useState<string | null | undefined>(null);
    const [userBalance, setUserBalance] = useState<number | null | undefined>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setAccount();
        setBalance();
    });

    const setAccount = async () => {
        const address = await getAccountAddress();
        if (address) {
            setDefaultAccount(address);
        } else {
            setOpen(true);
        }
    };

    const setBalance = async () => {
        const balance = await getAccountBalance();
        if (balance) {
            setUserBalance(Math.round(parseFloat(balance) * 10000) / 10000);
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

    const copyAddress = async () => {
        await navigator.clipboard.writeText(defaultAccount ?? "");
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
                <CloseIcon fontSize="small"/>
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
                    {defaultAccount ?
                        <Box>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <span style={{marginRight: "10px"}}>
                                                {defaultAccount?.slice(0, 5) + "..." + defaultAccount?.slice(-5)}
                                            </span>
                                        </Grid>
                                        <Grid item>
                                            <IconButton color="info" onClick={copyAddress}>
                                                <ContentCopyIcon fontSize="small"/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="start">
                                        <span style={{fontWeight: 'bold'}}>
                                            {userBalance} ETH
                                        </span>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <AccountCircleIcon fontSize="large"
                                                       style={{marginRight: '10px'}}></AccountCircleIcon>
                                </Grid>
                            </Grid>
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
