import React from 'react';
import './App.css';
import Header from "./components/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CollectionsList from "./components/collections/CollectionsList";
import PatentForm from "./components/patents/PatentForm";
import {Grid} from "@mui/material";

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

const data = [
    {
        name: "Physics",
        symbol: "PHY",
        owner: "x1f458983",
    },
    {
        name: "Chemistry",
        symbol: "CHE",
        owner: "x1fe23458983",
    },
    {
        name: "Biology",
        symbol: "BIO",
        owner: "x123458983",
    },
]

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Grid container>
                <Grid xs={6}>
                    <CollectionsList collections={data}/>
                </Grid>
                <Grid xs={6} marginTop={'60px'}>
                    <PatentForm collection={'Physics'}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
