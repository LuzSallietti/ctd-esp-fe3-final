import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkout from './index.page';
import comic from 'dh-marvel/test/mocks/comic';


describe('Checkout page', () => {
    it('renders the Checkout page correctly', () => {
        
        render(<Checkout comic={comic} />);       
        
        expect(screen.getByText('Checkout')).toBeInTheDocument();        
        
    })
   
})