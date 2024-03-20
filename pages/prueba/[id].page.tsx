import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next';
import { getCharacters, getCharacter, getCharactersCount } from 'dh-marvel/services/marvel/marvel.service';


const Prueba = ({character}) => {
    console.log(character)
  return (
    <div>
        Página prueba getCharacters      
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
	const totalComics = await getCharactersCount();
  console.log(totalComics);
	const limit = 100;    
    const totalPages = Math.ceil(totalComics / limit);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Generar los paths para cada página
  const paths = await Promise.all(
    pageNumbers.map(async (pageNumber) => {
      const offset = (pageNumber - 1) * limit;
      const characters = await getCharacters(offset, limit);
      return characters.map((character) => ({
        params: { id: character.id.toString() }, // Ajusta según la estructura de tus páginas
      }));
    })
  );

  // Devolver los paths
  return {
    paths: paths.flat(), // Concatenar todos los arrays en uno solo
    fallback: 'blocking', // Opcionalmente puedes cambiar esto dependiendo de tus necesidades
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {

	const id = params?.id as string;
  const character = await getCharacter(id);

	return {
		props: {
			character,
		},
    revalidate: 86400 // cada 24hs
	};
};


export default Prueba
