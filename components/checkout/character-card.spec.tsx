import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import comic from 'dh-marvel/test/mocks/comic';
import CharacterCard from './character-card.component';


  describe('Checkout page', () => {
    it('Renders checkout page with character card if there is stock', async () => {
      render(<CharacterCard data={comic}/>);
          
        const comicTitle = screen.getByText('Iron Man Series')
        const comicPrice = screen.getByText('$25')
        expect(comicTitle).toBeInTheDocument()
        expect(comicPrice).toBeInTheDocument()        
      
    });  
    
  });