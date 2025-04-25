import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// Animation for indeterminate progress
const indeterminateAnimation = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`;

// Animation for indeterminate buffer
const indeterminateBufferAnimation = keyframes`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }
  60% {
    opacity: 0;
    background-position: 0 -23px;
  }
  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;

// Progress bar variants
const variants = {
  primary: props => css`
    background-color: ${props.theme.colors.primary};
  `,
  secondary: props => css`
    background-color: ${props.theme.colors.secondary};
  `,
  success: props => css`
    background-color: ${props.theme.colors.success};
  `,
  warning: props => css`
    background-color: ${props.theme.colors.warning};
  `,
  error: props => css`
    background-color: ${props.theme.colors.error};
  `,
  info: props => css`
    background-color: ${props.theme.colors.info};
  `,
  gradient: props => css`
    background: ${props.theme.colors.gradientPrimary};
  `,
};

// Progress bar sizes
const sizes = {
  xs: css`height: 2px;`,
  sm: css`height: 4px;`,
  md: css`height: 8px;`,
  lg: css`height: 12px;`,
  xl: css`height: 16px;`,
};

// Progress bar container
const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  margin: ${props => props.margin || 0};
`;

// Progress bar label
const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.caption.fontSize};
  font-weight: 500;
`;

// Progress bar track
const ProgressTrack = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.xs};
  position: relative;
  overflow: hidden;
  
  ${props => sizes[props.size]}
  
  ${props => props.shape === 'rounded' && css`
    border-radius: ${props.theme.borderRadius.sm};
  `}
  
  ${props => props.shape === 'pill' && css`
    border-radius: 9999px;
  `}

  ${props => props.indeterminate && css`
    background-color: ${props.theme.colors.backgroundDark};
    position: relative;
    overflow: hidden;
  `}
`;

// Progress bar fill
const ProgressFill = styled.div`
  height: 100%;
  width: ${props => `${props.value}%`};
  border-radius: inherit;
  transition: width 0.4s ease-in-out;
  
  ${props => variants[props.variant]}
  
  ${props => props.striped && css`
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
  `}
  
  ${props => props.animated && css`
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: progress-bar-stripes 1s linear infinite;
    
    @keyframes progress-bar-stripes {
      from { background-position: 40px 0; }
      to { background-position: 0 0; }
    }
  `}
  
  ${props => props.indeterminate && css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: auto;
    will-change: left, right;
    animation: ${indeterminateAnimation} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  `}
`;

// Progress bar buffer
const ProgressBuffer = styled.div`
  height: 100%;
  width: ${props => `${props.buffer}%`};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: inherit;
  background-color: ${props => props.theme.colors.primaryLighter};
  opacity: 0.3;
  
  ${props => props.indeterminate && css`
    background-image: linear-gradient(
      to right,
      transparent,
      ${props.theme.colors.primary},
      transparent
    );
    animation: ${indeterminateBufferAnimation} 3s infinite linear;
  `}
`;

const ProgressBar = ({
  value = 0,
  buffer = 0,
  variant = 'primary',
  size = 'md',
  shape = 'default',
  label,
  showValue = false,
  striped = false,
  animated = false,
  indeterminate = false,
  margin,
  ...props
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const normalizedBuffer = Math.min(Math.max(buffer, 0), 100);
  
  return (
    <ProgressContainer margin={margin} {...props}>
      {(label || showValue) && (
        <ProgressLabel>
          {label && <span>{label}</span>}
          {showValue && <span>{normalizedValue}%</span>}
        </ProgressLabel>
      )}
      
      <ProgressTrack 
        size={size} 
        shape={shape}
        indeterminate={indeterminate}
      >
        {buffer > 0 && !indeterminate && (
          <ProgressBuffer buffer={normalizedBuffer} />
        )}
        
        <ProgressFill 
          value={normalizedValue}
          variant={variant}
          striped={striped}
          animated={animated}
          indeterminate={indeterminate}
        />
      </ProgressTrack>
    </ProgressContainer>
  );
};

export default ProgressBar;
