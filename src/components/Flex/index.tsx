import React from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  direction?: 'row' | 'column';
  align?: 'center' | 'start' | 'end' | 'stretch';
  self?: 'stretch' | 'baseline' | 'center' | 'start' | 'end';
  justify?: 'center' | 'start' | 'end' | 'stretch' | 'around' | 'between';
  wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
  grow?: number;
  fill?: string;
}

const Flex = React.forwardRef((props: FlexProps, ref: React.Ref<HTMLDivElement>) => {
  const { value, direction, align, self: selfVar, justify, grow, wrap, fill, children, style = {}, ...rest } = props;
  const styleObj = { ...style };
  if (value) {
    styleObj.flex = value;
  } else {
    styleObj.display = 'flex';
  }
  if (direction || selfVar || wrap || grow || align || justify) {
    styleObj.display = 'flex';
  }
  if (direction) {
    if (styleObj.display !== 'flex') styleObj.display = 'flex';
    styleObj.flexDirection = direction;
  }
  if (wrap) {
    styleObj.flexWrap = wrap;
  }
  if (grow) {
    styleObj.flexGrow = grow;
  }
  if (align) {
    if (align === 'center') styleObj.alignItems = 'center';
    else if (align === 'start') styleObj.alignItems = 'flex-start';
    else if (align === 'end') styleObj.alignItems = 'flex-end';
    else if (align === 'stretch') styleObj.alignItems = 'stretch';
  }
  if (selfVar) {
    if (selfVar === 'center') styleObj.alignSelf = 'center';
    else if (selfVar === 'start') styleObj.alignSelf = 'flex-start';
    else if (selfVar === 'end') styleObj.alignSelf = 'flex-end';
    else if (selfVar === 'stretch') styleObj.alignSelf = 'stretch';
  }
  if (justify) {
    if (justify === 'center') styleObj.justifyContent = 'center';
    else if (justify === 'start') styleObj.justifyContent = 'flex-start';
    else if (justify === 'end') styleObj.justifyContent = 'flex-end';
    else if (justify === 'around') styleObj.justifyContent = 'space-around';
    else if (justify === 'between') styleObj.justifyContent = 'space-between';
  }
  if (fill) {
    styleObj.height = '100%';
    styleObj.width = '100%';
  }
  return (
    <div ref={ref} {...rest} style={styleObj}>
      {children}
    </div>
  );
});
Flex.displayName = 'Flex';

export default Flex;
