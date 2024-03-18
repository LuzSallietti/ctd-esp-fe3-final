import React from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Card, CardContent, CardMedia, Typography, Button, Select, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import { Comic } from 'dh-marvel/features/comic/comic.types';

interface ComicPageProps {
  comic: Comic;
}

const ComicPage: NextPage<ComicPageProps> = ({ comic }) => {
  console.log(comic)
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
    <Box sx= {{padding: '5vw 2vw', display:'flex', justifyContent:'center' }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', md: '75%' }, minHeight:'66vh'}}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', sm: '50%' }}}
          image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt="Producto"
        />
        <CardContent sx={{ flex: '1', flexDirection: 'column' }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight={800}>
            {comic.title}
          </Typography>
          <Typography variant='h4' fontWeight={600}>$75</Typography>
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
            comic.characters.available > 0 &&
            <>
              <Typography variant="subtitle1" gutterBottom fontWeight={600} marginTop={4}>
                Seleccione un personaje
              </Typography>
              <Select style={{ width: '100%' }}>
                {comic.characters.items.map(item => (
                  <MenuItem key={item.resourceURI} value={item.resourceURI}>{item.name}</MenuItem>
                ))}
              </Select>
            </>
          }
          <Button variant="outlined" color="primary" startIcon={<ArrowBackIosIcon/>} onClick={handleGoBack} sx={{ mt: 2, ml: 1, mr: 1 }}>
            Volver
          </Button>
          <Button variant="contained" color="primary" endIcon={<ShoppingCartIcon/>} disabled={comic.stock === 0} sx={{ mt: 2 }}>
          {comic.stock === 0 ? "Sin stock disponible" : "Comprar"}
          </Button>          
        </CardContent>
      </Card>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string

  const comic = await getComic(id)

  return {
    props: {
      comic,
    },
  };
};

export default ComicPage