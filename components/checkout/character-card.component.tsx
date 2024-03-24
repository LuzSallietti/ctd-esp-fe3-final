import { Comic } from 'dh-marvel/features/comic/comic.types'
import React from 'react'

interface CharacterCardProps {
    data : Comic;
}

const CharacterCard: React.FC<CharacterCardProps> = ( {data} ) => {
    return (
        <>
        <h1>{data.title}</h1>
        </>
    )
}

export default CharacterCard