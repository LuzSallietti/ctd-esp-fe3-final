import { getCharacter, getCharactersCount, getCharacters } from 'dh-marvel/services/marvel/marvel.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { Character } from 'dh-marvel/features/character/character.types'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Card, CardContent, CardMedia, Typography, Button, Select, MenuItem, CardActions } from '@mui/material';

interface CharacterPageProps {
  character: Character
}

const CharacterPage: NextPage<CharacterPageProps> = ({ character }) => {

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
      <LayoutGeneral>
        <Box sx={{ padding: '5vw 2vw', display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', md: '66%' }, minHeight: '66vh' }}>
            <CardMedia
              component="img"
              sx={{ width: { xs: '100%', sm: '50%' }, height: '75%', objectFit: 'cover' }}
              image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt="Producto"
            />
            <CardContent sx={{ flex: '1', flexDirection: 'column' }}>
              <Typography variant="h5" component="h2" gutterBottom fontWeight={800}>
                {character.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom fontWeight={600} marginTop={4}>
                Biografía
              </Typography>
              <Typography variant="body1" gutterBottom>
                {character.description && character.description || "Sin descripción disponible"}
              </Typography>
              <CardActions>
                <Button variant="outlined" color="primary" startIcon={<ArrowBackIosIcon />} onClick={handleGoBack} sx={{ mt: 2, ml: 1, mr: 1 }}>
                  Volver
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </LayoutGeneral>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalComics = await getCharactersCount();
  const limit = 100;
  const totalPages = Math.ceil(totalComics / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Generar los paths para cada página de resultados de la API
  const paths = await Promise.all(
    pageNumbers.map(async (pageNumber) => {
      const offset = (pageNumber - 1) * limit;
      const characters = await getCharacters(offset, limit);
      return characters.map((character: Character) => ({
        params: { id: character.id.toString() },
      }));
    })
  );

  return {
    paths: paths.flat(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const id = params?.id as string
  const character = await getCharacter(id);

  return {
    props: {
      character
    },
    revalidate: 5 * 24 * 60 * 60, // por ahora cada 5 días (en segundos)
  }

}

export default CharacterPage