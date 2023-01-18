import React from 'react';

type Color = 'primary' | 'secondary';

interface IconButtonProps extends IconButtonBaseProps {
  color?: Color;
}

export function IconButton({ color, ...buttonProps }: IconButtonProps) {
  switch (color) {
    case 'primary':
      return <PrimaryIconButton {...buttonProps} />;
    case 'secondary':
      return <SecondaryIconButton {...buttonProps} />;
    default:
      return <PrimaryIconButton {...buttonProps} />;
  }
}

interface IconButtonBaseProps extends React.HTMLProps<HTMLButtonElement> {}

const PrimaryIconButton = ({
  children,
  ...buttonProps
}: IconButtonBaseProps) => (
  <button
    {...buttonProps}
    type="button"
    className="rounded-full p-1 bg-light-primary dark:bg-dark-primary text-light-primary dark:text-dark-primary border border-light-primary overflow-hidden"
  >
    {children}
  </button>
);

const SecondaryIconButton = ({
  children,
  ...buttonProps
}: IconButtonBaseProps) => (
  <button
    {...buttonProps}
    type="button"
    className="rounded-full p-1 bg-light-secondary dark:bg-dark-secondary text-light-secondary dark:text-dark-secondary border border-light-primary dark:border-dark-grey overflow-hidden"
  >
    {children}
  </button>
);
