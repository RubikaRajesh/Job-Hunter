const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateDescription = async (req, res) => {
  try {
    const { title, responsibilities, requirements } = req.body;
    const prompt = `Write a professional job description for a ${title} position. Responsibilities: ${responsibilities.join(', ')}. Requirements: ${requirements.join(', ')}. Include details about company culture, benefits, and application process.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // you can also use 'gpt-4' if available
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ data: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('OpenAI Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to generate description. Check your API key or try again later.' });
  }
};

module.exports = { generateDescription };