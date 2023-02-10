import React from 'react';
import './App.css';
import Header from "./components/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import SearchBar from "./components/SearchBar";
import CollectionsList from "./components/collections/CollectionsList";
import CollectionsListItem from "./components/collections/CollectionsListItem";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1BD6DD',
        },
        secondary: {
            main: '#01213a'
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
