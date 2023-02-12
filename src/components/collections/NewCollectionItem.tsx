import {Button, Card, CardContent, Chip, Grid, TextField} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {useState} from "react";

interface NewCollectionItemProps {

}

function NewCollectionItem({}) {

    const [newName, setNewName] = useState('');
    const [newSymbol, setNewSymbol] = useState('');

    const [newNameIsValid, setNewNameIsValid] = useState(true);
    const [newSymbolIsValid, setNewSymbolIsValid] = useState(true);

    const [newNameIsPristine, setNewNameIsPristine] = useState(true);
    const [newSymbolIsPristine, setNewSymbolIsPristine] = useState(true);

    const onAddCollection = () => {
        // Note to self: use trimed values
        console.log(newName.trim());
        console.log(newSymbol.trim());
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
            <CardContent style={{padding: '10px'}}>
                <Grid container spacing={'10px'} >
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
                        <Button color={'secondary'}
                                disabled={!(newNameIsValid && newSymbolIsValid)
                                    || newSymbolIsPristine || newNameIsPristine}
                                onClick={onAddCollection}
                                variant={'outlined'}>
                            Add Collection
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default NewCollectionItem;