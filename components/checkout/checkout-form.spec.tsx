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
})