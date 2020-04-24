import React from 'react';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  large?: boolean;
}
const Separator = React.memo(({ large, ...rest }: SeparatorProps) => {
  return <div className={`separator ${large && 'separator-large'} ${rest.className || ''}`} {...rest} />;
});
export default Separator;
