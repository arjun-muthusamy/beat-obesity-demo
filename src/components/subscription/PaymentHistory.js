import React from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';

const PaymentHistoryContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Filter = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body2.fontSize};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
  }
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm} 36px;
    background-color: ${props => props.theme.colors.backgroundDark};
    border: none;
    border-radius: ${props => props.theme.borderRadius.md};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.body2.fontSize};
    width: 200px;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
    }
  }
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: ${props => props.theme.colors.textLight};
  }
`;

const PaymentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const PaymentCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
`;

const PaymentContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentInfo = styled.div`
  flex: 1;
`;

const PaymentMeta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xs};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.caption.fontSize};
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const PaymentAmount = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
`;

const PaymentStatus = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.caption.fontSize};
  font-weight: 500;
  
  ${props => props.status === 'Paid' && `
    background-color: ${props.theme.colors.success}20;
    color: ${props.theme.colors.success};
  `}
  
  ${props => props.status === 'Processing' && `
    background-color: ${props.theme.colors.warning}20;
    color: ${props.theme.colors.warning};
  `}
  
  ${props => props.status === 'Failed' && `
    background-color: ${props.theme.colors.error}20;
    color: ${props.theme.colors.error};
  `}
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: ${props => props.theme.typography.caption.fontSize};
  
  &:hover {
    text-decoration: underline;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.sm};
`;

const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
    props.active 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.active 
      ? 'white' 
      : props.theme.colors.text};
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.active 
        ? props.theme.colors.primary 
        : props.theme.colors.primaryLighter};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InvoiceModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.theme.zIndex.modal};
  padding: ${props => props.theme.spacing.md};
`;

const ModalContent = styled(Card)`
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

// Sample payment data
const paymentData = [
  {
    id: 'INV-2023-07',
    date: '2023-07-01',
    amount: 199.00,
    status: 'Paid',
    paymentMethod: 'Visa ending in 4242',
    plan: 'Complete Plan'
  },
  {
    id: 'INV-2023-06',
    date: '2023-06-01',
    amount: 199.00,
    status: 'Paid',
    paymentMethod: 'Visa ending in 4242',
    plan: 'Complete Plan'
  },
  {
    id: 'INV-2023-05',
    date: '2023-05-01',
    amount: 199.00,
    status: 'Paid',
    paymentMethod: 'Visa ending in 4242',
    plan: 'Complete Plan'
  },
  {
    id: 'INV-2023-04',
    date: '2023-04-01',
    amount: 99.00,
    status: 'Paid',
    paymentMethod: 'Visa ending in 4242',
    plan: 'Basic Plan'
  }
];

const PaymentHistory = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoice(true);
  };
  
  const closeModal = () => {
    setShowInvoice(false);
  };
  
  return (
    <PaymentHistoryContainer>
      <Typography variant="h5" gutterBottom>
        Payment History
      </Typography>
      
      <FilterSection>
        <FilterGroup>
          <Filter>
            <option>All Payments</option>
            <option>Paid</option>
            <option>Processing</option>
            <option>Failed</option>
          </Filter>
          
          <Filter>
            <option>Last 6 months</option>
            <option>Last 3 months</option>
            <option>Last month</option>
            <option>All time</option>
          </Filter>
        </FilterGroup>
        
        <SearchInput>
          <i data-feather="search" />
          <input type="text" placeholder="Search invoices..." />
        </SearchInput>
      </FilterSection>
      
      <PaymentsList>
        {paymentData.map(payment => (
          <PaymentCard key={payment.id}>
            <PaymentContent>
              <PaymentInfo>
                <Typography variant="h6" gutterBottom>
                  {payment.plan}
                </Typography>
                
                <PaymentMeta>
                  <MetaItem>
                    <i data-feather="calendar" />
                    {new Date(payment.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </MetaItem>
                  <MetaItem>
                    <i data-feather="credit-card" />
                    {payment.paymentMethod}
                  </MetaItem>
                  <MetaItem>
                    <i data-feather="file-text" />
                    {payment.id}
                  </MetaItem>
                </PaymentMeta>
              </PaymentInfo>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <PaymentAmount>
                  ${payment.amount.toFixed(2)}
                </PaymentAmount>
                
                <PaymentStatus status={payment.status}>
                  {payment.status}
                </PaymentStatus>
                
                <ActionButton onClick={() => handleViewInvoice(payment)}>
                  View Invoice
                </ActionButton>
              </div>
            </PaymentContent>
          </PaymentCard>
        ))}
      </PaymentsList>
      
      <Pagination>
        <PageButton disabled>
          <i data-feather="chevron-left" />
        </PageButton>
        
        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        
        <PageButton>
          <i data-feather="chevron-right" />
        </PageButton>
      </Pagination>
      
      {showInvoice && selectedInvoice && (
        <InvoiceModal onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Typography variant="h5">
                  Invoice
                </Typography>
                <button 
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={closeModal}
                >
                  <i data-feather="x" />
                </button>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <Typography variant="body2" color="textLight">
                    Invoice Number
                  </Typography>
                  <Typography variant="body1">
                    {selectedInvoice.id}
                  </Typography>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="textLight">
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedInvoice.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <Typography variant="body2" color="textLight" gutterBottom>
                  Billed To
                </Typography>
                <Typography variant="body1">
                  John Doe
                </Typography>
                <Typography variant="body2" color="textLight">
                  johndoe@example.com
                </Typography>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <Typography variant="body2" color="textLight" gutterBottom>
                  Payment Method
                </Typography>
                <Typography variant="body1">
                  {selectedInvoice.paymentMethod}
                </Typography>
              </div>
              
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f5f8ff', 
                borderRadius: '8px',
                marginBottom: '24px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '8px' 
                }}>
                  <Typography variant="body1">
                    {selectedInvoice.plan}
                  </Typography>
                  <Typography variant="body1">
                    ${selectedInvoice.amount.toFixed(2)}
                  </Typography>
                </div>
                <Typography variant="body2" color="textLight">
                  Monthly subscription
                </Typography>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '16px 0',
                borderTop: '1px solid #eee',
                marginBottom: '24px'
              }}>
                <Typography variant="h6">
                  Total
                </Typography>
                <Typography variant="h6">
                  ${selectedInvoice.amount.toFixed(2)}
                </Typography>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <Button 
                  variant="outlined" 
                  size="full"
                  icon={<i data-feather="download" />}
                >
                  Download PDF
                </Button>
                <Button 
                  variant="primary" 
                  size="full"
                  icon={<i data-feather="mail" />}
                >
                  Email Invoice
                </Button>
              </div>
            </div>
          </ModalContent>
        </InvoiceModal>
      )}
    </PaymentHistoryContainer>
  );
};

export default PaymentHistory;
