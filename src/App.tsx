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

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <SearchBar inputUpdated={(a) => void console.log(a)}
                       addCollection={() => console.log("collection added")}/>
            <CollectionsList/>
        </ThemeProvider>
    );
}

export default App;
