import type { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { useCep } from '../hooks/useCep';
import type { CheckoutFormValues } from '../schemas/checkoutSchema';
import { media } from '../styles/media';
import { formatCep, sanitizeCep } from '../utils/cep';
import { FormField } from './FormField';
import { FormSection } from './FormSection';
import { MapPinIcon } from './icons';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px 12px;
  ${media.sm} {
    grid-template-columns: repeat(6, 1fr);
    .cep { grid-column: span 3; }
    .street { grid-column: span 6; }
    .number { grid-column: span 2; }
    .complement { grid-column: span 4; }
    .neighborhood { grid-column: span 2; }
    .city { grid-column: span 3; }
    .state { grid-column: span 1; }
  }
`;
const Status = styled.p<{ $error?: boolean }>`
  margin-top: 16px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.85rem;
  color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.textMuted)};
  background: ${({ theme, $error }) => ($error ? theme.colors.dangerBg : theme.colors.input)};
`;

export function DeliveryAddressForm() {
  const {
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();
  const { status, lookup, reset } = useCep();

  async function handleCepChange(event: ChangeEvent<HTMLInputElement>) {
    const masked = formatCep(event.target.value);
    setValue('cep', masked, { shouldValidate: masked.length === 9 });
    const digits = sanitizeCep(masked);
    if (digits.length < 8) {
      reset();
      return;
    }
    const address = await lookup(digits);
    if (address) {
      // Só rua, bairro, cidade e UF vêm da API; número e complemento ficam manuais (RN-07).
      setValue('street', address.street, { shouldValidate: true });
      setValue('neighborhood', address.neighborhood, { shouldValidate: true });
      setValue('city', address.city, { shouldValidate: true });
      setValue('state', address.state, { shouldValidate: true });
      setFocus('number');
    }
  }

  return (
    <FormSection
      title="Endereço de Entrega"
      description="Informe o endereço onde deseja receber seu pedido"
      icon={<MapPinIcon />}
      iconColor="yellowDark"
    >
      <Grid>
        <FormField
          className="cep"
          id="cep"
          label="CEP"
          placeholder="00000-000"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={9}
          error={errors.cep?.message}
          registration={register('cep', { onChange: handleCepChange })}
        />
        <FormField className="street" id="street" label="Rua" autoComplete="address-line1" error={errors.street?.message} registration={register('street')} />
        <FormField className="number" id="number" label="Número" inputMode="numeric" error={errors.number?.message} registration={register('number')} />
        <FormField className="complement" id="complement" label="Complemento" optional error={errors.complement?.message} registration={register('complement')} />
        <FormField className="neighborhood" id="neighborhood" label="Bairro" error={errors.neighborhood?.message} registration={register('neighborhood')} />
        <FormField className="city" id="city" label="Cidade" autoComplete="address-level2" error={errors.city?.message} registration={register('city')} />
        <FormField className="state" id="state" label="UF" maxLength={2} autoComplete="address-level1" error={errors.state?.message} registration={register('state')} />
      </Grid>
      {status === 'loading' && <Status role="status">Buscando endereço…</Status>}
      {status === 'notFound' && (
        <Status $error role="alert">
          CEP não encontrado. Confira o número ou preencha o endereço manualmente.
        </Status>
      )}
      {status === 'error' && (
        <Status $error role="alert">
          Não foi possível consultar o CEP agora. Preencha o endereço manualmente.
        </Status>
      )}
    </FormSection>
  );
}
