import {describe, it, expect ,vi } from "vitest";
import {screen, render} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event';
import Checkbox from "./Checkbox.tsx";
describe('checkbox', () => {
    it('renders checkbox',()=>{
        render( <Checkbox/>);
        expect(screen.getByRole('checkbox')).toBeInTheDocument()

    })
    it('is checked by default',()=>{
        render(<Checkbox defaultChecked />);

        expect(
            screen.getByRole('checkbox')
        ).toBeChecked();
    })
    it('is unchecked by default', () => {
        render(<Checkbox />);

        expect(
            screen.getByRole('checkbox')
        ).not.toBeChecked();
    });
    it('can be checked by clicking', async () => {
        render (<Checkbox/>)
        const checkbox=screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked()
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked()
    })
    it('calls onChange',async ()=>{
        const handleChange = vi.fn();
        render(<Checkbox onChange={handleChange} />)
        const checkbox=screen.getByRole('checkbox')
        await userEvent.click(checkbox)
        expect(handleChange).toHaveBeenCalledTimes(1)
    });
    it('is disabled', () => {
        render(<Checkbox disabled />);

        expect(
            screen.getByRole('checkbox')
        ).toBeDisabled();
    });
})