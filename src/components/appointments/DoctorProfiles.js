import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Avatar from '../shared/Avatar';

const DoctorProfilesContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.xs};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundDark};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;

const FilterChip = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => 
    props.selected 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.selected 
      ? 'white' 
      : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.pill};
  white-space: nowrap;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.selected 
        ? props.theme.colors.primary 
        : props.theme.colors.primaryLighter};
  }
`;

const DoctorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const DoctorCard = styled(Card)`
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

const DoctorCardContent = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: flex-start;
`;

const DoctorInfo = styled.div`
  flex: 1;
`;

const SpecialtyTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SpecialtyTag = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.caption.fontSize};
`;

const DoctorMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const DoctorCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.backgroundDark};
`;

const NextAvailable = styled.div`
  font-size: ${props => props.theme.typography.caption.fontSize};
  color: ${props => props.theme.colors.textLight};
`;

const ViewProfileButton = styled(Button)`
  min-width: auto;
`;

const DoctorDetailModal = styled.div`
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
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const DetailBody = styled.div``;

const DetailSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const EducationItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

// Sample specialties for filters
const specialties = [
  "All Providers", "Endocrinology", "Bariatrics", "Nutrition", "Primary Care"
];

// Sample doctors data
const sampleDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "MD, Endocrinologist",
    specialty: ["Endocrinology", "Weight Management"],
    experience: "12 years",
    rating: 4.9,
    reviews: 123,
    nextAvailable: "Tomorrow, Jul 15",
    image: null,
    bio: "Dr. Johnson specializes in metabolic disorders and obesity medicine. She has extensive experience with GLP-1 therapies and helps patients achieve sustainable weight loss.",
    education: [
      { degree: "MD", institution: "Stanford University School of Medicine", year: "2008" },
      { degree: "Residency", institution: "UCSF Medical Center", year: "2011" },
      { degree: "Fellowship", institution: "Mayo Clinic", year: "2013" }
    ]
  },
  {
    id: 2,
    name: "Dr. Michael Clark",
    title: "MD, Bariatric Specialist",
    specialty: ["Bariatrics", "Weight Management"],
    experience: "15 years",
    rating: 4.8,
    reviews: 98,
    nextAvailable: "Thursday, Jul 17",
    image: null,
    bio: "Dr. Clark is a board-certified bariatric specialist with a focus on comprehensive weight management approaches. He combines medication therapy with lifestyle modifications.",
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: "2005" },
      { degree: "Residency", institution: "Massachusetts General Hospital", year: "2009" },
      { degree: "Fellowship", institution: "Cleveland Clinic", year: "2011" }
    ]
  },
  {
    id: 3,
    name: "Lisa Martinez",
    title: "RD, Nutritionist",
    specialty: ["Nutrition", "Diabetes Management"],
    experience: "8 years",
    rating: 4.7,
    reviews: 76,
    nextAvailable: "Today",
    image: null,
    bio: "Lisa is a registered dietitian specializing in medical nutrition therapy for obesity and diabetes. She works closely with patients on GLP-1 medications to optimize their diet.",
    education: [
      { degree: "BS Nutritional Science", institution: "Cornell University", year: "2012" },
      { degree: "Registered Dietitian", institution: "Academy of Nutrition and Dietetics", year: "2014" }
    ]
  }
];

const DoctorProfiles = ({ onSelect, onNext, selectedClinic }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Providers");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [detailDoctor, setDetailDoctor] = useState(null);
  
  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
  };
  
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    if (onSelect) {
      onSelect(doctor);
    }
  };
  
  const handleViewProfile = (doctor, e) => {
    e.stopPropagation();
    setDetailDoctor(doctor);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  // Filter doctors based on selected specialty
  const filteredDoctors = selectedSpecialty === "All Providers"
    ? sampleDoctors
    : sampleDoctors.filter(doctor => 
        doctor.specialty.includes(selectedSpecialty)
      );
  
  return (
    <DoctorProfilesContainer>
      <Typography variant="h5" gutterBottom>
        Select a Provider
      </Typography>
      
      {selectedClinic && (
        <Typography variant="body2" color="textLight" gutterBottom>
          at {selectedClinic.name}
        </Typography>
      )}
      
      <FiltersContainer>
        {specialties.map(specialty => (
          <FilterChip 
            key={specialty}
            selected={selectedSpecialty === specialty}
            onClick={() => handleSpecialtySelect(specialty)}
          >
            {specialty}
          </FilterChip>
        ))}
      </FiltersContainer>
      
      <DoctorList>
        {filteredDoctors.map(doctor => (
          <DoctorCard 
            key={doctor.id}
            selected={selectedDoctor?.id === doctor.id}
            onClick={() => handleDoctorSelect(doctor)}
          >
            <DoctorCardContent>
              <Avatar
                size="lg"
                name={doctor.name}
                bgColor="#4A90E2"
              />
              <DoctorInfo>
                <Typography variant="h6" gutterBottom>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="textLight">
                  {doctor.title}
                </Typography>
                
                <SpecialtyTags>
                  {doctor.specialty.map((spec, index) => (
                    <SpecialtyTag key={index}>
                      {spec}
                    </SpecialtyTag>
                  ))}
                </SpecialtyTags>
                
                <DoctorMeta>
                  <MetaItem>
                    <i data-feather="briefcase" />
                    {doctor.experience} experience
                  </MetaItem>
                  <MetaItem>
                    <i data-feather="star" />
                    {doctor.rating} ({doctor.reviews} reviews)
                  </MetaItem>
                </DoctorMeta>
              </DoctorInfo>
            </DoctorCardContent>
            
            <DoctorCardFooter>
              <NextAvailable>
                Next available: <strong>{doctor.nextAvailable}</strong>
              </NextAvailable>
              <ViewProfileButton 
                variant="text" 
                size="small"
                onClick={(e) => handleViewProfile(doctor, e)}
              >
                View Profile
              </ViewProfileButton>
            </DoctorCardFooter>
          </DoctorCard>
        ))}
      </DoctorList>
      
      <Button 
        variant="primary" 
        size="full"
        disabled={!selectedDoctor}
        onClick={onNext}
        style={{ marginTop: '24px' }}
      >
        Continue
      </Button>
      
      {showModal && detailDoctor && (
        <DoctorDetailModal onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <i data-feather="x" />
            </CloseButton>
            
            <DetailHeader>
              <Avatar
                size="xl"
                name={detailDoctor.name}
                bgColor="#4A90E2"
                style={{ marginBottom: '16px' }}
              />
              <Typography variant="h4" gutterBottom>
                {detailDoctor.name}
              </Typography>
              <Typography variant="body1" color="textLight" gutterBottom>
                {detailDoctor.title}
              </Typography>
              <SpecialtyTags>
                {detailDoctor.specialty.map((spec, index) => (
                  <SpecialtyTag key={index}>
                    {spec}
                  </SpecialtyTag>
                ))}
              </SpecialtyTags>
            </DetailHeader>
            
            <DetailBody>
              <DetailSection>
                <Typography variant="h6" gutterBottom>
                  About
                </Typography>
                <Typography variant="body1">
                  {detailDoctor.bio}
                </Typography>
              </DetailSection>
              
              <DetailSection>
                <Typography variant="h6" gutterBottom>
                  Education & Training
                </Typography>
                {detailDoctor.education.map((edu, index) => (
                  <EducationItem key={index}>
                    <Typography variant="body1" gutterBottom>
                      {edu.degree}
                    </Typography>
                    <Typography variant="body2" color="textLight">
                      {edu.institution}, {edu.year}
                    </Typography>
                  </EducationItem>
                ))}
              </DetailSection>
              
              <Button 
                variant="primary" 
                size="full"
                onClick={() => {
                  handleDoctorSelect(detailDoctor);
                  closeModal();
                }}
              >
                Select Provider
              </Button>
            </DetailBody>
          </ModalContent>
        </DoctorDetailModal>
      )}
    </DoctorProfilesContainer>
  );
};

export default DoctorProfiles;
