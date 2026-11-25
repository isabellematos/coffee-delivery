import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../styles/media';
import { primaryButton } from '../styles/layout';
import type { Order } from '../types';
import { formatCurrency } from '../utils/money';
import { PAYMENT_LABELS } from '../utils/payment';
import { CoffeeIcon, CurrencyDollarIcon, MapPinIcon } from './icons';

const Wrapper = styled.section`
  display: grid;
  gap: 40px;
  align-items: end;
  padding-top: 16px;
  ${media.md} { padding-top: 56px; }
  ${media.lg} { grid-template-columns: 526px 1fr; gap: 100px; }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

// Title L do Style Guide em amarelo-escuro (texto grande: 3:1 já atende o AA).
const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.yellowDark};
`;

const Lead = styled.p`
  margin-top: 4px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.subtitle};
`;

// Borda em degradê amarelo → roxo, como no protótipo (truque do background em duas camadas).
const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 24px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.card};
  background:
    linear-gradient(${({ theme }) => theme.colors.background}, ${({ theme }) => theme.colors.background}) padding-box,
    linear-gradient(102.89deg, ${({ theme }) => theme.colors.yellow} 2.61%, ${({ theme }) => theme.colors.purple} 98.76%) border-box;
  ${media.md} { padding: 40px; }
`;

type RowColor = 'purple' | 'yellow' | 'yellowDark';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  dl { margin: 0; color: ${({ theme }) => theme.colors.text}; }
  dd { margin: 0; font-weight: 700; }
  /* "Entrega em <rua>" na mesma linha, como no protótipo */
  dt.inline, dt.inline + dd { display: inline; }
  dd.note { display: block; font-weight: 400; }
  ul { margin: 0; padding-left: 18px; font-weight: 400; }
`;

const RowIcon = styled.span<{ $color: RowColor }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $color }) => theme.colors[$color]};
  color: ${({ theme }) => theme.colors.background};
`;

const Visual = styled.div`
  display: none;
  ${media.lg} {
    display: block;
    justify-self: center;
    width: 100%;
    max-width: 420px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 50%;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
`;

const Cta = styled(Link)`
  ${primaryButton}
  align-self: flex-start;
`;

function DetailRow({ icon, color, children }: { icon: ReactNode; color: RowColor; children: ReactNode }) {
  return (
    <Row>
      <RowIcon $color={color} aria-hidden="true">
        {icon}
      </RowIcon>
      <dl>{children}</dl>
    </Row>
  );
}

export function OrderSuccess({ order }: { order: Order }) {
  const { address } = order;

  return (
    <Wrapper aria-labelledby="sucesso-titulo">
      <Content>
        <div>
          <Title id="sucesso-titulo">Uhu! Pedido confirmado</Title>
          <Lead>Agora é só aguardar que logo o café chegará até você</Lead>
        </div>
        <Card>
          <DetailRow icon={<MapPinIcon size={16} />} color="purple">
            <dt className="inline">Entrega em </dt>
            <dd>
              {address.street}, {address.number}
              {address.complement ? ` — ${address.complement}` : ''}
            </dd>
            <dd className="note">
              {address.neighborhood} - {address.city}, {address.state.toUpperCase()} · CEP {address.cep}
            </dd>
          </DetailRow>
          <DetailRow icon={<CoffeeIcon />} color="yellow">
            <dt>Itens</dt>
            <dd>
              <ul>
                {order.items.map((item) => (
                  <li key={item.coffeeId}>
                    {item.quantity}× {item.name}
                  </li>
                ))}
              </ul>
            </dd>
          </DetailRow>
          <DetailRow icon={<CurrencyDollarIcon size={16} />} color="yellowDark">
            <dt>Pagamento na entrega</dt>
            <dd>{PAYMENT_LABELS[order.paymentMethod]}</dd>
            <dd className="note">
              Total {formatCurrency(order.totalInCents)} (com entrega de {formatCurrency(order.deliveryFeeInCents)})
            </dd>
          </DetailRow>
        </Card>
        <Cta to="/">Voltar para a Home</Cta>
      </Content>
      <Visual aria-hidden="true">
        <img src="/coffees/capuccino.jpg" alt="" width={420} height={420} />
      </Visual>
    </Wrapper>
  );
}
