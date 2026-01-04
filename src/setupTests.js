import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true, // IMPORTANT: Added this so App.jsx doesn't throw 'Failed to load' error
        json: () => Promise.resolve({
            properties: [
                {
                    id: 'prop1',
                    type: 'House',
                    bedrooms: 3,
                    price: 350000,
                    picture: 'https://via.placeholder.com/150',
                    added: { year: 2022, month: "May", day: 15 },
                    postcode: 'AB12 3CD'
                }
            ]
        }),
    })
);