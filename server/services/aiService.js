// services/aiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiService = {
  async generateResponse(userMessage, conversationContext = '') {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `You are a helpful support assistant for Taakra, a competition platform. 
      Context: ${conversationContext}
      User message: ${userMessage}
      
      Provide a helpful, friendly response. Keep it concise (under 500 characters).`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm having trouble processing your request. Please try again or contact support.";
    }
  },

  async suggestCompetitions(userPreferences) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Based on these user preferences: ${JSON.stringify(userPreferences)}, 
      suggest 3-5 competition types that would interest them. 
      Format: Return a JSON array with fields: name, description, category.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      return [];
    }
  },

  async answerFAQ(question) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `You are a FAQ assistant for Taakra competition platform. 
      Answer this question concisely: ${question}
      If it's not related to competitions or the platform, politely redirect them.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('FAQ Error:', error);
      return 'Sorry, I cannot answer that question. Please contact support for help.';
    }
  },

  async escalateToHuman(chatId, context) {
    try {
      // Mark as escalated in DB - implement in controller
      console.log(`Chat ${chatId} escalated for human support`);
      return {
        success: true,
        message: 'Your chat has been escalated to our support team. You will be assisted shortly.',
      };
    } catch (error) {
      console.error('Escalation Error:', error);
      throw error;
    }
  },

  async generateCompetitionTitle(category, keywords) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Generate a creative competition title for ${category} category with keywords: ${keywords.join(', ')}. 
      Return only the title, nothing else.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Title Generation Error:', error);
      return 'Competition Title';
    }
  },
};

module.exports = aiService;
