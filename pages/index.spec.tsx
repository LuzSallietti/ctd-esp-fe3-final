import {render, screen} from "@testing-library/react";
import Index from "dh-marvel/pages/index.page";

describe('Default Index rendering', () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<Index comics={[]} currentPage={1} />)
            const title = screen.getByText('Comics')
            expect(title).toBeInTheDocument()
        })
    })

})