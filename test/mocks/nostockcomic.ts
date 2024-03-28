import { Comic } from "dh-marvel/features/comic/comic.types";

const nostockComic : Comic =
    {
        id: 25,
    characters: {
        available: 1,
        collectionURI: 'collectionuri',
        items: [
            {
                name: 'Iron Man',
                resourceURI: 'uriresource'
            }
        ],
    },
    description: 'comic description',
    oldPrice: 75,
    price: 25,
    stock: 0,
    title: 'Iron Man Series',
    thumbnail: {
        path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/10/4bb3c93c1725d',
        extension: 'jpg'
    }
    }


export default nostockComic;