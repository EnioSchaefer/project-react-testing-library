import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons ->', () => {
  test('Testa se e exibida a mensagem No favorite pokemon found caso nao haja pokemons favoritados', () => {
    renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);

    const noPokemonFound = screen.getByText('No favorite pokemon found');

    expect(noPokemonFound).toBeInTheDocument();
  });

  test('Testa se sao exibidos todos os pokemons favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: 'More details' });

    userEvent.click(details);

    const favoriteCheckbox = screen.getByRole('checkbox');
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteCheckbox);
    userEvent.click(favoritePokemonsLink);

    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName).toBeInTheDocument();
  });
});
