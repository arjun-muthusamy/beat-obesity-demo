import React from 'react';
import styled, { css } from 'styled-components';

// Variant styles
const variantStyles = {
  h1: props => css`
    font-size: ${props.theme.typography.h1.fontSize};
    font-weight: ${props.theme.typography.h1.fontWeight};
    line-height: ${props.theme.typography.h1.lineHeight};
  `,
  h2: props => css`
    font-size: ${props.theme.typography.h2.fontSize};
    font-weight: ${props.theme.typography.h2.fontWeight};
    line-height: ${props.theme.typography.h2.lineHeight};
  `,
  h3: props => css`
    font-size: ${props.theme.typography.h3.fontSize};
    font-weight: ${props.theme.typography.h3.fontWeight};
    line-height: ${props.theme.typography.h3.lineHeight};
  `,
  h4: props => css`
    font-size: ${props.theme.typography.h4.fontSize};
    font-weight: ${props.theme.typography.h4.fontWeight};
    line-height: ${props.theme.typography.h4.lineHeight};
  `,
  h5: props => css`
    font-size: ${props.theme.typography.h5.fontSize};
    font-weight: ${props.theme.typography.h5.fontWeight};
    line-height: ${props.theme.typography.h5.lineHeight};
  `,
  h6: props => css`
    font-size: ${props.theme.typography.h6.fontSize};
    font-weight: ${props.theme.typography.h6.fontWeight};
    line-height: ${props.theme.typography.h6.lineHeight};
  `,
  body1: props => css`
    font-size: ${props.theme.typography.body1.fontSize};
    line-height: ${props.theme.typography.body1.lineHeight};
  `,
  body2: props => css`
    font-size: ${props.theme.typography.body2.fontSize};
    line-height: ${props.theme.typography.body2.lineHeight};
  `,
  caption: props => css`
    font-size: ${props.theme.typography.caption.fontSize};
    line-height: ${props.theme.typography.caption.lineHeight};
  `,
  button: props => css`
    font-size: ${props.theme.typography.button.fontSize};
    font-weight: ${props.theme.typography.button.fontWeight};
    text-transform: ${props.theme.typography.button.textTransform};
  `,
};

// Color styles
const colorStyles = {
  primary: props => css`color: ${props.theme.colors.primary};`,
  secondary: props => css`color: ${props.theme.colors.secondary};`,
  text: props => css`color: ${props.theme.colors.text};`,
  textLight: props => css`color: ${props.theme.colors.textLight};`,
  textDark: props => css`color: ${props.theme.colors.textDark};`,
  white: props => css`color: white;`,
  success: props => css`color: ${props.theme.colors.success};`,
  warning: props => css`color: ${props.theme.colors.warning};`,
  error: props => css`color: ${props.theme.colors.error};`,
  info: props => css`color: ${props.theme.colors.info};`,
};

// Alignment styles
const alignStyles = {
  left: css`text-align: left;`,
  center: css`text-align: center;`,
  right: css`text-align: right;`,
};

// Typography styled component with dynamic tag
const StyledTypography = styled.span`
  margin: 0;
  padding: 0;
  
  /* Apply variant styles */
  ${props => variantStyles[props.variant]};
  
  /* Apply color styles */
  ${props => colorStyles[props.color]};
  
  /* Apply alignment styles */
  ${props => alignStyles[props.align]};
  
  /* Additional style props */
  ${props => props.gutterBottom && css`margin-bottom: ${props.theme.spacing.md};`}
  ${props => props.noWrap && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  ${props => props.bold && css`font-weight: 700;`}
  ${props => props.italic && css`font-style: italic;`}
  ${props => props.underline && css`text-decoration: underline;`}
  ${props => props.uppercase && css`text-transform: uppercase;`}
`;

const Typography = ({
  variant = 'body1',
  color = 'text',
  align = 'left',
  gutterBottom = false,
  noWrap = false,
  bold = false,
  italic = false,
  underline = false,
  uppercase = false,
  component,
  children,
  ...props
}) => {
  // Determine the HTML tag based on variant if no component is provided
  const getDefaultComponent = () => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'body1': return 'p';
      case 'body2': return 'p';
      case 'caption': return 'span';
      case 'button': return 'span';
      default: return 'span';
    }
  };

  return (
    <StyledTypography
      as={component || getDefaultComponent()}
      variant={variant}
      color={color}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      bold={bold}
      italic={italic}
      underline={underline}
      uppercase={uppercase}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
