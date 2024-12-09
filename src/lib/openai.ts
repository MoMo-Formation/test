import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askQuestion(question: string, courseTitle: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert instructor for the course "${courseTitle}". Only answer questions related to this specific course and its content. If a question is not related to the course, politely explain that you can only answer course-related questions.`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "Désolé, une erreur s'est produite lors de la génération de la réponse.";
  }
}