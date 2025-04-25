import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Button from '../shared/Button';

const AccountCreationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.xl};
  height: 100%;
`;

const HeaderContent = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const InputLabel = styled.label`
  font-size: ${props => props.theme.typography.body2.fontSize};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const TextInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border: 1px solid ${props => props.error ? props.theme.colors.error : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body1.fontSize};
  transition: all ${props => props.theme.transitions.short};
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.5;
  }
`;

const ErrorText = styled(Typography)`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.caption.fontSize};
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.spacing.md} 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.primaryLighter};
  }
  
  span {
    margin: 0 ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.typography.caption.fontSize};
  }
`;

const OAuthButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const OAuthButton = styled(Button)`
  justify-content: flex-start;
  gap: ${props => props.theme.spacing.md};
  
  .oauth-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .oauth-text {
    flex: 1;
    text-align: center;
  }
`;

const TermsText = styled(Typography)`
  text-align: center;
  margin-top: ${props => props.theme.spacing.lg};
`;

const ButtonsContainer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  bottom: 0;
  background-color: ${props => props.theme.colors.background};
  z-index: 10;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
`;

const AccountCreation = ({ onNext, onBack }) => {
  const { dispatch, actionTypes } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error on field change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AccountCreation - Form submitted");
    
    if (validateForm()) {
      console.log("Form validation passed, creating account");
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const user = {
          email: formData.email,
          id: `user-${Date.now()}`
        };
        
        console.log("Created user:", user);
        
        try {
          console.log("Setting user in context");
          dispatch({ 
            type: actionTypes.SET_USER, 
            payload: user 
          });
          
          console.log("Marking onboarding as complete");
          dispatch({ 
            type: actionTypes.COMPLETE_ONBOARDING 
          });
          
          console.log("Account creation complete, proceeding to next step");
          setIsLoading(false);
          onNext(); // Call the parent component's onNext function to navigate
        } catch (error) {
          console.error("Error during account creation:", error);
          setIsLoading(false);
        }
      }, 1000); // Reduced the delay for faster testing
    } else {
      console.warn("Form validation failed");
    }
  };
  
  const handleOAuthSignIn = (provider) => {
    console.log(`AccountCreation - OAuth sign in with ${provider}`);
    setIsLoading(true);
    
    // Simulate OAuth sign in
    setTimeout(() => {
      const user = {
        email: `user@${provider.toLowerCase()}.com`,
        id: `${provider.toLowerCase()}-user-${Date.now()}`
      };
      
      console.log("Created OAuth user:", user);
      
      try {
        console.log("Setting OAuth user in context");
        dispatch({ 
          type: actionTypes.SET_USER, 
          payload: user 
        });
        
        console.log("Marking onboarding as complete");
        dispatch({ 
          type: actionTypes.COMPLETE_ONBOARDING 
        });
        
        console.log("OAuth sign-in complete, proceeding to next step");
        setIsLoading(false);
        onNext(); // Call the parent component's onNext function to navigate
      } catch (error) {
        console.error("Error during OAuth sign-in:", error);
        setIsLoading(false);
      }
    }, 1000); // Reduced the delay for faster testing
  };
  
  return (
    <AccountCreationContainer>
      <HeaderContent>
        <Typography variant="h3" gutterBottom>
          Create Your Account
        </Typography>
        <Typography variant="body1" color="textLight">
          One last step before starting your journey
        </Typography>
      </HeaderContent>
      
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputGroup>
        
        <InputGroup>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Minimum 8 characters"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputGroup>
        
        <InputGroup>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Retype your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
        </InputGroup>
        
        <Button 
          variant="primary" 
          size="full" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <OrDivider>
          <span>OR</span>
        </OrDivider>
        
        <OAuthButtonsContainer>
          <OAuthButton 
            variant="outlined" 
            size="full" 
            type="button"
            onClick={() => handleOAuthSignIn('Google')}
          >
            <span className="oauth-icon">
              <i data-feather="mail" />
            </span>
            <span className="oauth-text">Continue with Google</span>
          </OAuthButton>
          
          <OAuthButton 
            variant="outlined" 
            size="full" 
            type="button"
            onClick={() => handleOAuthSignIn('Apple')}
          >
            <span className="oauth-icon">
              <i data-feather="smartphone" />
            </span>
            <span className="oauth-text">Continue with Apple</span>
          </OAuthButton>
        </OAuthButtonsContainer>
        
        <TermsText variant="caption" color="textLight">
          By creating an account, you agree to our 
          <br />
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </TermsText>
      </FormContainer>
      
      <ButtonsContainer>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
      </ButtonsContainer>
    </AccountCreationContainer>
  );
};

export default AccountCreation;
