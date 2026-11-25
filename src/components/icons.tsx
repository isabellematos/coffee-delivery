import type { SVGProps } from 'react';

// Ícones no estilo Phosphor (usado no Style Guide do Figma). Todos decorativos (aria-hidden):
// o texto acessível fica no botão/link que os contém. A cor vem de `currentColor`.
const stroke: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const fill: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
};

type IconProps = { size?: number };

export const CartIcon = ({ size = 22 }: IconProps) => (
  <svg {...fill} width={size} height={size}>
    <path d="M2.25 3a.75.75 0 0 0 0 1.5h1.6l2.4 10.1A2.25 2.25 0 0 0 8.44 16.5h9.31a2.25 2.25 0 0 0 2.19-1.74l1.53-6.6A.75.75 0 0 0 20.74 7.2H6.2l-.84-3.62A.75.75 0 0 0 4.63 3H2.25z" />
    <circle cx="9" cy="20" r="1.6" />
    <circle cx="17.25" cy="20" r="1.6" />
  </svg>
);

export const SunIcon = ({ size = 22 }: IconProps) => (
  <svg {...stroke} width={size} height={size}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ size = 22 }: IconProps) => (
  <svg {...fill} width={size} height={size}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const TrashIcon = ({ size = 16 }: IconProps) => (
  <svg {...stroke} width={size} height={size}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
  </svg>
);

export const PlusIcon = ({ size = 14 }: IconProps) => (
  <svg {...stroke} width={size} height={size} strokeWidth={2.5}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ size = 14 }: IconProps) => (
  <svg {...stroke} width={size} height={size} strokeWidth={2.5}>
    <path d="M5 12h14" />
  </svg>
);

export const MapPinIcon = ({ size = 22 }: IconProps) => (
  <svg {...fill} width={size} height={size}>
    <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

export const CurrencyDollarIcon = ({ size = 22 }: IconProps) => (
  <svg {...stroke} width={size} height={size}>
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const TimerIcon = ({ size = 16 }: IconProps) => (
  <svg {...fill} width={size} height={size}>
    <path d="M12 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.2 6.2-3.5 3.5a1 1 0 0 1-1.4-1.4l3.5-3.5a1 1 0 0 1 1.4 1.4zM9 1h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z" />
  </svg>
);

export const PackageIcon = ({ size = 16 }: IconProps) => (
  <svg {...fill} width={size} height={size}>
    <path d="M12.5 2.1a1 1 0 0 0-1 0l-8 4.5a1 1 0 0 0-.5.9v9a1 1 0 0 0 .5.9l8 4.5c.2.1.3.1.5.1V12.3L20.8 7.4a1 1 0 0 0-.3-.8l-8-4.5zM13 22l8-4.5a1 1 0 0 0 .5-.9V9.2L13 13.8V22z" />
  </svg>
);

export const CoffeeIcon = ({ size = 16 }: IconProps) => (
  <svg {...fill} width={size} height={size}>
    <path d="M3 9h14v5a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V9zm14 1h1a3 3 0 0 1 0 6h-1.3a7.9 7.9 0 0 0 .3-2v-1h1a1 1 0 0 0 0-2h-1v-1zM8 2.5a1 1 0 0 1 1 1V6a1 1 0 0 1-2 0V3.5a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1V6a1 1 0 0 1-2 0V3.5a1 1 0 0 1 1-1z" />
  </svg>
);

export const CreditCardIcon = ({ size = 16 }: IconProps) => (
  <svg {...stroke} width={size} height={size}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </svg>
);

export const BankIcon = ({ size = 16 }: IconProps) => (
  <svg {...stroke} width={size} height={size}>
    <path d="M3 10 12 4l9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" />
  </svg>
);

export const MoneyIcon = ({ size = 16 }: IconProps) => (
  <svg {...stroke} width={size} height={size}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 10v4M18 10v4" />
  </svg>
);
