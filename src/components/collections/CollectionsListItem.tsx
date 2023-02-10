import {Button, Card, CardContent, Chip, Grid} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface CollectionsListItemProps {
    name: string;
    symbol: string;
    owner?: boolean;
}

function CollectionsListItem({name, symbol, owner}: CollectionsListItemProps) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container spacing={'10px'} alignItems="center">
                    <Grid item xs={2}>
                        {owner && <Chip label="owner" color="success" size='small'
                                        icon={<FiberManualRecordIcon style={{transform: 'scale(0.5)'}}/>}
                                        variant="outlined"/>}
                    </Grid>
                    <Grid item sx={{ flexGrow: 1 }}>
                        <span> {name} </span>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{fontWeight: 'bold', marginRight: '40px'}} >({symbol})</div>
                    </Grid>
                    <Grid item>
                        <Button color={'secondary'} variant={'outlined'}>Add patent</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CollectionsListItem;