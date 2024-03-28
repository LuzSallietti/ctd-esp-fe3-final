import { render, screen, waitFor } from '@testing-library/react';
import Checkout from './index.page';
import comic from 'dh-marvel/test/mocks/comic';
import nostockComic from 'dh-marvel/test/mocks/nostockcomic';



describe('Checkout page', () => {
    it('renders the Checkout page correctly', () => {        
        render(<Checkout comic={comic} />);     
        expect(screen.getByText('Checkout')).toBeInTheDocument();        
        
    })

    it('renders Snackbar ehrn no stock', async () => {
        render(<Checkout comic={nostockComic} />);
        await waitFor(() => {
            expect(screen.getByText('Producto sin stock')).toBeInTheDocument();
          });
    })
})