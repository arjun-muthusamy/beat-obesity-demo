import React from 'react';
import styled, { css } from 'styled-components';

// Avatar sizes
const sizes = {
  xs: css`
    width: 24px;
    height: 24px;
    font-size: 12px;
  `,
  sm: css`
    width: 32px;
    height: 32px;
    font-size: 14px;
  `,
  md: css`
    width: 48px;
    height: 48px;
    font-size: 18px;
  `,
  lg: css`
    width: 64px;
    height: 64px;
    font-size: 24px;
  `,
  xl: css`
    width: 96px;
    height: 96px;
    font-size: 36px;
  `,
  xxl: css`
    width: 128px;
    height: 128px;
    font-size: 48px;
  `,
};

// Avatar variants
const variants = {
  circle: css`
    border-radius: 50%;
  `,
  square: css`
    border-radius: ${props => props.theme.borderRadius.sm};
  `,
  rounded: css`
    border-radius: ${props => props.theme.borderRadius.md};
  `,
};

// Avatar container
const AvatarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
    props.$bgColor || props.theme.colors.primaryLight};
  color: ${props => props.$color || 'white'};
  overflow: hidden;
  position: relative;
  user-select: none;
  
  ${props => sizes[props.$size]};
  ${props => variants[props.$variant]};
  
  ${props => props.$bordered && css`
    border: 2px solid ${props.$borderColor || props.theme.colors.backgroundLight};
  `}
  
  ${props => props.$selectable && css`
    cursor: pointer;
    transition: transform ${props.theme.transitions.short}, 
                box-shadow ${props.theme.transitions.short};
    
    &:hover {
      transform: scale(1.05);
      box-shadow: ${props.theme.shadows.md};
    }
  `}
  
  ${props => props.$active && css`
    border: 2px solid ${props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props.theme.colors.primaryLighter};
  `}
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const AvatarText = styled.span`
  font-weight: 500;
`;

const AvatarBadge = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background-color: ${props => 
    props.$badgeColor || props.theme.colors.success};
  border: 2px solid ${props => props.theme.colors.backgroundLight};
  
  ${props => props.$online && css`
    background-color: ${props.theme.colors.success};
  `}
`;

const Avatar = ({
  src,
  alt = 'User avatar',
  name,
  size = 'md',
  variant = 'circle',
  bgColor,
  color,
  bordered = false,
  borderColor,
  showBadge = false,
  badgeColor,
  online = false,
  selectable = false,
  active = false,
  onClick,
  children,
  ...props
}) => {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AvatarContainer
      $size={size}
      $variant={variant}
      $bgColor={bgColor}
      $color={color}
      $bordered={bordered}
      $borderColor={borderColor}
      $selectable={selectable}
      $active={active}
      onClick={selectable ? onClick : undefined}
      {...props}
    >
      {src ? (
        <AvatarImg src={src} alt={alt} />
      ) : name ? (
        <AvatarText>{getInitials(name)}</AvatarText>
      ) : (
        children || <i className="feather icon-user" data-feather="user"></i>
      )}
      
      {(showBadge || online) && (
        <AvatarBadge $badgeColor={badgeColor} $online={online} />
      )}
    </AvatarContainer>
  );
};

export default Avatar;
