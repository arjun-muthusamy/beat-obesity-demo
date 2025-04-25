import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';
import Typography from '../shared/Typography';

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const SlideWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
  transform: translateX(-${props => props.$activeIndex * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const ImageContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => 
    props.$active 
    ? props.theme.colors.primary 
    : props.theme.colors.primaryLighter};
  margin: 0 ${props => props.theme.spacing.xs};
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.$active && `
    width: 20px;
    border-radius: 4px;
  `}
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
  width: 100%;
`;

const OnboardingCarousel = ({ slides, onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideWrapperRef = useRef(null);
  
  const isLastSlide = activeIndex === slides.length - 1;
  
  const handleNext = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setActiveIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };
  
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  
  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      if (activeIndex < slides.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    }
    
    if (touchEnd - touchStart > 75) {
      // Swipe right
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  };
  
  // Load Feather icons after component mounts and when active index changes
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [activeIndex]);
  
  return (
    <CarouselContainer>
      <SlideContainer>
        <SlideWrapper 
          $activeIndex={activeIndex} 
          ref={slideWrapperRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <Slide key={index}>
              <ImageContainer>
                {slide.icon ? (
                  <i data-feather={slide.icon} stroke-width="1" />
                ) : (
                  slide.image
                )}
              </ImageContainer>
              <Typography variant="h3" gutterBottom>
                {slide.title}
              </Typography>
              <Typography variant="body1" color="textLight">
                {slide.description}
              </Typography>
            </Slide>
          ))}
        </SlideWrapper>
      </SlideContainer>
      
      <DotsContainer>
        {slides.map((_, index) => (
          <Dot 
            key={index} 
            $active={activeIndex === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
      
      <ActionContainer>
        {activeIndex > 0 ? (
          <Button 
            variant="text" 
            onClick={handlePrev}
            icon={<i data-feather="chevron-left" />}
            iconPosition="left"
          >
            Back
          </Button>
        ) : <div></div>}
        
        <Button 
          variant="primary" 
          onClick={handleNext}
          icon={isLastSlide ? <i data-feather="check" /> : <i data-feather="chevron-right" />}
          iconPosition="right"
        >
          {isLastSlide ? 'Get Started' : 'Next'}
        </Button>
      </ActionContainer>
    </CarouselContainer>
  );
};

export default OnboardingCarousel;
