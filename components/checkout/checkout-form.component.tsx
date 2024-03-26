import React from 'react'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { Step, StepLabel, Stepper, Button, Grid, TextField, Box, FormHelperText } from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { schema } from '../../rules';


type DataForm = yup.InferType<typeof schema>;
interface CheckoutFormProps {
    onSubmit: (data: DataForm) => void; 
  }

const CheckoutForm:React.FC<CheckoutFormProps> = ({ onSubmit}) => {
    const [step, setStep] = useState<number>(0)

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };
    const handlePrevtStep = () => {
        if (step === 0) {
            return
        }
        setStep((prevStep) => prevStep - 1);
    };
    

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },        
    } = useForm<DataForm>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: {
            customer: {
                name: "",
                lastname: "",
                email: "",
                address: {
                    address1: "",
                    address2: " ",
                    city: "",
                    state: "",
                    zipCode: ""
                }
            },
            card: {
                number: "",
                cvc: "",
                expDate: "",
                nameOnCard: ""
            }
        },
    });

    

    return (
        <>
            <Stepper sx={{ width: '100%', mt:'2rem' }} activeStep={step} alternativeLabel>
                <Step>
                    <StepLabel>
                        Datos personales
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        Entrega
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        Pago
                    </StepLabel>
                </Step>
            </Stepper>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '90%', mt: '2rem' }}>
                {step === 0 &&
                    <>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.name'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Nombre"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.customer?.name && <FormHelperText error>{errors.customer.name.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.lastname'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Apellido"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.customer?.lastname && <FormHelperText error>Este campo es requerido</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.email'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='email'
                                        label="Correo electrónico"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.customer?.email && <FormHelperText error>{errors.customer?.email.message}</FormHelperText>}
                        </Grid>
                    </>
                }
                {step === 1 &&
                    <>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.address.address1'
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Dirección"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.customer?.address?.address1 && <FormHelperText error>{errors.customer?.address?.address1.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.address.address2'
                                control={control}
                                defaultValue={""}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Departamento, Piso, Barrio"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.address.city'
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Ciudad"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.customer?.address?.city && <FormHelperText error>{errors.customer?.address?.city.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.address.state'
                                control={control}
                                rules={{ required: true }}
                                defaultValue={""}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Provincia"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.customer?.address?.state && <FormHelperText error>{errors.customer?.address?.state.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='customer.address.zipCode'
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Código Postal"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.customer?.address?.zipCode && <FormHelperText error>{errors.customer?.address?.zipCode.message}</FormHelperText>}
                        </Grid>
                    </>}
                {step === 2 &&
                    <>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='card.number'
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Número de tarjeta"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.card?.number && <FormHelperText error>{errors.card?.number.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='card.nameOnCard'
                                control={control}
                                rules={{ required: true }}
                                defaultValue={""}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Nombre en la tarjeta"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.card?.nameOnCard && <FormHelperText error>{errors.card?.nameOnCard.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='card.expDate'
                                control={control}
                                rules={{ required: true }}
                                defaultValue={""}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Fecha de expiracion (MMAA)"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.card?.expDate && <FormHelperText error>{errors.card?.expDate.message}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: '.5rem' }}>
                            <Controller
                                name='card.cvc'
                                control={control}
                                rules={{ required: true }}
                                defaultValue={""}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='password'
                                        label="Código de seguridad"
                                        variant="outlined"
                                        sx={{ width: 1 }}
                                    />
                                )}
                            />
                            {errors.card?.cvc && <FormHelperText error>{errors.card?.cvc.message}</FormHelperText>}
                        </Grid>
                    </>}
                <Grid item xs={12} sx={{ mt: '1rem' }}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">

                    {step === 0 && (
                        <Button
                            type='submit'
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!!errors.customer?.name || !!errors.customer?.lastname || !!errors.customer?.email}
                            onClick={handleNextStep}
                        >
                            Siguiente
                        </Button>
                    )}
                    {step === 1 && (
                        <Button
                            type='submit'
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!!errors.customer?.address?.address1 || !!errors.customer?.address?.address2 || !!errors.customer?.address?.city || !!errors.customer?.address?.state || !!errors.customer?.address?.zipCode}
                            onClick={handleNextStep}                        >
                            Siguiente
                        </Button>
                    )}
                    {step === 2 && (
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!!errors.card?.nameOnCard || !!errors.card?.number || !!errors.card?.cvc || !!errors.card?.expDate}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            Comprar
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12} sx={{ mt: '.5rem' }}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">
                    {(step === 1 || step === 2) && (
                        <>
                            <Button                                
                                variant="outlined"
                                color="primary"
                                fullWidth                                
                                onClick={handlePrevtStep}>
                                Anterior
                            </Button>
                        </>
                    )}

                </Grid>
            </Box>
        </>
    )
}

export default CheckoutForm