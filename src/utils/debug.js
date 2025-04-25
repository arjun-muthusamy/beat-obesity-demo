// Debug utility script for BeatObesity app
console.log('Debug module loaded');

// Log navigation information
window.addEventListener('popstate', () => {
  console.log('Navigation detected:', window.location.pathname);
});

// Track onboarding state changes in localStorage
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  console.log('localStorage.setItem', key, value);
  originalSetItem.call(this, key, value);
  
  // When app state is updated, log the onboarding status
  if (key === 'beatObesityAppState') {
    try {
      const state = JSON.parse(value);
      console.log('App state updated:', {
        isOnboarded: state.isOnboarded,
        selectedAvatar: state.selectedAvatar ? state.selectedAvatar.name : null,
        healthGoals: state.healthGoals ? state.healthGoals.length : 0
      });
    } catch (error) {
      console.error('Error parsing app state:', error);
    }
  }
};

// Log all React Router navigation events
const originalPushState = history.pushState;
history.pushState = function(state, title, url) {
  console.log('Navigation: pushState to', url);
  return originalPushState.apply(this, arguments);
};

// Add an error boundary to catch and log React errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

console.log('Debug module initialization complete');