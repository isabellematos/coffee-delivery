import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import type { CheckoutFormValues } from '../schemas/checkoutSchema';
import { media } from '../styles/media';
import type { PaymentMethod } from '../types';
import { PAYMENT_LABELS } from '../utils/payment';
import { FormSection } from './FormSection';
import { BankIcon, CreditCardIcon, CurrencyDollarIcon, MoneyIcon } from './icons';

const Options = styled.div`
  display: grid;
  gap: 12px;
  ${media.sm} { grid-template-columns: repeat(3, 1fr); }
`;

// Select do Style Guide: base-button; hover base-hover; selecionado roxo-claro com borda roxa.
// O radio continua no DOM (teclado e leitor de tela), só fica visualmente escondido.
const Option = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.button};
  font-size: 0.75rem;
  line-height: 1.6;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  .icon { display: inline-flex; color: ${({ theme }) => theme.colors.purple}; }
  &:hover { background: ${({ theme }) => theme.colors.buttonHover}; }
  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.purple};
    background: ${({ theme }) => theme.colors.purpleLight};
  }
  &:has(input:focus-visible) { outline: 3px solid ${({ theme }) => theme.colors.focusRing}; outline-offset: 2px; }
  input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
    margin: 0;
  }
`;

const ErrorText = styled.p`
  margin-top: 12px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`;

const methods: PaymentMethod[] = ['credit', 'debit', 'cash'];

const icons: Record<PaymentMethod, ReactNode> = {
  credit: <CreditCardIcon />,
  debit: <BankIcon />,
  cash: <MoneyIcon />,
};

export function PaymentMethodSelector() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();
  const error = errors.paymentMethod?.message;

  return (
    <FormSection
      title="Pagamento"
      description="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
      icon={<CurrencyDollarIcon />}
      iconColor="purple"
      describedBy={error ? 'payment-erro' : undefined}
    >
      <Options>
        {methods.map((method) => (
          <Option key={method}>
            <input type="radio" value={method} {...register('paymentMethod')} />
            <span className="icon" aria-hidden="true">
              {icons[method]}
            </span>
            {PAYMENT_LABELS[method]}
          </Option>
        ))}
      </Options>
      {error && (
        <ErrorText id="payment-erro" role="alert">
          {error}
        </ErrorText>
      )}
    </FormSection>
  );
}
