import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from '../shared/Typography';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 ${props => props.theme.spacing.md};
  background-color: ${props => props.bgColor || props.theme.colors.backgroundLight};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.nav};
  box-shadow: ${props => props.elevated ? props.theme.shadows.sm : 'none'};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const HeaderCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const HeaderTitle = styled(Typography)`
  margin: 0;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  transition: background-color ${props => props.theme.transitions.short};
  
  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Header = ({
  title,
  subtitle,
  leftIcon = 'arrow-left',
  rightIcon,
  rightAction,
  onLeftIconClick,
  onRightIconClick,
  elevated = true,
  bgColor,
  children,
  ...props
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onLeftIconClick) {
      onLeftIconClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderContainer elevated={elevated} bgColor={bgColor} {...props}>
      <HeaderLeft>
        {leftIcon && (
          <IconButton onClick={handleBackClick}>
            <i data-feather={leftIcon} />
          </IconButton>
        )}
      </HeaderLeft>

      <HeaderCenter>
        {children || (
          <>
            <HeaderTitle variant="h5" component="h1">
              {title}
            </HeaderTitle>
            {subtitle && (
              <Typography variant="caption" color="textLight">
                {subtitle}
              </Typography>
            )}
          </>
        )}
      </HeaderCenter>

      <HeaderRight>
        {rightIcon && (
          <IconButton onClick={onRightIconClick || rightAction}>
            <i data-feather={rightIcon} />
          </IconButton>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
