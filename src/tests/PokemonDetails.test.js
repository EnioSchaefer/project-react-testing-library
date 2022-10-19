import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const DetailsText = 'More details';

describe('Testa o componente PokemonDetails', () => {
  test('Testa se as informacoes detalhadas do pokemon sao renderizadas corretamente', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: DetailsText });

    userEvent.click(detailLink);

    const pokemonDetailHeading = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    const pokemonSummaryHeading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(pokemonDetailHeading).toBeInTheDocument();
    expect(pokemonSummaryHeading).toBeInTheDocument();
    expect(detailLink).not.toBeInTheDocument();

    const pokemonDetailText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(pokemonDetailText).toBeInTheDocument();
  });

  test('Testa se existe uma secao de mapa contendo informacoes da localizacao do pokemon', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: DetailsText });

    userEvent.click(detailLink);

    const pokemonLocationHeading = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    const location01 = screen.getByText('Kanto Viridian Forest');
    const locationImages = screen.getAllByAltText('Pikachu location');
    const location02 = screen.getByText('Kanto Power Plant');

    expect(pokemonLocationHeading).toBeInTheDocument();
    expect(location01).toBeInTheDocument();
    expect(locationImages[0]).toBeInTheDocument();
    expect(locationImages[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location02).toBeInTheDocument();
    expect(locationImages[1]).toBeInTheDocument();
    expect(locationImages[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Testa se o botao de favoritar adiciona e remove dos favoritos corretamente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('pokemons/25');
    });

    const favoriteLabelText = screen.getByText('Pokémon favoritado?');
    expect(favoriteLabelText).toBeDefined();
    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);

    act(() => {
      history.push('/favorites');
    });

    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName).toBeInTheDocument();

    act(() => {
      history.push('pokemons/25');
    });

    const newCheckbox = screen.getByRole('checkbox');
    userEvent.click(newCheckbox);
    expect(newCheckbox.checked).toBe(false);

    act(() => {
      history.push('/favorites');
    });

    const noPokemonFound = screen.getByText('No favorite pokemon found');
    expect(noPokemonFound).toBeInTheDocument();
  });
});
