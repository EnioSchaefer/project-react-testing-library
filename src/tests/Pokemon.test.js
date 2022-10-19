import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon ->', () => {
  test('Testa se e renderizado um card com as informacoes corretas do pokemon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img');

    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
  });

  test('Testa se contem um link para exibir mais detalhes e se redireciona a pagina de detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: 'More details' });

    expect(detailLink).toBeInTheDocument();

    expect(detailLink.href).toBe('http://localhost/pokemons/25');

    userEvent.click(detailLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    const favoriteIcon = screen.getAllByRole('img')[1];

    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
