import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Testa o componente NotFound ->', () => {
  test('Testa se o componente NotFound possui um heading com o texto Page requested not found', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });

    expect(notFoundText).toBeInTheDocument();
  });

  test('Testa se o componente NotFound possui uma imagem com src correto', () => {
    render(<NotFound />);

    const notFoundImage = screen.getByRole('img');

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
