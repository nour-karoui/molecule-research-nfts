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
            setCollectionsFetched(true);
        }
    }

    const filterCollections = (clause: string) => setCollections(
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
                    collections && collections.map((collection) =>
                        <CollectionsListItem name={collection.name}
                                             symbol={collection.symbol}
                                             key={collection.symbol}
                                             owner={collection.owner === currentAccount}/>)
                }
            </Box>
    );
}

export default CollectionsList;