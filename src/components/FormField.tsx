import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

// O protótipo usa só placeholder; mantemos um label visível (pequeno) por acessibilidade.
const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  .optional { font-weight: 400; font-style: italic; color: ${({ theme }) => theme.colors.textMuted}; }
`;

// Input Text do Style Guide: fundo base-input, borda base-button, foco com borda amarelo-escuro.
const Input = styled.input<{ $invalid: boolean }>`
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.button)};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  transition: border-color 0.15s ease;
  &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
  &:focus { border-color: ${({ theme }) => theme.colors.yellowDark}; }
`;

const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`;

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  optional?: boolean;
  className?: string;
}

export function FormField({ id, label, registration, error, optional, className, ...inputProps }: Props) {
  const errorId = `${id}-erro`;
  return (
    <Wrapper className={className}>
      <Label htmlFor={id}>
        {label} {optional && <span className="optional">(opcional)</span>}
      </Label>
      <Input
        id={id}
        $invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
        {...registration}
      />
      {error && (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
}
