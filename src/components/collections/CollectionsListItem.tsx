import {Button, Card, CardContent, Chip, Grid, TextField} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Collection} from "../../services/fetchCollections";
import {getCollectionNFT} from "../../services/initweb3";
import {SyntheticEvent, useEffect, useState} from "react";
import {Error} from "../../services/responses";


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
    const [addressInput, setAddressInput] = useState("")
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setSmartContract();
    }, [])

    useEffect(() => {
        updateNumberOfAvailableMinters();
    }, [collectionNFT])

    useEffect(() => {
        if (collectionToUpdate && collectionToUpdate === collection.name)
            setCollectionToUpdate(undefined);
    }, [collectionToUpdate])

    const setSmartContract = async () => {
        try {
            setCollectionNFT(await getCollectionNFT(collection.name));
        }catch (e) {
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

    const updateNumberOfAvailableMinters = async () => {
        if(collectionNFT) {
            try {
                const numberOfMinters = await collectionNFT.approvedMintersCount();
                setAvailableMinters(numberOfMinters.toNumber());
            }catch (e) {
                setErrorMessage('Error with setting approved minters');
                setErrorOpen(true);
            }
        }
    }

    const onAddAddress = async () => {
        try{
            const tx = await collectionNFT.addMinter(addressInput.trim());
            await tx.wait();
            await updateNumberOfAvailableMinters();
        } catch (e: any) {
            setErrorMessage(e.reason);
            setErrorOpen(true);
        }

    }
    const onRevokeAddress = async () => {
        try {
            const tx = await collectionNFT.revokeMinter(addressInput.trim());
            await tx.wait();
            await updateNumberOfAvailableMinters();
        } catch (e: any) {
            setErrorMessage(e.reason);
            setErrorOpen(true);
        }

    }
    return (
        <Card variant="outlined">
            <CardContent>
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
                        <Button color={'secondary'} variant={'outlined'} onClick={selectCollection}>Add patent</Button>
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
                                <Button variant="outlined" onClick={onAddAddress} color="success">Add</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={onRevokeAddress} color="error">Revoke</Button>
                            </Grid>
                        </Grid>
                }
            </CardContent>
        </Card>
    )
}

export default CollectionsListItem;