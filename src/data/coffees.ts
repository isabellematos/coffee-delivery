import type { Coffee } from '../types';

export const coffees: Coffee[] = [
  { id: 'expresso-tradicional', name: 'Expresso Tradicional', description: 'O tradicional café feito com água quente e grãos moídos', priceInCents: 990, tags: ['Tradicional'], image: '/coffees/expresso-tradicional.jpg' },
  { id: 'expresso-americano', name: 'Expresso Americano', description: 'Expresso diluído, menos intenso que o tradicional', priceInCents: 990, tags: ['Tradicional'], image: '/coffees/expresso-americano.jpg' },
  { id: 'expresso-cremoso', name: 'Expresso Cremoso', description: 'Café expresso tradicional com espuma cremosa', priceInCents: 1190, tags: ['Tradicional'], image: '/coffees/expresso-cremoso.jpg' },
  { id: 'expresso-gelado', name: 'Expresso Gelado', description: 'Bebida preparada com café expresso e cubos de gelo', priceInCents: 1290, tags: ['Tradicional', 'Gelado'], image: '/coffees/expresso-gelado.jpg' },
  { id: 'cafe-com-leite', name: 'Café com Leite', description: 'Meio a meio de expresso tradicional com leite vaporizado', priceInCents: 1390, tags: ['Tradicional', 'Com leite'], image: '/coffees/cafe-com-leite.jpg' },
  { id: 'latte', name: 'Latte', description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa', priceInCents: 1490, tags: ['Tradicional', 'Com leite'], image: '/coffees/latte.jpg' },
  { id: 'capuccino', name: 'Capuccino', description: 'Bebida com canela feita de doses iguais de café, leite e espuma', priceInCents: 1490, tags: ['Tradicional', 'Com leite'], image: '/coffees/capuccino.jpg' },
  { id: 'macchiato', name: 'Macchiato', description: 'Café expresso misturado com um pouco de leite quente e espuma', priceInCents: 1390, tags: ['Tradicional', 'Com leite'], image: '/coffees/macchiato.jpg' },
  { id: 'mocaccino', name: 'Mocaccino', description: 'Café expresso com calda de chocolate, pouco leite e espuma', priceInCents: 1490, tags: ['Tradicional', 'Com leite'], image: '/coffees/mocaccino.jpg' },
  { id: 'chocolate-quente', name: 'Chocolate Quente', description: 'Bebida feita com chocolate dissolvido no leite quente e café', priceInCents: 1590, tags: ['Especial', 'Com leite'], image: '/coffees/chocolate-quente.jpg' },
  { id: 'cubano', name: 'Cubano', description: 'Drink gelado de café expresso com rum, creme de leite e hortelã', priceInCents: 1690, tags: ['Especial', 'Alcoólico', 'Gelado'], image: '/coffees/cubano.jpg' },
  { id: 'havaiano', name: 'Havaiano', description: 'Bebida adocicada preparada com café e leite de coco', priceInCents: 1690, tags: ['Especial'], image: '/coffees/havaiano.jpg' },
];
