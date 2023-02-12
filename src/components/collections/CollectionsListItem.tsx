import {Button, Card, CardContent, Chip, Grid} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Collection} from "../../services/fetchCollections";
import {getCollectionNFT} from "../../services/initweb3";
import {createRef, useEffect, useState} from "react";

interface CollectionsListItemProps {
    collection: Collection;
    isOwner: boolean;
}

function CollectionsListItem({ collection, isOwner }: CollectionsListItemProps) {
    const [collectionNFT, setCollectionNFT] = useState<any>(null);
    const [availableMinters, setAvailableMinters] = useState(0);

    const setSmartContract = async () => {
        if (!collectionNFT) {
            const fetchedCollection = await getCollectionNFT(collection.name);
            setCollectionNFT(fetchedCollection);
        }
    }

    const setNumberOfMinters = async () => {
        const number = await collectionNFT.approvedMintersCount();
        setAvailableMinters(number.toNumber());
    }

    useEffect(() => {
        setSmartContract();
        setNumberOfMinters();
    }, [collection, setSmartContract, setNumberOfMinters])


    let textInput: any = createRef();
    const onAddAddress = async () => {
        const tx = await collectionNFT.addMinter(textInput.current.value);
        tx.wait(1);
        const numberOfMinters = await collectionNFT.approvedMintersCount();
        setAvailableMinters(numberOfMinters.toNumber());
    }
    const onRevokeAddress = async () => {
        const tx = await collectionNFT.revokeMinter(textInput.current.value);
        tx.wait(1);
        const numberOfMinters = await collectionNFT.approvedMintersCount();
        setAvailableMinters(numberOfMinters.toNumber());
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
                    <Grid item xs={2}>
                        <div style={{fontWeight: 'bold', marginRight: '40px'}}>({availableMinters})</div>
                    </Grid>
                    <Grid item>
                        <Button color={'secondary'} variant={'outlined'}>Add patent</Button>
                    </Grid>
                </Grid>
                {
                    isOwner ?
                        <Grid>
                            <div>
                                <input ref={textInput} type="text"/>
                                <button onClick={onAddAddress}>Add</button>
                                <button onClick={onRevokeAddress}>Revoke</button>
                            </div>
                        </Grid>
                        :
                        <div></div>
                }
            </CardContent>
        </Card>
    )
}

export default CollectionsListItem;