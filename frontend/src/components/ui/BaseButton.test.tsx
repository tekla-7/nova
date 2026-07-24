import {describe, it, expect ,vi } from "vitest";
import BaseButton from "./BaseButton";
import {screen, render} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event';
describe('BaseButton', () => {
    it('Renders a child value', () => {
        render(<BaseButton>Text</BaseButton>);
        expect(screen.getByText('Text')).toBeInTheDocument()
    })
    it('disables button', () => {
        render(<BaseButton disable={true}>save</BaseButton>);
        expect(screen.getByRole('button')).toBeDisabled()
    })
    it('applies dark variant class', () => {
        render(<BaseButton variant='dark'>dark</BaseButton>);
        expect(screen.getByRole('button')).toHaveClass('bg-[#0D0D0D]')

    })
    it('applies transparent variant class', () => {
        render(<BaseButton variant='transparent'>dark</BaseButton>);
        expect(screen.getByRole('button')).toHaveClass('bg-transparent')

    })
    it('applies light variant class', () => {
        render(<BaseButton variant='light'>dark</BaseButton>);
        expect(screen.getByRole('button')).toHaveClass('bg-white')

    })
    it('applies type button class', () => {
        render(<BaseButton type='button'>dark</BaseButton>);
        expect(
            screen.getByRole('button')
        ).toHaveAttribute('type', 'button');
    })
    it('uses button type by default', () => {
        render(<BaseButton>Dark</BaseButton>);

        expect(
            screen.getByRole('button')
        ).toHaveAttribute('type', 'button');
    });
    it('applies submit type', () => {
        render(
            <BaseButton type="submit">
                Save
            </BaseButton>
        );

        expect(
            screen.getByRole('button')
        ).toHaveAttribute('type', 'submit');
    });
    it('submits form when clicked', async () => {
        const handleSubmit = vi.fn();

        render(
            <form onSubmit={handleSubmit}>
                <BaseButton type="submit">
                    Login
                </BaseButton>
            </form>
        );

        await userEvent.click(
            screen.getByRole('button', { name: 'Login' })
        );

        expect(handleSubmit).toHaveBeenCalled();
    });
    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn();

        render(
            <BaseButton onClick={handleClick}>
                Click
            </BaseButton>
        );

        await userEvent.click(
            screen.getByRole('button', { name: 'Click' })
        );

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('does not call onClick when disabled', async () => {
        const handleClick = vi.fn();

        render(
            <BaseButton disable onClick={handleClick}>
                Save
            </BaseButton>
        );

        await userEvent.click(
            screen.getByRole('button')
        );

        expect(handleClick).not.toHaveBeenCalled();
    });
})