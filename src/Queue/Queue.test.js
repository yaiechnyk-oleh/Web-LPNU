import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Queue from './Queue';

// Mock react-router-dom hooks and components
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useParams: jest.fn().mockReturnValue({ queueId: '123' }),
    };
});

// Mock securedFetch if needed
jest.mock('../Login/login', () => ({
    securedFetch: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ /* mock response data */ }),
    }),
}));

describe('Queue Component', () => {
    it('renders correctly for a teacher', async () => {
        render(
            <MemoryRouter>
                <Queue />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Expected text or element to be in the document')).toBeInTheDocument();
        });
    });
});
