import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';
import Typography from '../shared/Typography';

const VoiceInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const VoiceControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const RecordButton = styled(Button)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 0;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  &:hover {
    transform: scale(1.05);
  }
  
  ${props => props.isRecording && `
    background: ${props.theme.colors.error};
    animation: pulse 1.5s infinite;
    
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(244, 67, 54, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
      }
    }
  `}
`;

const TranscriptionContainer = styled.div`
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  width: 100%;
  min-height: 80px;
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  ${props => props.active && `
    border: 1px solid ${props.theme.colors.primary};
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};
`;

const VoiceInput = ({ onVoiceInput }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  
  // Initialize speech recognition
  useEffect(() => {
    // Check if the browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);
  
  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsRecording(true);
    }
  };
  
  const handleSend = () => {
    if (transcript.trim()) {
      onVoiceInput(transcript);
      setTranscript('');
    }
  };
  
  const clearTranscript = () => {
    setTranscript('');
  };
  
  return (
    <VoiceInputContainer>
      <TranscriptionContainer active={isRecording}>
        {transcript ? (
          <Typography variant="body1">{transcript}</Typography>
        ) : (
          <Typography variant="body2" color="textLight">
            {isRecording ? 'Listening...' : 'Press the microphone to start speaking'}
          </Typography>
        )}
      </TranscriptionContainer>
      
      <VoiceControlsContainer>
        <RecordButton
          variant={isRecording ? "error" : "primary"}
          iconOnly
          isRecording={isRecording}
          icon={<i data-feather={isRecording ? "square" : "mic"} />}
          onClick={toggleRecording}
        />
      </VoiceControlsContainer>
      
      <ButtonGroup>
        <Button 
          variant="outlined" 
          disabled={!transcript.trim()}
          onClick={clearTranscript}
        >
          Clear
        </Button>
        <Button 
          variant="primary" 
          disabled={!transcript.trim()}
          onClick={handleSend}
          icon={<i data-feather="send" />}
        >
          Send
        </Button>
      </ButtonGroup>
    </VoiceInputContainer>
  );
};

export default VoiceInput;
