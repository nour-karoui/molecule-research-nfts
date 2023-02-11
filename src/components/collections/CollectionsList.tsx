import CollectionsListItem from "./CollectionsListItem";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import SearchBar from "../SearchBar";
import {Collection, fetchCollections} from "../../services/fetchCollections";
import {provider} from "../../services/initweb3";


function CollectionsList() {
    const [currentAccount, setCurrentAccount] = useState<any>();
    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionsFetched, setCollectionsFetched] = useState<Boolean>(false);
    const [collectionsData, setCollectionsData] = useState<Collection[]>([]);
    useEffect(() => {
        fetchAvailableCollections();
        setAccount(provider?.getSigner());

    }, [collections])

    const setAccount = async (newAccount: any) => {
        const address = await newAccount.getAddress();
        setCurrentAccount(address);
    }
    const fetchAvailableCollections = async () => {
        if(!collectionsFetched) {
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
                    <SearchBar inputUpdated={(input) => filterCollections(input)}
                               addCollection={() => console.log("collection added")}/>
                </div>
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