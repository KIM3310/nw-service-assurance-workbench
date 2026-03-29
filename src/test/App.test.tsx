import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('NW Service Assurance Workbench', () => {
  it('renders the role-focused hero copy', () => {
    render(<App />);
    expect(screen.getByText('NW Service Assurance Workbench')).toBeInTheDocument();
    expect(screen.getByText('Carrier NW Operations Portfolio Project')).toBeInTheDocument();
    expect(screen.getByText('Map this project to the role')).toBeInTheDocument();
    expect(screen.getByText('No extra resources required')).toBeInTheDocument();
  });

  it('switches scenarios and updates the overview', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('tab', { name: /IDC Edge DDoS During Planned Change/i })[0]);

    expect(screen.getByText(/Pause non-essential change work/i)).toBeInTheDocument();
    expect(screen.getByText(/Attack-vs-change classifier/i)).toBeInTheDocument();
    expect(screen.getByText(/Built an IDC edge operations scenario/i)).toBeInTheDocument();
  });
});
