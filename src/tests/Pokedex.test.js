import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const nextPokemonText = 'Próximo pokémon';
const pokemonNameTestId = 'pokemon-name';

describe('Testa o componente Pokedex ->', () => {
  test('Testa se a pagina contem um heading com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const PokedexHeading = screen.getByRole('heading', { name: 'Encountered pokémons' });

    expect(PokedexHeading).toBeInTheDocument();
  });

  test('Testa se e exibido o proximo pokemon da lista ao clicar no botao Próximo pokémon', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: nextPokemonText });

    userEvent.click(nextButton);

    const pokemonName = screen.getByTestId(pokemonNameTestId);
    const multiplePokemonName = screen.getAllByTestId(pokemonNameTestId);
    expect(multiplePokemonName.length).toBe(1);
    expect(pokemonName.innerHTML).toBe('Charmander');
  });

  test('Testa se a Pokedex possui botoes de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    expect(filterButtons.length).toBe(7);
    expect(filterButtons[0].innerHTML).toBe('Electric');
    expect(filterButtons[1].innerHTML).toBe('Fire');
    expect(filterButtons[2].innerHTML).toBe('Bug');
    expect(filterButtons[3].innerHTML).toBe('Poison');
    expect(filterButtons[4].innerHTML).toBe('Psychic');
    expect(filterButtons[5].innerHTML).toBe('Normal');
    expect(filterButtons[6].innerHTML).toBe('Dragon');
  });

  test('Testa se ao selecionar tipo, o botao de proximo pokemon circula apenas pela categoria', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const psychicButton = screen.getByRole('button', { name: 'Psychic' });
    const nextButton = screen.getByRole('button', { name: nextPokemonText });

    userEvent.click(psychicButton);

    expect(allButton).toBeInTheDocument();

    const pokemonName = screen.getByTestId(pokemonNameTestId);
    expect(pokemonName).toHaveTextContent('Alakazam');

    userEvent.click(nextButton);

    const nextPokemon = screen.getByTestId(pokemonNameTestId);
    expect(nextPokemon).toHaveTextContent('Mew');

    expect(allButton).toBeInTheDocument();
  });

  test('Testa se ao clicar no botao de All todos os pokemons aparecem sem filtro', () => {
    renderWithRouter(<App />);

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    const allButton = screen.getByRole('button', { name: 'All' });

    userEvent.click(fireButton);

    const pokemonName = screen.getByTestId(pokemonNameTestId);

    expect(pokemonName.innerHTML).toBe('Charmander');

    userEvent.click(allButton);

    const newPokemonName = screen.getByTestId(pokemonNameTestId);

    expect(newPokemonName.innerHTML).toBe('Pikachu');
  });

  test('Testa se ao recarregar a pagina o filtro selecinado e All', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByRole('button', { name: nextPokemonText });

    expect(allButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    window.location.reload();

    const pokemonName = screen.getByTestId(pokemonNameTestId);

    expect(pokemonName.innerHTML).toBe('Charmander');
  });
});
