import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App ->', () => {
  test('Testa se os links possuem o texto correto', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('Testa se ao clicar no link Home e redirecionado para /', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Testa se ao clicar no link About e redirecionado para /about', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });

    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Testa se ao clicar no link Favorite Pokemons e redirecionado para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Testa se ao inserir url inexistente e redirecionado para /notfound', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/url-inexistente/');
    });

    const notFoundText = screen.getByRole('heading', { level: 2 });

    expect(notFoundText).toBeInTheDocument();
  });
});
