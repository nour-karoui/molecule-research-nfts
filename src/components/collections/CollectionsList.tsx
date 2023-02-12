import CollectionsListItem from "./CollectionsListItem";
import {useEffect, useState} from "react";
import {Box, Button, Grid} from "@mui/material";
import SearchBar from "../search-bar/SearchBar";
import {Collection, fetchCollections} from "../../services/fetchCollections";
import {getAccountAddress} from "../../services/initweb3";
import NewCollectionItem from "./NewCollectionItem";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

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
        const collections = await fetchCollections();
        setCollections(collections);
        setCollectionsData(collections)
    }
    const filterCollections = (clause: string) => clause === "" ?
        setCollectionsData(collections) :
        setCollectionsData(
            collections.filter(
                collection => collection.name.toLowerCase()
                    .includes(clause.toLowerCase())));

    return (
        <Box paddingTop={'20px'}>
            <div style={{paddingBottom: '10px'}}>
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
                    <NewCollectionItem collectionAddedCallback={refreshCollections} />
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