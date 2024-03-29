import {Button, Card, CardContent, Chip, Grid, TextField} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Collection} from "../../services/fetchCollections";
import {getCollectionNFT} from "../../services/initweb3";
import {SyntheticEvent, useEffect, useState} from "react";
import {Error, Success} from "../../services/responses";
import LoadingButton from '@mui/lab/LoadingButton';

const ADD_MINTER = "Add Minter";
const REVOKE_MINTER = "Revoke Minter";

interface CollectionsListItemProps {
    collection: Collection;
    isOwner: boolean;
    selectCollection: () => void;
    collectionToUpdate: string | undefined;
    setCollectionToUpdate: (value: string | undefined) => void;
}

function CollectionsListItem({
                                 collection,
                                 isOwner,
                                 selectCollection,
                                 collectionToUpdate,
                                 setCollectionToUpdate
                             }: CollectionsListItemProps) {

    const [collectionNFT, setCollectionNFT] = useState<any>(null);
    const [availableMinters, setAvailableMinters] = useState(0);
    const [addressInput, setAddressInput] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState<string | undefined>();

    useEffect(() => {
        setSmartContract();
    }, [])

    useEffect(() => {
        updateNumberOfAvailableMinters();
    }, [collectionNFT])

    useEffect(() => {
        if (collectionToUpdate && collectionToUpdate === collection.name) {
            setCollectionToUpdate(undefined);
            updateNumberOfAvailableMinters().then();
        }
    }, [collectionToUpdate])

    const setSmartContract = async () => {
        try {
            setCollectionNFT(await getCollectionNFT(collection.name));
        } catch (e) {
            setErrorMessage('Error with linking smart contract');
            setErrorOpen(true);
        }
    }

    const handleErrorClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const handleSuccessClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const updateNumberOfAvailableMinters = async () => {
        if (collectionNFT) {
            try {
                const numberOfMinters = await collectionNFT.approvedMintersCount();
                setAvailableMinters(numberOfMinters.toNumber());
            } catch (e) {
                setErrorMessage('Error with setting approved minters');
                setErrorOpen(true);
            }
        }
    }

    const onAddAddress = async () => {
        setLoading(ADD_MINTER);
        try {
            const tx = await collectionNFT.addMinter(addressInput.trim());
            await tx.wait();
            await updateNumberOfAvailableMinters();
            console.info(`${addressInput.trim()} added successfully`);
            setSuccessMessage(`${addressInput.trim()} added successfully`);
            setSuccessOpen(true);
            setAddressInput("");
        } catch (e: any) {
            setErrorMessage(e.reason);
            setErrorOpen(true);
        }
        finally {
            setLoading(undefined);
        }

    }

    const onRevokeAddress = async () => {
        setLoading(REVOKE_MINTER);
        try {
            const tx = await collectionNFT.revokeMinter(addressInput.trim());
            await tx.wait();
            await updateNumberOfAvailableMinters();
            console.info(`${addressInput.trim()} revoked successfully`);
            setSuccessMessage(`${addressInput.trim()} revoked successfully`);
            setSuccessOpen(true);
            setAddressInput("");
        } catch (e: any) {
            setErrorMessage(e.reason);
            setErrorOpen(true);
        }
        finally {
            setLoading(undefined);
        }

    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Success open={successOpen} handleClose={handleSuccessClose} message={successMessage}></Success>
                <Error open={errorOpen} handleClose={handleErrorClose} message={errorMessage}></Error>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        {isOwner && <Chip label="owner" color="success" size='small'
                                          icon={<FiberManualRecordIcon style={{transform: 'scale(0.5)'}}/>}
                                          variant="outlined"/>}
                    </Grid>
                    <Grid item xs={3}>
                        <span> {collection.name} </span>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{fontWeight: 'bold'}}>({collection.symbol})</div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{fontWeight: 'bold'}}>({availableMinters} Minters)</div>
                    </Grid>
                    <Grid item xs={2}>
                        <Button color={'secondary'}
                                variant={'outlined'}
                                onClick={selectCollection}>
                            Add patent
                        </Button>
                    </Grid>
                </Grid>
                {
                    isOwner &&
                    <Grid container paddingTop="20px" spacing={2} alignItems="center">
                        <Grid item xs>
                            <TextField value={addressInput} label="Minter's Address" placeholder="0x85fF0e5399f97..."
                                       onChange={(e) => setAddressInput(e.target.value)}
                                       variant='standard' fullWidth/>
                        </Grid>
                        <Grid item>
                            <LoadingButton variant="outlined"
                                           onClick={onAddAddress}
                                           loading={loading === ADD_MINTER}
                                           color="success">
                                Add
                            </LoadingButton>
                        </Grid>
                        <Grid item>
                            <LoadingButton variant="outlined"
                                           onClick={onRevokeAddress}
                                           loading={loading === REVOKE_MINTER}
                                           color="error">
                                Revoke
                            </LoadingButton>
                        </Grid>
                    </Grid>
                }
            </CardContent>
        </Card>
    )
}

export default CollectionsListItem;