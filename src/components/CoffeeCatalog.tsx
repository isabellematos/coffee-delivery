import styled from 'styled-components';
import { coffees } from '../data/coffees';
import { media } from '../styles/media';
import { CoffeeCard } from './CoffeeCard';

const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 54px;
  ${media.md} { font-size: 2rem; }
`;

// Cards de 256px no protótipo; o grid se adapta à largura (1 a 4 colunas).
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 40px 32px;
`;

export function CoffeeCatalog() {
  return (
    <section aria-labelledby="catalogo-titulo">
      <Title id="catalogo-titulo">Nossos cafés</Title>
      <Grid>
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </Grid>
    </section>
  );
}
