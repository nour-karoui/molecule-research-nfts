import {collectionsFactory} from './initweb3';

export interface Collection {
    owner: string;
    symbol: string;
    name: string;
}
export const fetchCollections = async () => {
    let collections: Collection[] = []
    const response = await  collectionsFactory.collectionsCount();
    const collectionsCount = response.toNumber();
    for (let i = 0; i < collectionsCount; i++) {
        let collection = await collectionsFactory.getCollection(i);
        collections.push(collection);
    }
    return collections;
}