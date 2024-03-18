export type Comic = {
    id: number;
    characters: {
        available: number;
        collectionURI: string;
        items: [
            {
            name: string,
            resourceURI: string
            }
        ]
    }
    description: string;
    oldPrice: number;
    price: number;
    stock: number;    
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}