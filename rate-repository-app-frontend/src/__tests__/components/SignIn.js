import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInFormContainer } from '../../components/SignIn'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInFormContainer handleSubmit={onSubmit} />);

      await act(async () => {
        fireEvent.changeText(getByTestId('username'), 'kalle');
      });
      await act(async () => {
        fireEvent.changeText(getByTestId('password'), 'password');
      });
      await act(async () => {
        fireEvent.press(getByTestId('submit'));
      });

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});