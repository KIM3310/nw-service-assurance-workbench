import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('NW Service Assurance Workbench', () => {
  it('renders the surface-focused hero copy', () => {
    render(<App />);
    expect(screen.getByText('NW Service Assurance Workbench')).toBeInTheDocument();
    expect(screen.getByText('Carrier Network Service Assurance')).toBeInTheDocument();
    expect(screen.getByText('Explore synthetic scenarios')).toBeInTheDocument();
    expect(screen.getByText('Self-contained synthetic operations demo')).toBeInTheDocument();

    const inquiry = screen.getByRole('link', { name: /Request a private incident exercise/i });
    expect(inquiry).toHaveAttribute(
      'href',
      'https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench&inquiry=incident-operations-exercise#private-inquiry',
    );
    expect(inquiry).toHaveAttribute('target', '_blank');
    expect(inquiry).toHaveAttribute('rel', 'noreferrer');
  });

  it('switches scenarios and updates the overview', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('tab', { name: /IDC Edge DDoS During Planned Change/i })[0]);

    expect(
      screen.getByText(
        'Pause non-essential change work, trigger scrubbing and rate-limiting profiles, isolate clean service paths, and restart the maintenance flow after 20 minutes of stable telemetry.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Attack-vs-change classifier/i)).toBeInTheDocument();
    expect(screen.getByText(/Scrubbing and rate limits are active/i)).toBeInTheDocument();
    expect(screen.getByText(/DDoS mitigation, IDC health, change separation/i)).toBeInTheDocument();
  });
});
