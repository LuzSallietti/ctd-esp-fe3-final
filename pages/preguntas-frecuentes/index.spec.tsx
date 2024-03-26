import {render, screen, fireEvent} from "@testing-library/react";
import Faqs from "./index.page";

describe('FAQS Page rendering tests', () => {
    const faqsMock = [
        {
            "id": 1,
            "question": "¿Cuántos comics tienen?",
            "answer": "Actualmente disponemos de toda la colección de Marvel. Algunos ejemplares pueden contar con poca o nula disponibilidad por el momento. Para mas información puede acceder a https://marvel.com"
        },
        {
            "id": 2,
            "question": "¿Se puede reservar nuevos lanzamientos?",
            "answer": "Lamentablemente nuestro sitio todavía no acepta reservas anticipadas. Pero nos encontramos trabajando en esa funcionalidad. Seguí nuestro twitter para estar al tanto de las ultimas novedades."
        },
    ];
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => faqsMock
        } as Response);
    });

    describe('Render page title', () => {
        it('should render the title', () => {
            render(<Faqs faqs={[]}/>)
            const title = screen.getByText('Preguntas Frecuentes')
            expect(title).toBeInTheDocument()
        })
        it('Should render FAQ items', async () => {
            render(<Faqs faqs={faqsMock}/>);
            const question1 = screen.getByText('¿Cuántos comics tienen?');
            const question2 = screen.getByText('¿Se puede reservar nuevos lanzamientos?');
            expect(question1).toBeInTheDocument();
            expect(question2).toBeInTheDocument();
        });
        it('Should render FAQ answers when expanded', async () => {
            render(<Faqs faqs={faqsMock}/>);
            const accordionSummary1 = screen.getByText('¿Cuántos comics tienen?');
            const accordionSummary2 = screen.getByText('¿Se puede reservar nuevos lanzamientos?');
            fireEvent.click(accordionSummary1);
            fireEvent.click(accordionSummary2);
            const answer1 = screen.getByText('Actualmente disponemos de toda la colección de Marvel. Algunos ejemplares pueden contar con poca o nula disponibilidad por el momento. Para mas información puede acceder a https://marvel.com');
            const answer2 = screen.getByText('Lamentablemente nuestro sitio todavía no acepta reservas anticipadas. Pero nos encontramos trabajando en esa funcionalidad. Seguí nuestro twitter para estar al tanto de las ultimas novedades.');
            expect(answer1).toBeInTheDocument();
            expect(answer2).toBeInTheDocument();
        });
    })

})