import CollectionsListItem from "./CollectionsListItem";
import {useEffect, useState} from "react";
import {Box, Button, Grid} from "@mui/material";
import SearchBar from "../SearchBar";
import {Collection, fetchCollections} from "../../services/fetchCollections";
import {provider} from "../../services/initweb3";
import NewCollectionItem from "./NewCollectionItem";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';


function CollectionsList() {
    const [currentAccount, setCurrentAccount] = useState<any>();
    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionsFetched, setCollectionsFetched] = useState<Boolean>(false);
    const [collectionsData, setCollectionsData] = useState<Collection[]>([]);
    const [addingNewCollection, setAddingNewCollection] = useState(false);

    useEffect(() => {
        fetchAvailableCollections();
        setAccount(provider?.getSigner());

    }, [collections])

    const onAddCollection = () => setAddingNewCollection(true);
    const onCloseAddCollection = () => setAddingNewCollection(false);

    const setAccount = async (newAccount: any) => {
        const address = await newAccount.getAddress();
        setCurrentAccount(address);
    }
    const fetchAvailableCollections = async () => {
        if (!collectionsFetched) {
            const collections = await fetchCollections();
            setCollections(collections);
            setCollectionsData(collections)
            setCollectionsFetched(true);
        }
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
                    <NewCollectionItem/>
                </div>}
            {
                collectionsData && collectionsData.map((collection: Collection) =>
                    <CollectionsListItem collection={collection}
                                         key={collection.symbol}
                                         isOwner={collection.owner === currentAccount}/>)
            }
        </Box>
    );
}

export default CollectionsList;