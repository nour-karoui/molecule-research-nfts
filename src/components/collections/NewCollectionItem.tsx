import {Card, CardContent, Grid, TextField} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {collectionsFactory} from "../../services/initweb3";
import {Error, Success} from "../../services/responses";
import {LoadingButton} from "@mui/lab";

interface NewCollectionItemProps {
    collectionAddedCallback?: () => any;
}

const ADD_COLLECTION = "Add Collection";

function NewCollectionItem({collectionAddedCallback}: NewCollectionItemProps) {

    const [newName, setNewName] = useState('');
    const [newSymbol, setNewSymbol] = useState('');

    const [newNameIsValid, setNewNameIsValid] = useState(true);
    const [newSymbolIsValid, setNewSymbolIsValid] = useState(true);

    const [newNameIsPristine, setNewNameIsPristine] = useState(true);
    const [newSymbolIsPristine, setNewSymbolIsPristine] = useState(true);

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState<string | undefined>();

    const handleSuccessClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const handleErrorClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const onAddCollection = async () => {
        setLoading(ADD_COLLECTION);
        try {
            const tx = await collectionsFactory.createNewCollection(newName.trim(), newSymbol.trim());
            await tx.wait();
            if (collectionAddedCallback) collectionAddedCallback();
            console.info(`new collection ${newName.trim()} added successfully`);
            setSuccessMessage(`new collection ${newName.trim()} added successfully`);
            setSuccessOpen(true);
        } catch (e: any) {
            setErrorMessage(e.reason);
            setErrorOpen(true);
        } finally {
            setLoading(undefined);
        }
    }

    const onNewNameChange = (value: string) => {
        setNewNameIsPristine(false);
        setNewNameIsValid(value !== "");
        setNewName(value);
    }

    const onNewSymbolChange = (value: string) => {
        setNewSymbolIsPristine(false);
        setNewSymbolIsValid(value !== "");
        setNewSymbol(value.toUpperCase());
    }

    return (
        <Card variant="outlined">
            <Success open={successOpen} handleClose={handleSuccessClose} message={successMessage}></Success>
            <Error open={errorOpen} handleClose={handleErrorClose} message={errorMessage}></Error>
            <CardContent style={{padding: '10px'}}>
                <Grid container spacing={'10px'}>
                    <Grid item sx={{flexGrow: 1}}>
                        <TextField label="New Collection Name"
                                   placeholder="My Collection Name" fullWidth
                                   helperText={newNameIsValid ? '' : 'Field required'}
                                   error={!newNameIsValid}
                                   value={newName} onChange={(e) => onNewNameChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="New Collection Symbol"
                                   placeholder="COL" fullWidth
                                   helperText={newSymbolIsValid ? '' : 'Field required'}
                                   error={!newSymbolIsValid}
                                   value={newSymbol} onChange={(e) => onNewSymbolChange(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LoadingButton color={'secondary'}
                                       loading={loading === ADD_COLLECTION}
                                       disabled={!(newNameIsValid && newSymbolIsValid)
                                           || newSymbolIsPristine || newNameIsPristine}
                                       onClick={onAddCollection}
                                       variant={'outlined'}>
                            Add Collection
                        </LoadingButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default NewCollectionItem;