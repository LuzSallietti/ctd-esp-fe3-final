import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import Paper from '@mui/material/Paper';
import { Alert, Typography, Box, Card, CardMedia, CardContent, CardActions, Button  } from '@mui/material';


const ConfirmationPage: NextPage = () => {
  const [data, setData] = useState<CheckoutInput | null>(null)
  const router = useRouter()

  const handleGoHome= () => {    
    router.push('/')
    sessionStorage.clear()
  }

  useEffect(() => {
    if (sessionStorage.getItem('order') !== null) {
      const orderSession = sessionStorage.getItem('order');
      const data = orderSession ? JSON.parse(orderSession) : null
      setData(data);
    } else {
      router.push('/')
    }
  }, [])

  return (
    <LayoutCheckout>
      {data && <>
        <Box sx={{ flexDirection: 'column', width: '100%', padding: '5vw 2vw' }}>
          <Paper elevation={1} sx={{ width: '100%' }}>
            <Alert variant="filled">Que disfrutes tu compra</Alert>
          </Paper>
          <Box sx={{ width: '100%', marginTop:'2rem'}}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: '15vw', height: '15vw', objectFit: 'cover' }}
                image={data.order.image}
                alt={data.order.name}
              />
              <CardContent sx={{ flex: '1', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
                  {data.order.name}
                </Typography>
                <Typography variant='h6' fontWeight={600}>${data.order.price}</Typography>
                <Typography variant='body2' component='h3' fontWeight={600} mt={2}>Datos de envío</Typography>
                <Typography variant='body1'>Nombre: {data.customer.name}</Typography>
                <Typography variant='body1'>Apellido: {data.customer.lastname}</Typography>
                <Typography variant='body1'>Correo electrónico: {data.customer.email}</Typography>
                <Typography variant='body1'>Dirección: {data.customer.address.address1}</Typography>
                <Typography variant='body1'>Ciudad: {data.customer.address.city}</Typography>
                <Typography variant='body1'>Provincia: {data.customer.address.state}</Typography>
                <Button variant="outlined" color="primary" onClick={handleGoHome} sx={{ mt: 2, width: '50%' }}>
                  Volver al Inicio
                </Button>
              </CardContent>              
            </Card>
          </Box>
        </Box>
      </>}
    </LayoutCheckout>

  )
}

export default ConfirmationPage
