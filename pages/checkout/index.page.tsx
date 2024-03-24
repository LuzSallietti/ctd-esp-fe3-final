import { useState } from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import { Comic } from 'dh-marvel/features/comic/comic.types';
import CharacterCard from 'dh-marvel/components/checkout/character-card.component';
import { Box } from '@mui/material';
import CheckoutForm from 'dh-marvel/components/checkout/checkout-form.component';

interface CheckoutPageProps {
  comic: Comic;
}

const Checkout: NextPage<CheckoutPageProps> = ({ comic }) => {
  const [step, setStep] = useState<number>(3)

  return (
    <LayoutCheckout>
      <Box sx={{ padding: '5vw 2vw', display: 'flex',flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', width: '100%' }}>
        
          {comic && <CharacterCard data={comic}/>}            
       
        <Box sx={{ display:'flex', flexDirection: 'column', alignItems:'center', width: {xs: '100%', sm:'50%'}}}>
          <CheckoutForm></CheckoutForm>                  
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