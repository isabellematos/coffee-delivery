import styled from 'styled-components';
import { MinusIcon, PlusIcon } from './icons';

// Input Number do Style Guide: fundo base-button, ícones roxos (hover roxo-escuro).
const Group = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.button};
`;

const Step = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 44px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.purple};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: color 0.15s ease;
  &:disabled { opacity: 0.4; }
  &:not(:disabled):hover { color: ${({ theme }) => theme.colors.purpleDark}; }
`;

const NumberField = styled.input`
  width: 28px;
  height: 44px;
  border: 0;
  background: transparent;
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.title};
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
`;

const Value = styled.span`
  min-width: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
`;

interface Props {
  value: number;
  onChange: (next: number) => void;
  productName: string;
  min?: number;
  max?: number;
  editable?: boolean;
}

export function QuantityInput({ value, onChange, productName, min = 1, max = 99, editable = true }: Props) {
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.floor(n)));
  const label = `Quantidade de ${productName}`;

  return (
    <Group role="group" aria-label={label}>
      <Step type="button" aria-label={`Diminuir quantidade de ${productName}`} disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>
        <MinusIcon />
      </Step>
      {editable ? (
        <NumberField
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          aria-label={label}
          onChange={(e) => {
            const n = Number(e.target.value);
            onChange(e.target.value !== '' && Number.isFinite(n) ? clamp(n) : min);
          }}
        />
      ) : (
        <Value aria-live="polite">{value}</Value>
      )}
      <Step type="button" aria-label={`Aumentar quantidade de ${productName}`} disabled={value >= max} onClick={() => onChange(clamp(value + 1))}>
        <PlusIcon />
      </Step>
    </Group>
  );
}
