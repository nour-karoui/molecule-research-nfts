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
                    <Grid item xs={0.8}>
                        {owner && <Chip label="owner" color="success" size='small'
                                        icon={<FiberManualRecordIcon style={{transform: 'scale(0.5)'}}/>}
                                        variant="outlined"/>}
                    </Grid>
                    <Grid item>
                        <div style={{fontWeight: 'bold'}} >{symbol}</div>
                    </Grid>
                    <Grid item>
                        <span style={{marginRight: '40px'}}> {name} </span>
                    </Grid>
                    <Grid item>
                        <Button color={'secondary'} variant={'contained'}>Add patent</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CollectionsListItem;