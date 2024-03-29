import React, {useState} from 'react';
import './App.css';
import Header from "./components/header/Header";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CollectionsList from "./components/collections/CollectionsList";
import PatentForm from "./components/patents/PatentForm";
import {Alert, AlertTitle, Grid} from "@mui/material";
import Footer from "./components/footer/Footer";

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
    const [selectedCollection, setSelectedCollection] = useState<string | undefined>();
    const [collectionToUpdate, setCollectionToUpdate] = useState<string | undefined>();
    const [addedData, setAddedData] = useState<{patentId: string, collection: string} | undefined>();

    const addPatentCallback = (collection: string, patentId: string) => {
        setAddedData({patentId, collection})
        setCollectionToUpdate(collection);
    }

    return (
        <ThemeProvider theme={theme}>
            {
                window.ethereum ?
                    <div>
                        <Header/>
                        <Grid container paddingBottom="100px">
                            <Grid item xs={6}>
                                <CollectionsList selectCollection={setSelectedCollection}
                                                 collectionToUpdate={collectionToUpdate}
                                                 setCollectionToUpdate={setCollectionToUpdate}
                                />
                            </Grid>
                            {selectedCollection &&
                                <Grid item xs={6} marginTop={'60px'}>
                                    <PatentForm patentAddedCallback={addPatentCallback}
                                                collectionName={selectedCollection}/>
                                </Grid>}
                        </Grid>
                        {addedData && <Footer patentId={addedData.patentId} collectionName={addedData.collection}/>}
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
