import CollectionsListItem from "./CollectionsListItem";
import {SyntheticEvent, useEffect, useState} from "react";
import {Box, Button, Grid} from "@mui/material";
import SearchBar from "../search-bar/SearchBar";
import {Collection, fetchCollections} from "../../services/fetchCollections";
import {getAccountAddress} from "../../services/initweb3";
import NewCollectionItem from "./NewCollectionItem";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import {Error} from "../../services/responses";

interface CollectionListProps {
    selectCollection: (collection: string) => void;
    collectionToUpdate: string | undefined;
    setCollectionToUpdate: (value: string | undefined) => void;
}

function CollectionsList({selectCollection, collectionToUpdate, setCollectionToUpdate}: CollectionListProps) {
    const [currentAccount, setCurrentAccount] = useState<any>();
    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionsData, setCollectionsData] = useState<Collection[]>([]);
    const [addingNewCollection, setAddingNewCollection] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAvailableCollections();
        setAccount();
    }, [])

    const onAddCollection = () => setAddingNewCollection(true);
    const onCloseAddCollection = () => setAddingNewCollection(false);
    const refreshCollections = async () => {
        await fetchAvailableCollections();
    }
    const setAccount = async () => {
        const address = await getAccountAddress();
        if (address) {
            setCurrentAccount(address);
        }
    }
    const fetchAvailableCollections = async () => {
        try {
            const collections = await fetchCollections();
            setCollections(collections);
            setCollectionsData(collections);
            console.info('Available collections fetched');
        } catch (e: any) {
            setErrorMessage(e.reasone);
            setErrorOpen(true);
        }
    }

    const handleErrorClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const filterCollections = (clause: string) => clause === "" ?
        setCollectionsData(collections) :
        setCollectionsData(
            collections.filter(
                collection => collection.name.toLowerCase()
                    .includes(clause.toLowerCase())));

    return (
        <Box paddingTop={'20px'}>
            <div style={{paddingBottom: '10px'}}>
                <Error open={errorOpen} handleClose={handleErrorClose} message={errorMessage}></Error>
                <Grid container>
                    <Grid sx={{flexGrow: 1}} style={{paddingRight: '40px'}}>
                        <SearchBar inputUpdated={(input) => filterCollections(input)}/>
                    </Grid>
                    <Grid>
                        {!addingNewCollection &&
                            <Button color="success" onClick={onAddCollection} variant='contained'>
                                <AddIcon/>
                            </Button>}
                        {addingNewCollection &&
                            <Button color="error" onClick={onCloseAddCollection} variant='contained'>
                                <CloseIcon/>
                            </Button>}
                    </Grid>
                </Grid>
            </div>
            {addingNewCollection &&
                <div style={{marginBlock: '10px'}}>
                    <NewCollectionItem collectionAddedCallback={refreshCollections}/>
                </div>}
            {
                collectionsData && collectionsData.map((collection: Collection) =>
                    <CollectionsListItem collection={collection}
                                         selectCollection={() => selectCollection(collection.name)}
                                         key={collection.name}
                                         isOwner={collection.owner === currentAccount}
                                         collectionToUpdate={collectionToUpdate}
                                         setCollectionToUpdate={setCollectionToUpdate}/>)
            }
        </Box>
    );
}

export default CollectionsList;