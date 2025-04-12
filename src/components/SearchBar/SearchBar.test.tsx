import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, it, expect, vi } from 'vitest';

describe('SearchBar', () => {
	it('should render the input with the correct placeholder', () => {
		render(<SearchBar filterText="" onFilterTextChange={() => {}} />);

		const inputElement = screen.getByPlaceholderText('Search input');
		expect(inputElement).toBeInTheDocument();
	});

	it('should call onFilterTextChange when the user types in the input', () => {
		const onFilterTextChangeMock = vi.fn();

		render(
			<SearchBar
				filterText=""
				onFilterTextChange={onFilterTextChangeMock}
			/>
		);

		const inputElement = screen.getByPlaceholderText('Search input');
		fireEvent.change(inputElement, { target: { value: 'test' } });
		expect(onFilterTextChangeMock).toHaveBeenCalledWith('test');
	});

	it('should update input value when filterText prop changes', () => {
		const onFilterTextChangeMock = vi.fn();

		const { rerender } = render(
			<SearchBar
				filterText="initial"
				onFilterTextChange={onFilterTextChangeMock}
			/>
		);

		const inputElement = screen.getByPlaceholderText('Search input');
		expect(inputElement).toHaveValue('initial');

		rerender(
			<SearchBar
				filterText="updated"
				onFilterTextChange={onFilterTextChangeMock}
			/>
		);

		expect(inputElement).toHaveValue('updated');
	});
});
