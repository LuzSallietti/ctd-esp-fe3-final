import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import { Comic } from 'dh-marvel/features/comic/comic.types';
import CharacterCard from 'dh-marvel/components/checkout/character-card.component';
import { Box, Alert, Snackbar, Typography } from '@mui/material';
import CheckoutForm from 'dh-marvel/components/checkout/checkout-form.component';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import * as yup from "yup";
import { schema } from 'rules';
import { apiCall } from 'functions/apiCall';
import { translateError } from 'functions/translateError';
import { useState } from 'react';



type DataForm = yup.InferType<typeof schema>;

interface CheckoutPageProps {
  comic: Comic;
}

const Checkout: NextPage<CheckoutPageProps> = ({ comic }) => {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Estado para almacenar el mensaje de error
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para controlar la apertura del Snackbar

  const handleFormSubmit = async (formData: DataForm) => {
    const checkoutData: CheckoutInput = {
      ...formData,
      order: {
        name: comic.title,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        price: comic.price
      }
    }
    try {
      const response = await apiCall(checkoutData)
      if (response.data) {
        sessionStorage.setItem('order', JSON.stringify(response.data))
        router.push('/confirmacion-compra');
      } else {
        setError(response.error)
        setSnackbarOpen(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LayoutCheckout>
      <Box sx={{ padding: '5vw 2vw', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', flexWrap:'wrap', width: '100%' }}>
      <Typography variant='h4' component='h1' sx={{width: '100%', textAlign:'center', mb:'2rem'}}>Checkout</Typography>

        {comic && <CharacterCard data={comic} />}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { xs: '100%', sm: '50%' } }}>
          {comic.stock > 0 && <CheckoutForm onSubmit={handleFormSubmit}></CheckoutForm>}
          {comic.stock < 1 && <>
            <Alert variant="filled" sx={{ width: '66%' }} color='error' onClose={() => router.back()}>Producto sin stock</Alert>
          </>}
          {snackbarOpen && error &&
            <>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={translateError(error)} />
            </>}
        </Box>
      </Box>
    </LayoutCheckout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { id } = ctx.query;
  // Si no se proporciona el parámetro 'id', redirigir al home
  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: false, // Indica que no es una redirección permanente
      },
    };
  }
  const comicId = id as string;
  const comic = await getComic(comicId)
  return {
    props: {
      comic
    },
  };
};

export default Checkout;