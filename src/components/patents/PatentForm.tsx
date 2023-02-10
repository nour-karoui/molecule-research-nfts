import {Box, Grid, TextField} from "@mui/material";

function PatentForm() {


    const validatePatentId = (patentId: string) => {

    }


    return (
        <Box marginX={'30px'}>
            <Grid container>
                <TextField label="Researcher" variant='standard' fullWidth/>
            </Grid>
            <Grid container>
                <TextField label="University" variant='standard' fullWidth/>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TextField label="Patent Id" variant='standard' fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Institution" variant='standard' fullWidth/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PatentForm;