'use server';

import { deepseek } from "@/app/helpers/clients/deeepseekClient";
import { generateText } from 'ai';
import { streamText } from 'ai';


export const aiFieldGenerator = async (messages: any, context: any) => {
  try {

    const result = await streamText({
      model: deepseek('deepseek-chat'),
      system: `You are an AI assistant specializing in resume writing and career advice.
              You have access to the user's resume data and current job information.
              Use this context to provide personalized advice and suggestions.
              Current resume: ${JSON.stringify(context?.resume || {})}
              Current job being applied for: ${JSON.stringify(context?.currentJob || {})}
              Field being edited: ${context?.field || 'general'}
      `,
      messages,
      maxTokens: 5000,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error("Error in aiFieldGenerator:", error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate content. Please try again.' }),
      { status: 500 }
    );
  }
};