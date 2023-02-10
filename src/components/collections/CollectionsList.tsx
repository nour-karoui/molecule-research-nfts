import CollectionsListItem from "./CollectionsListItem";
import React, {Fragment} from "react";

function CollectionsList() {
    return (
        <Fragment>
            <CollectionsListItem name={"Physics"} symbol={'PHY'} owner={true}/>
            <CollectionsListItem name={"Physics"} symbol={'PHY'}/>
            <CollectionsListItem name={"Physics"} symbol={'PHY'}/>
        </Fragment>
    );
}

export default CollectionsList;