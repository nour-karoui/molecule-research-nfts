import {Button, Card, CardContent, Chip, Grid, TextField} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Collection} from "../../services/fetchCollections";
import {getCollectionNFT} from "../../services/initweb3";
import {createRef, useEffect, useState} from "react";

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
        setCollectionNFT(await getCollectionNFT(collection.name));
    }

    const updateNumberOfAvailableMinters = async () => {
        if(collectionNFT) {
            const numberOfMinters = await collectionNFT.approvedMintersCount();
            setAvailableMinters(numberOfMinters.toNumber());
        }
    }

    const onAddAddress = async () => {
        const tx = await collectionNFT.addMinter(addressInput.trim());
        await tx.wait();
        await updateNumberOfAvailableMinters();
    }
    const onRevokeAddress = async () => {
        const tx = await collectionNFT.revokeMinter(addressInput.trim());
        await tx.wait();
        await updateNumberOfAvailableMinters();
    }
    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container spacing={'10px'} alignItems="center">
                    <Grid item xs={2}>
                        {isOwner && <Chip label="owner" color="success" size='small'
                                          icon={<FiberManualRecordIcon style={{transform: 'scale(0.5)'}}/>}
                                          variant="outlined"/>}
                    </Grid>
                    <Grid item sx={{flexGrow: 1}}>
                        <span> {collection.name} </span>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{fontWeight: 'bold', marginRight: '40px'}}>({collection.symbol})</div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{fontWeight: 'bold', marginRight: '40px'}}>({availableMinters} Minters)</div>
                    </Grid>
                    <Grid item>
                        <Button color={'secondary'} variant={'outlined'} onClick={selectCollection}>Add patent</Button>
                    </Grid>
                </Grid>
                {
                    isOwner &&
                        <Grid container paddingTop="20px" spacing={2} alignItems="center">
                            <Grid item sx={{flexGrow: 1}}>
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