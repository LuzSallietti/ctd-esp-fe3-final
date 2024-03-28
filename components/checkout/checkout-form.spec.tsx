import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CheckoutForm from './checkout-form.component';
import customer from 'dh-marvel/test/mocks/customer';
 

describe('CheckoutForm component tests', () => {
    it('Renders correctly with initial step and fields for personal data', () => {
      render(<CheckoutForm onSubmit={() => {customer}} />);
      
      // Verificar que el primer paso está activo
      expect(screen.getByText('Datos personales')).toBeInTheDocument();
  
      // Verificar que se muestran los campos de datos personales
      expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
      expect(screen.getByLabelText('Apellido')).toBeInTheDocument();
      expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
    });

    it('Changes step correctly when clicking next and previous buttons', async () => {
        render(<CheckoutForm onSubmit={() => {customer}} />); 
        
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
          });
        await waitFor(() => {
          expect(screen.getByText('Entrega')).toBeInTheDocument();
        });
    })

    it('Renders step 1 (shipping) fields', async () => {
      render(<CheckoutForm onSubmit={() => {customer}} />); 
      
      act(() => {
          fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
        });
      await waitFor(() => {
        expect(screen.getByText('Entrega')).toBeInTheDocument();        
        expect(screen.getByLabelText('Dirección')).toBeInTheDocument();
        expect(screen.getByLabelText('Departamento, Piso, Barrio')).toBeInTheDocument();
        expect(screen.getByLabelText('Ciudad')).toBeInTheDocument();
        expect(screen.getByLabelText('Provincia')).toBeInTheDocument();
        expect(screen.getByLabelText('Código Postal')).toBeInTheDocument();
      });
  })
  it('Renders step 2 (payment) fields', async () => {
    render(<CheckoutForm onSubmit={() => {customer}} />); 
    
    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
        fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
      });
    await waitFor(() => {  
      expect(screen.getByText('Pago')).toBeInTheDocument();      
      expect(screen.getByLabelText('Número de tarjeta')).toBeInTheDocument();
      expect(screen.getByLabelText('Nombre en la tarjeta')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de expiracion (MMAA)')).toBeInTheDocument();
      expect(screen.getByLabelText('Código de seguridad')).toBeInTheDocument();      
    });
})

it('Handles setp changes', async () => {
  render(<CheckoutForm onSubmit={() => {customer}} />); 
  
  act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));      
    });
  await waitFor(() => { 
    fireEvent.click(screen.getByRole('button', { name: 'Anterior' })); 
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();        
  });
})    
});