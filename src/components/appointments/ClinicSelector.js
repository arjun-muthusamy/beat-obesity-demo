import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';

const ClinicSelectorContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SearchContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 ${props => props.theme.spacing.md} 0 48px;
  background-color: ${props => props.theme.colors.backgroundDark};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body1.fontSize};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textLight};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const TypeSelector = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.sm};
`;

const TypeButton = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => 
    props.selected 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.selected 
      ? 'white' 
      : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.selected 
        ? props.theme.colors.primary 
        : props.theme.colors.primaryLighter};
  }
`;

const ClinicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ClinicCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  ${props => props.selected && `
    border: 2px solid ${props.theme.colors.primary};
    background-color: ${props.theme.colors.primaryLighter}33;
  `}
`;

const ClinicContent = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const ClinicImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

const ClinicInfo = styled.div`
  flex: 1;
`;

const ClinicMeta = styled.div`
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.sm};
`;

const PageButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
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

// Sample clinics data
const sampleClinics = [
  {
    id: 1,
    name: "BeatObesity Medical Center",
    type: "in-person",
    address: "123 Medical Parkway, San Francisco, CA",
    distance: "1.2 miles",
    rating: 4.8,
    reviews: 124,
    icon: "hospital"
  },
  {
    id: 2,
    name: "TeleHealth Plus",
    type: "telehealth",
    address: "Virtual Consultation",
    distance: null,
    rating: 4.9,
    reviews: 208,
    icon: "monitor"
  },
  {
    id: 3,
    name: "Community Health Clinic",
    type: "in-person",
    address: "456 Wellness Blvd, San Francisco, CA",
    distance: "2.8 miles",
    rating: 4.6,
    reviews: 86,
    icon: "hospital"
  },
  {
    id: 4,
    name: "Virtual GLP-1 Specialists",
    type: "telehealth",
    address: "Virtual Consultation",
    distance: null,
    rating: 4.7,
    reviews: 152,
    icon: "monitor"
  }
];

const ClinicSelector = ({ onSelect, onNext }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  
  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    if (onSelect) {
      onSelect(clinic);
    }
  };
  
  // Filter clinics based on search and type
  const filteredClinics = sampleClinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         clinic.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || clinic.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  // Calculate pagination
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredClinics.length / itemsPerPage);
  const paginatedClinics = filteredClinics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <ClinicSelectorContainer>
      <Typography variant="h5" gutterBottom>
        Select a Location
      </Typography>
      
      <SearchContainer>
        <SearchIcon>
          <i data-feather="search" />
        </SearchIcon>
        <SearchInput 
          type="text"
          placeholder="Search by clinic name or location"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      
      <TypeSelector>
        <TypeButton 
          selected={selectedType === 'all'}
          onClick={() => handleTypeChange('all')}
        >
          All
        </TypeButton>
        <TypeButton 
          selected={selectedType === 'in-person'}
          onClick={() => handleTypeChange('in-person')}
        >
          In-Person
        </TypeButton>
        <TypeButton 
          selected={selectedType === 'telehealth'}
          onClick={() => handleTypeChange('telehealth')}
        >
          Telehealth
        </TypeButton>
      </TypeSelector>
      
      <ClinicList>
        {paginatedClinics.length > 0 ? (
          paginatedClinics.map(clinic => (
            <ClinicCard 
              key={clinic.id}
              selected={selectedClinic?.id === clinic.id}
              onClick={() => handleClinicSelect(clinic)}
            >
              <ClinicContent>
                <ClinicImage>
                  <i data-feather={clinic.icon} />
                </ClinicImage>
                <ClinicInfo>
                  <Typography variant="h6" gutterBottom>
                    {clinic.name}
                  </Typography>
                  <Typography variant="body2" color="textLight">
                    {clinic.address}
                  </Typography>
                  <ClinicMeta>
                    {clinic.distance && (
                      <MetaItem>
                        <i data-feather="map-pin" />
                        {clinic.distance}
                      </MetaItem>
                    )}
                    <MetaItem>
                      <i data-feather="star" />
                      {clinic.rating} ({clinic.reviews} reviews)
                    </MetaItem>
                  </ClinicMeta>
                </ClinicInfo>
              </ClinicContent>
            </ClinicCard>
          ))
        ) : (
          <Typography variant="body1" color="textLight" align="center" style={{ margin: '40px 0' }}>
            No clinics found matching your search criteria
          </Typography>
        )}
      </ClinicList>
      
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <i data-feather="chevron-left" />
          </PageButton>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PageButton 
              key={page}
              active={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          
          <PageButton 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <i data-feather="chevron-right" />
          </PageButton>
        </PaginationContainer>
      )}
      
      <Button 
        variant="primary" 
        size="full"
        disabled={!selectedClinic}
        onClick={onNext}
        style={{ marginTop: '24px' }}
      >
        Continue
      </Button>
    </ClinicSelectorContainer>
  );
};

export default ClinicSelector;
