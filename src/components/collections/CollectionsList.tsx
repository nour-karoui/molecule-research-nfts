import CollectionsListItem from "./CollectionsListItem";
import { useState} from "react";
import {Box} from "@mui/material";
import SearchBar from "../SearchBar";


interface CollectionData {
    owner: string;
    symbol: string;
    name: string;
}

interface CollectionsListProps {
    collections: CollectionData[];
}

function CollectionsList({collections}: CollectionsListProps) {

    const ownerAddress = "x1fe23458983";
    const [collectionsData, setCollectionData] = useState(collections);

    const filterCollections = (clause: string) => setCollectionData(
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
                    collectionsData && collectionsData.map((collection) =>
                        <CollectionsListItem name={collection.name}
                                             symbol={collection.symbol}
                                             key={collection.symbol}
                                             owner={collection.owner === ownerAddress}/>)
                }
            </Box>
    );
}

export default CollectionsList;