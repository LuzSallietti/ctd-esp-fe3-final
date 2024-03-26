import { useState, } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { Box, Card, CardContent, CardMedia, Typography, Button, Select, MenuItem, CardActions, Container } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getComic, getComicCharacters } from 'dh-marvel/services/marvel/marvel.service';
import { Comic } from 'dh-marvel/features/comic/comic.types';
import { Character } from 'dh-marvel/features/character/character.types';

interface ComicPageProps {
  comic: Comic;
  characters: Character[]
}

const ComicPage: NextPage<ComicPageProps> = ({ comic, characters }) => {

  const [selectValue, setSelectValue] = useState('');
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleChange = (e: SelectChangeEvent<typeof selectValue>) => {
    const characterId = e.target.value;
    setSelectValue(characterId);
    router.push(`/personajes/${characterId}`);
  }

  return (
    <>
      <LayoutGeneral>
        <Container sx={{p:{ xs:'1rem', sm:'3rem 0'}}}>        
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, minWidth: { xs: '100%', md: '100%' }, minHeight: '66vh' }}>
            <CardMedia
              component="img"
              sx={{ width: { xs: '100%', sm: '50%' }, height: { xs: '100%', sm: '20rem'}, objectFit: 'cover' }}
              image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <CardContent sx={{ flex: '1', flexDirection: 'column', width: { xs: '100%', sm: '50%' } }}>
              <Typography variant="h5" component="h2" gutterBottom fontWeight={800}>
                {comic.title}
              </Typography>
              <Typography variant='h4' fontWeight={600}>${comic.price}</Typography>
              <Typography variant="body2" gutterBottom>
                {`Precio anterior: $${comic.oldPrice}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`Unidades disponibles: ${comic.stock}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom fontWeight={600} marginTop={4}>
                Detalles
              </Typography>
              <Typography variant="body1" gutterBottom>
                {comic.description && comic.description || "Sin descripción disponible"}
              </Typography>
              {
                characters &&
                <>
                  <Typography variant="subtitle1" gutterBottom fontWeight={600} marginTop={4}>
                    Seleccione un personaje
                  </Typography>
                  <Select style={{ width: '100%' }} value={selectValue} onChange={handleChange}>
                    {characters.map(character => (
                      <MenuItem key={character.id} value={character.id}>{character.name}</MenuItem>
                    ))}
                  </Select>
                </>
              }
              <CardActions>
                <Button variant="outlined" color="primary" startIcon={<ArrowBackIosIcon />} onClick={handleGoBack} sx={{ mt: 2, ml: 1, mr: 1 }}>
                  Volver
                </Button>
                <Link href={`/checkout?id=${comic.id}`} passHref>
                  <Button variant="contained" color="primary" endIcon={<ShoppingCartIcon />} disabled={comic.stock === 0} sx={{ mt: 2 }}>
                    {comic.stock === 0 ? "Sin stock" : "Comprar"}
                  </Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
          </Container>
       
      </LayoutGeneral>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string

  const comic = await getComic(id)

  const characters = await getComicCharacters(id);

  return {
    props: {
      comic,
      characters
    },
  };
};

export default ComicPage