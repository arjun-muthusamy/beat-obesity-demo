import React from 'react';
import styled, { css } from 'styled-components';

// Card variants
const variants = {
  default: css`
    background-color: ${props => props.theme.colors.backgroundLight};
  `,
  primary: css`
    background-color: ${props => props.theme.colors.primaryLight};
    color: white;
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.secondaryLight};
    color: white;
  `,
  outlined: css`
    background-color: transparent;
    border: 1px solid ${props => props.theme.colors.primaryLight};
  `,
  elevated: css`
    background-color: ${props => props.theme.colors.backgroundLight};
    box-shadow: ${props => props.theme.shadows.md};
  `,
};

// Card elevations
const elevations = {
  none: css`
    box-shadow: none;
  `,
  sm: css`
    box-shadow: ${props => props.theme.shadows.sm};
  `,
  md: css`
    box-shadow: ${props => props.theme.shadows.md};
  `,
  lg: css`
    box-shadow: ${props => props.theme.shadows.lg};
  `,
  xl: css`
    box-shadow: ${props => props.theme.shadows.xl};
  `,
};

const CardContainer = styled.div`
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.padding ? props.theme.spacing[props.padding] : props.theme.spacing.md};
  position: relative;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: all ${props => props.theme.transitions.medium};
  
  /* Apply variant styles */
  ${props => variants[props.variant]}
  
  /* Apply elevation styles */
  ${props => elevations[props.elevation]}
  
  /* Apply clickable styles */
  ${props => props.clickable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.lg};
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
  
  .card-title {
    margin: 0;
    font-weight: 600;
  }
`;

const CardMedia = styled.div`
  margin: -${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  height: ${props => props.height || '200px'};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-top-left-radius: ${props => props.theme.borderRadius.md};
  border-top-right-radius: ${props => props.theme.borderRadius.md};
`;

const CardContent = styled.div``;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.alignment || 'flex-start'};
  margin-top: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.sm};
  
  ${props => props.divider && css`
    border-top: 1px solid ${props.theme.colors.primaryLighter};
    padding-top: ${props.theme.spacing.md};
  `}
`;

const Card = ({
  variant = 'default',
  elevation = 'sm',
  padding = 'md',
  fullWidth = false,
  clickable = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <CardContainer
      variant={variant}
      elevation={elevation}
      padding={padding}
      fullWidth={fullWidth}
      clickable={clickable}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

Card.Header = ({ title, action, children, ...props }) => (
  <CardHeader {...props}>
    {title && <h3 className="card-title">{title}</h3>}
    {children || null}
    {action && <div className="card-header-action">{action}</div>}
  </CardHeader>
);

Card.Media = ({ image, height, alt, ...props }) => (
  <CardMedia image={image} height={height} {...props} aria-label={alt} role="img" />
);

Card.Content = ({ children, ...props }) => (
  <CardContent {...props}>{children}</CardContent>
);

Card.Actions = ({ children, alignment, divider, ...props }) => (
  <CardActions alignment={alignment} divider={divider} {...props}>
    {children}
  </CardActions>
);

export default Card;
