import React from 'react';
import './App.css';
import Header from "./components/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CollectionsList from "./components/collections/CollectionsList";

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
            <CollectionsList collections={data}/>
        </ThemeProvider>
    );
}

export default App;
