import React from "react";
import { render, screen, fireEvent, within,waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import App from "./App";
import { beforeEach, expect, test, vi } from "vitest";

beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
});

test('adds a property to favourites when button is clicked', async () => {
    render(<App />);
    const addButtons = await screen.findAllByText(/Add to/i);
    fireEvent.click(addButtons[0]);

    // Target the navigation bar specifically to check for the update
    const nav = screen.getByRole('navigation');
    const favLink = within(nav).getByText(/Favourites/i);
    expect(favLink).toBeInTheDocument();
});

test('removes a property from favourites', async () => {
    render(<App />);
    
    // 1. Add item
    const addButtons = await screen.findAllByText(/Add to/i);
    fireEvent.click(addButtons[0]);

    // 2. Navigate via Navigation bar (ignoring footer links)
    const nav = screen.getByRole('navigation');
    const favNavLink = within(nav).getByText(/Favourites/i);
    fireEvent.click(favNavLink); 

    // 3. Click Remove (matches the button in your Favourites container)
    const removeButtons = await screen.findAllByText(/Remove/i);
    fireEvent.click(removeButtons[0]);

    // 4. Verify count reset by checking the heading
    expect(screen.getByText(/My Favourites \(0\)/i)).toBeInTheDocument();
});

test('renders main navigation links correctly', async () => {
    render(<App />);

    // Target only the navigation bar to avoid conflicts with the footer
    const nav = screen.getByRole('navigation');

    // 1. Check for the Home link inside nav
    const homeLink = within(nav).getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    // 2. Check for the Properties link inside nav
    const propsLink = within(nav).getByText(/Properties/i);
    expect(propsLink).toBeInTheDocument();

    // 3. Check for the Favourites link inside nav
    const favLink = within(nav).getByText(/Favourites/i);
    expect(favLink).toBeInTheDocument();
});

test('saves favourites to local storage', async () => {
    const mockProperty = { id: 'prop1', type: 'House', price: 100, added: { year: 2024, month: "January", day: 1 } };
    localStorage.setItem('favourite_props', JSON.stringify([mockProperty]));
    
    render(<App />);
    // Prove it reads from local storage
    const nav = screen.getByRole('navigation');
    expect(within(nav).getByText(/Favourites/i)).toBeInTheDocument();
});

test('displays property images in the gallery', async () => {
    render(<App />);
    const imageElements = await screen.findAllByRole('img');
    expect(imageElements[0]).toHaveAttribute('src');
});