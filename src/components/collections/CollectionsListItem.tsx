import {Button, Card, CardContent, Chip, Grid} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Collection} from "../../services/fetchCollections";
import {getCollectionNFT} from "../../services/initweb3";
import {createRef, useEffect, useState} from "react";

function CollectionsListItem(props: { collection: Collection, isOwner: boolean }) {
    const [collectionNFT, setCollectionNFT] = useState<any>(null);
    const [availableMinters, setAvailableMinters] = useState(0);

    const setSmartContract = async () => {
        if (!collectionNFT) {
            const collection = await getCollectionNFT(props.collection.name);
            setCollectionNFT(collection);
        }
    }

    const setNumberOfMinters = async () => {
        const number = await collectionNFT.approvedMintersCount();
        setAvailableMinters(number.toNumber());
    }

    useEffect(() => {
        setSmartContract();
        setNumberOfMinters();
    }, [props.collection.name, setSmartContract, setNumberOfMinters])


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
                        {props.isOwner && <Chip label="owner" color="success" size='small'
                                                icon={<FiberManualRecordIcon style={{transform: 'scale(0.5)'}}/>}
                                                variant="outlined"/>}
                    </Grid>
                    <Grid item sx={{flexGrow: 1}}>
                        <span> {props.collection.name} </span>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{fontWeight: 'bold', marginRight: '40px'}}>({props.collection.symbol})</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{fontWeight: 'bold', marginRight: '40px'}}>({availableMinters})</div>
                    </Grid>
                    <Grid item>
                        <Button color={'secondary'} variant={'outlined'}>Add patent</Button>
                    </Grid>
                </Grid>
                {
                    props.isOwner ?
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