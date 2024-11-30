import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ModeChange from '../components/ModeChange';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('ModeChange Component', () => {
  it('should toggle theme mode correctly and match snapshots', async () => {
    const theme = createTheme({
      palette: {
        mode: 'light',
      },
    });

    const { rerender, asFragment } = render(
      <ThemeProvider theme={theme}>
        <ModeChange />
      </ThemeProvider>
    );

    const button = screen.getByTestId('toggleMode');
    expect(button).toBeInTheDocument();

    // Initial render snapshot
    expect(asFragment()).toMatchSnapshot();

    // Verify initial state
    expect(button).toHaveAttribute('aria-label', 'Change To Dark-mode');

    // Simulate click to change to dark mode
    await userEvent.click(button);

    // Update theme mode
    theme.palette.mode = 'dark';
    rerender(
      <ThemeProvider theme={theme}>
        <ModeChange />
      </ThemeProvider>
    );

    // Snapshot after toggling to dark mode
    expect(asFragment()).toMatchSnapshot();

    // Verify the updated state
    expect(button).toHaveAttribute('aria-label', 'Change To Light-mode');

    // Simulate click to change back to light mode
    await userEvent.click(button);

    // Update theme mode again
    theme.palette.mode = 'light';
    rerender(
      <ThemeProvider theme={theme}>
        <ModeChange />
      </ThemeProvider>
    );

    // Snapshot after toggling back to light mode
    expect(asFragment()).toMatchSnapshot();

    // Verify the final state
    expect(button).toHaveAttribute('aria-label', 'Change To Dark-mode');
  });
});
