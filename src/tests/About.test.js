import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Testa o component About ->', () => {
  test('Testa se a pagina contem a descricao da pokedex', () => {
    render(<About />);

    const info01 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    const info02 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');

    expect(info01).toBeInTheDocument();
    expect(info02).toBeInTheDocument();
  });

  test('Testa se a pagina contem um heading com o texto About Pokedex', () => {
    render(<About />);

    const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(heading).toBeInTheDocument();

    const info01 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    const info02 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');

    expect(info01).toBeInTheDocument();
    expect(info02).toBeInTheDocument();

    const aboutImage = screen.getByRole('img');

    expect(aboutImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
