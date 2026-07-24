import {describe, it, expect} from "vitest";
import {screen, render} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event';
import PasswordInput from "./PasswordInput.tsx";

describe('PasswordInput', () => {
    it('render label', () => {
        render(<PasswordInput label='test' id='test'/>)
        expect(screen.getByText('test')).toBeInTheDocument()
    })
    it('shows initial helper text', () => {
        render(<PasswordInput id="password" label="Password"/>);
        expect(
            screen.getByText('Enter a new password')
        ).toBeInTheDocument();
    })
    it('shows too short message', async () => {
        render(<PasswordInput id="password" label="Password"/>);
        const input = screen.getByLabelText('Password');
        await userEvent.type(input, 'abc');
        expect(
            screen.getByText('Too short')
        ).toBeInTheDocument()
    })

    it('shows add uppercase message', async () => {
        render(<PasswordInput id="password" label="Password"/>);
        const input = screen.getByLabelText('Password') as HTMLInputElement;
        await userEvent.type(input, 'aasssdfdfer#1');
        expect(
            screen.getByText(/add uppercase/)
        ).toBeInTheDocument()
        expect(input).toBeInvalid();

        expect(input.validationMessage).toBe(
            'Password is not strong enough.'
        );
    })

    it('shows add numbers message', async () => {
        render(<PasswordInput id="password" label="Password"/>);
        const input = screen.getByLabelText('Password');
        await userEvent.type(input, 'aasdfedvrU#');
        expect(
            screen.getByText(/add numbers/)
        ).toBeInTheDocument()
    })
    it('shows add special characters message', async () => {
        render(<PasswordInput id="password" label="Password"/>);
        const input = screen.getByLabelText('Password');
        await userEvent.type(input, 'aasdczsferU1');
        expect(
            screen.getByText(/add special characters/)
        ).toBeInTheDocument()
    })
    it('shows strong message for valid password', async () => {
        render(<PasswordInput id="password" label="Password" />);

        const input = screen.getByLabelText('Password');

        await userEvent.type(input, 'Password1!');

        expect(
            screen.getByText(/Strong/i)
        ).toBeInTheDocument();
    });
    })