import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartSummary } from '../components/CartSummary';
import { DeliveryAddressForm } from '../components/DeliveryAddressForm';
import { EmptyCart } from '../components/EmptyCart';
import { PageLayout } from '../components/PageLayout';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { useCart } from '../hooks/useCart';
import { checkoutSchema, type CheckoutFormValues } from '../schemas/checkoutSchema';
import { media } from '../styles/media';
import { buildOrder, saveOrder } from '../utils/order';

const FORM_ID = 'checkout-form';

const Layout = styled.div`
  display: grid;
  gap: 32px;
  ${media.lg} { grid-template-columns: 1fr 448px; align-items: start; gap: 32px; }
`;

const Column = styled.form`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SummaryColumn = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${media.lg} { position: sticky; top: 100px; }
`;

// Title XS do Style Guide (Baloo 18px Bold).
const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
  margin-bottom: 3px;
`;

const FormAlert = styled.p`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.dangerBg};
`;

export function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  // Marca que o pedido foi enviado. O React Router faz a navegação como transição (menos urgente),
  // então o CLEAR renderiza antes: sem isso o checkout mostraria "carrinho vazio" por um instante.
  const submittedRef = useRef(false);
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: { cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' },
  });
  const { handleSubmit, formState } = methods;

  function onSubmit(values: CheckoutFormValues) {
    if (items.length === 0) return; // RN-10
    submittedRef.current = true;
    const { paymentMethod, ...address } = values;
    saveOrder(buildOrder(items, { ...address, state: address.state.toUpperCase() }, paymentMethod));
    navigate('/success');
    clear();
  }

  if (items.length === 0) {
    if (submittedRef.current) return null; // indo para /success
    return (
      <PageLayout>
        <EmptyCart />
      </PageLayout>
    );
  }

  const hasErrors = Object.keys(formState.errors).length > 0;

  return (
    <PageLayout>
      <Layout>
        <FormProvider {...methods}>
          <Column id={FORM_ID} onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="checkout-titulo">
            <Title id="checkout-titulo">Complete seu pedido</Title>
            {formState.isSubmitted && hasErrors && (
              <FormAlert role="alert">Confira os campos destacados antes de confirmar o pedido.</FormAlert>
            )}
            <DeliveryAddressForm />
            <PaymentMethodSelector />
          </Column>
        </FormProvider>
        <SummaryColumn>
          <Title as="h2">Cafés selecionados</Title>
          <CartSummary formId={FORM_ID} />
        </SummaryColumn>
      </Layout>
    </PageLayout>
  );
}
