import React from 'react';
import './App.css';
import Header from "./components/Header";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CollectionsList from "./components/collections/CollectionsList";
import PatentForm from "./components/patents/PatentForm";
import {Alert, AlertTitle, Grid} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3C79F5',
        },
        secondary: {
            main: '#098292'
        },
        info: {
            main: '#f0e6d5'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            {
                window.ethereum ?
                    <div>
                        <Header/>
                        <Grid container>
                            <Grid xs={6}>
                                <CollectionsList/>
                            </Grid>
                            <Grid xs={6} marginTop={'60px'}>
                                <PatentForm collection={'test'}/>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    <div>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            You're Not Connected to the Blockchain — <strong>Add metamask wallet !</strong>
                        </Alert>
                    </div>
            }
        </ThemeProvider>
    );
}

export default App;
