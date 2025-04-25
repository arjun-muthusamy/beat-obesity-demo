/**
 * Utility functions for interacting with the Perplexity API
 */

/**
 * Sends a message to the Perplexity API and returns the response
 * @param {string} message - The user's message
 * @param {Array} previousMessages - Array of previous message objects in the chat
 * @returns {Promise} - Promise that resolves to the API response
 */
export const sendChatMessage = async (message, previousMessages = []) => {
  // Check if we have the API key 
  // First try from app context if available, then fallback to env variable
  let apiKey = null;
  
  // Get API key from global state if available
  if (window.beatObesityState && window.beatObesityState.apiKeys && window.beatObesityState.apiKeys.perplexity) {
    apiKey = window.beatObesityState.apiKeys.perplexity;
  } else {
    // Fallback to environment variable
    apiKey = process.env.REACT_APP_PERPLEXITY_API_KEY;
  }
  
  if (!apiKey) {
    console.warn('Perplexity API key not found. Using simulated responses.');
    return simulateResponse(message);
  }
  
  try {
    // Format previous messages for the Perplexity API
    const formattedMessages = formatMessagesForAPI(previousMessages);
    
    // Add the system message
    const messages = [
      {
        role: "system",
        content: "You are a supportive AI companion for the BeatObesity app. Provide helpful, evidence-based guidance for weight loss and GLP-1 medication management. Be empathetic and motivational. Keep responses focused on weight management, health, and wellness. Avoid discussing unrelated topics. The user is currently on a GLP-1 medication to aid their weight loss journey."
      },
      ...formattedMessages,
      {
        role: "user",
        content: message
      }
    ];
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages,
        temperature: 0.7,
        max_tokens: 300,
        search_domain_filter: ["pubmed.ncbi.nlm.nih.gov", "mayoclinic.org", "health.harvard.edu"],
        return_related_questions: true
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      suggestions: extractSuggestions(data)
    };
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    return simulateResponse(message);
  }
};

/**
 * Format previous messages in the format expected by the Perplexity API
 * @param {Array} messages - Array of message objects from the chat interface
 * @returns {Array} - Formatted messages for the API
 */
const formatMessagesForAPI = (messages) => {
  return messages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));
};

/**
 * Extract related questions from the API response as suggestions
 * @param {Object} apiResponse - The response from the Perplexity API
 * @returns {Array} - Array of suggestion strings
 */
const extractSuggestions = (apiResponse) => {
  // If we have related questions in the response, use those
  if (apiResponse.related_questions && apiResponse.related_questions.length > 0) {
    return apiResponse.related_questions.slice(0, 3);
  }
  
  // Otherwise, generate default suggestions based on the content
  return generateDefaultSuggestions();
};

/**
 * Generate default follow-up suggestions
 * @returns {Array} - Array of suggestion strings
 */
const generateDefaultSuggestions = () => {
  const defaultSuggestions = [
    "How can I manage medication side effects?",
    "What foods should I eat on GLP-1?",
    "How much exercise is recommended?",
    "When will I see results?",
    "What's a healthy weight loss rate?",
    "How do I track my progress?"
  ];
  
  // Return 3 random suggestions
  return defaultSuggestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
};

/**
 * Simulate an API response for testing or when API key is missing
 * @param {string} message - The user's message
 * @returns {Object} - Simulated response object
 */
const simulateResponse = (message) => {
  const lowercaseMsg = message.toLowerCase();
  let content = '';
  
  // Simple keyword matching for testing
  if (lowercaseMsg.includes('weight') || lowercaseMsg.includes('loss')) {
    content = "Healthy weight loss is typically 1-2 pounds per week. With GLP-1 medications, some users see more rapid results in the first few months. Remember that consistency is key, and it's important to focus on sustainable lifestyle changes alongside your medication.";
  } else if (lowercaseMsg.includes('food') || lowercaseMsg.includes('eat') || lowercaseMsg.includes('diet') || lowercaseMsg.includes('meal')) {
    content = "On GLP-1 medications, focus on nutrient-dense, high-protein foods like lean meats, fish, eggs, tofu, and legumes. Include plenty of vegetables for fiber and nutrients. Since the medication may reduce your appetite, make every calorie count with nutritious choices. Stay hydrated and consider smaller, more frequent meals if you feel full quickly.";
  } else if (lowercaseMsg.includes('exercise') || lowercaseMsg.includes('workout')) {
    content = "Start with 150 minutes of moderate activity per week (about 30 minutes, 5 days a week). Include both cardio and strength training for best results. Even light activity like walking can be beneficial. Remember to start gradually and increase intensity as your fitness improves.";
  } else if (lowercaseMsg.includes('side effect') || lowercaseMsg.includes('nausea')) {
    content = "Common side effects of GLP-1 medications include nausea, vomiting, diarrhea, and constipation. These often improve over time as your body adjusts. Stay hydrated, eat smaller meals, and avoid fatty foods to help manage nausea. Contact your healthcare provider if side effects are severe or persistent.";
  } else {
    content = "I'm here to support your weight loss journey with GLP-1 medication. I can help with questions about diet, exercise, medication management, and tracking your progress. What specific aspect of your health journey would you like guidance on today?";
  }
  
  return {
    content,
    suggestions: generateDefaultSuggestions()
  };
};