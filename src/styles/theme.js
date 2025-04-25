const theme = {
  colors: {
    // Primary brand colors - rich purples
    primary: '#673AB7',
    primaryLight: '#9575CD',
    primaryLighter: '#D1C4E9',
    primaryDark: '#512DA8',
    
    // Secondary colors - accent for CTAs
    secondary: '#9C27B0',
    secondaryLight: '#BA68C8',
    secondaryDark: '#7B1FA2',
    
    // Background colors
    background: '#F7F2FF',
    backgroundLight: '#FFFFFF',
    backgroundDark: '#EEE6F8',
    
    // Text colors
    text: '#333333',
    textLight: '#777777',
    textDark: '#111111',
    
    // Additional UI colors
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#8E24AA',
    
    // Gradient for CTAs
    gradientPrimary: 'linear-gradient(135deg, #673AB7 0%, #9C27B0 100%)',
    gradientSecondary: 'linear-gradient(135deg, #7E57C2 0%, #BA68C8 100%)',
  },
  
  // Typography
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, Helvetica, sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  
  // Border radius
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    circle: '50%',
  },
  
  // Transitions
  transitions: {
    short: '0.15s ease',
    medium: '0.3s ease',
    long: '0.5s ease',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '360px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  
  // Z-index
  zIndex: {
    base: 1,
    content: 10,
    nav: 100,
    modal: 1000,
    toast: 2000,
  },
};

export default theme;
