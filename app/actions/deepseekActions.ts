'use server';
import { findCompanyNameAndJobAmount, findJobInformation } from '../jkUtilities_and_Tokens/prompts';
import { generateText, generateObject } from 'ai';
import { deepseek } from '../helpers/clients/deeepseekClient';
import { z } from 'zod';

// export interface AIResponse {
//   content: string;
//   error?: string;
// }

export interface DeepSeek_Company_Image_Response {
    company: string;
    company_image: string;
}

export interface Scrape_DeepSeek_JobBoard_Response {
    company: string;
    company_img: string;
    jobs: any[];
}

export async function Utils_DeepSeekJk_Extract_Job_Title_From_Text(text: string) {
  const systemPrompt = 'You will be given text and your job is to give the user what it is asking for from that text. Your response mus be in text with absolutely NO FORMATTING. This is mandatory. Do not change any of the words or meaning, just give the user what they are asking for from the text. Use your absolute best judgement to give the user what they are asking for. A user only needs 1 title. This data will be displayed on a website so its is important you just give the TITLE and NOTHING ELSE.' 
  const userPrompt = 'What is the job title in this text: ' + text

  try {
      const { text } = await generateText({
          model: deepseek('deepseek-chat'),
          messages: [
              {
                  role: "system",
                  content: systemPrompt,
              },
              {
                  role: "user",
                  content: userPrompt
              }
          ],
      });
      return text
  } catch (error) {
      console.error("Error during OpenAI chat:", error);
      throw error;
  }
}

export async function Utils_DeepSeekJk_Extract_Job_Location_From_Text(text: string) {
  const systemPrompt = 'You will be given text and your job is to give the user what it is asking for from that text. Your response mus be in text with absolutely NO FORMATTING. This is mandatory. If there are any duplicate locations, please do ot include duplicates.just give the user what they are asking for from the text. Use your absolute best judgement to give the user what they are asking for. This data will be displayed on a website so its is important you just give the LOCATION and NOTHING ELSE.' 
  const userPrompt = 'What is the job location(s) in this text? If you do not see a location, just return the word "unknown". Here is the text: ' + text

  try {
      const { text } = await generateText({
          model: deepseek('deepseek-chat'),
          messages: [
              {
                  role: "system",
                  content: systemPrompt,
              },
              {
                  role: "user",
                  content: userPrompt
              }
          ],
      });
      return text
  } catch (error) {
      console.error("Error during OpenAI chat:", error);
      throw error;
  }
}

export async function Utils_DeepseekJK_Extract_Company_And_Image(theHtml?: string) {
    
  const systemPrompt = `
  Your job and only job is to analyze html and respond in what ever way the 
  user asks. It could be plain text or json.'


  `
  const userPrompt = `
  You are a function called DeepseekJK_Get_Company_And_Image. 
  I need you to get the company name and the relevant company image 
  on this html page: ${theHtml}. Your response MUST be in json format, no exceptions.
  DO NOT AND I REPEAT DO NOT ADD ANY ADDITIONAL FORMATTING. THIS RESPONSE WILL BE PARSED
  BY JSON.parse IN TYPESCRIPT SO IT IS IMPORTANT THAT YOUR RESPONSE IS ACCURATE 
  IN ORDER TO NOT THROW UNNECESSARY ERRORS.

  Make it look like this:

  {
    "company": "company name",
    "company_img": "company image url"
  }
  `

  console.log('starting...')
  try {
      const { text } = await generateText({
          model: deepseek('deepseek-chat'),
          messages: [
              {
                  role: "system",
                  content: systemPrompt,
              },
              {
                  role: "user",
                  content: userPrompt
              }
          ],
      });
      console.log('finished', text)
      // NOTE Clean any backticks or formatting from the text before parsing
      const cleanedText = text.replace(/`/g, '').trim();
      return JSON.parse(cleanedText) as DeepSeek_Company_Image_Response;
  } catch (error) {
      console.error("Error during OpenAI chat:", error);
      throw error;
  }
}

// NOTE
export async function Scrape_Utils_DeepSeekJk_Entire_Job_Board(theHtml: any) {
    const systemPrompt = `
        You are an AI assistant that extracts job listings from a company job board page. You will be given HTML. 
        Your ONLY task is to return data in **valid JSON format**—NO markdown, no explanations, and no extra formatting.

        <JSON Schema>
        schema: z.object({
            jobs: z.array(z.object({
                id: z.string(),
                title: z.string(),
                location: z.string(),
                company: z.string(),
                company_img: z.string(),
                department: z.string(),
                link: z.string()
            }))
        })
        </JSON Schema>

        - Your response must be valid JSON, nothing else.
        - Do NOT wrap the response in \`\`\`json or any formatting.
        - If data is missing, use an empty string or an empty array.
    `;

    const userPrompt = `Extract job listings from the provided HTML and return **only valid JSON**. Input HTML: ${theHtml}`;

    console.log('starting....first attempt')

    try {
        const { text } = await generateText({
            model: deepseek('deepseek-chat'),
            system: systemPrompt,
            prompt: userPrompt,
            maxTokens: 7500,
            temperature: 0,
            toolChoice: 'none',
        });

        console.log("First Attempt Scrape successful:", text);
        const textLen: number = text.length;
        const cost_per_million: number = 0.14;
        const cost: number = (textLen / 1_000_000) * cost_per_million;
        console.log("Cost in USD:", cost.toFixed(6));
        
        // Clean up response (strip triple backticks and trim whitespace)
        const cleanText = text.replace(/^```json|```$/g, '').trim();
        // Parse JSON
        const object = JSON.parse(cleanText);
        return object as Scrape_DeepSeek_JobBoard_Response;
    } catch (error) {
        console.error("Error during job board scraping:", error);

        if ((error as Error).message?.includes("JSON")) {
            
            console.log('starting....retry attempt')

            try {
                console.log("Retrying JSON extraction...");
                const { text } = await generateText({
                    model: deepseek('deepseek-chat'),
                    system: systemPrompt,
                    prompt: userPrompt + `\nThe previous attempt failed due to this error: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure your response is **pure JSON** without any markdown or formatting.`,
                    maxTokens: 7500,
                    temperature: 0,
                    toolChoice: 'none'
                });

                console.log("RETRY Attempt Scrape successful:", text);
                const textLen: number = text.length;
                const cost_per_million: number = 0.14;
                const cost: number = (textLen / 1_000_000) * cost_per_million;
                console.log("Cost in USD:", cost.toFixed(6));
        
                const cleanText = text.replace(/^```json|```$/g, '').trim();
                const object = JSON.parse(cleanText);

                return object as Scrape_DeepSeek_JobBoard_Response;
            } catch (retryError) {
                console.error("Retry also failed:", retryError);
                throw retryError;
            }
        } else {
            throw error;
        }
    }
}

export async function Scrape_Utils_DeepSeekJk_Specific_Job(theHtml: any) {
    const systemPrompt = `
        You are an AI assistant that extracts job information from a specific job page. You will be given HTML. 
        Your ONLY task is to return data in **valid JSON format**—NO markdown, no explanations, and no extra formatting.

        <JSON Schema>
        schema: z.object({
            job: z.array(z.object({
                id: z.string(),
                title: z.string(),
                location: z.string(),
                company: z.string(),
                company_img: z.string(),
                department: z.string(),
                link: z.string()
            }))
        })
        </JSON Schema>

        - Your response must be valid JSON, nothing else.
        - Do NOT wrap the response in \`\`\`json or any formatting.
        - If data is missing, use an empty string or an empty array.
    `;

    const userPrompt = `
    Extract the job from the provided HTML and return **only valid JSON**.

    Input HTML:
    ${theHtml}
    `;

    console.log('starting....first attempt')

    try {
        const { text } = await generateText({
            model: deepseek('deepseek-chat'),
            system: systemPrompt,
            prompt: userPrompt,
            maxTokens: 7500,
            temperature: 0,
            toolChoice: 'none',
        });

        console.log("First Attempt Scrape successful:", text);
        const textLen: number = text.length;
        const cost_per_million: number = 0.14;
        const cost: number = (textLen / 1_000_000) * cost_per_million;
        console.log("Cost in USD:", cost.toFixed(6));
        
        // Clean up response (strip triple backticks and trim whitespace)
        const cleanText = text.replace(/^```json|```$/g, '').trim();
        // Parse JSON
        const object = JSON.parse(cleanText);
        return object as any;
    } catch (error) {
        console.error("Error during job board scraping:", error);

        if ((error as Error).message?.includes("JSON")) {
            
            console.log('starting....retry attempt')

            try {
                console.log("Retrying JSON extraction...");
                const { text } = await generateText({
                    model: deepseek('deepseek-chat'),
                    system: systemPrompt,
                    prompt: userPrompt + `\nThe previous attempt failed due to this error: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure your response is **pure JSON** without any markdown or formatting.`,
                    maxTokens: 7500,
                    temperature: 0,
                    toolChoice: 'none'
                });

                console.log("RETRY Attempt Scrape successful:", text);
                const textLen: number = text.length;
                const cost_per_million: number = 0.14;
                const cost: number = (textLen / 1_000_000) * cost_per_million;
                console.log("Cost in USD:", cost.toFixed(6));
        
                const cleanText = text.replace(/^```json|```$/g, '').trim();
                const object = JSON.parse(cleanText);

                return object as any;
            } catch (retryError) {
                console.error("Retry also failed:", retryError);
                throw retryError;
            }
        } else {
            throw error;
        }
    }
}

export async function DeepseekJK_Get_Company_And_Job_Count() {}