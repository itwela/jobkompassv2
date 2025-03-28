'use server';
import { findCompanyNameAndJobAmount, findJobInformation } from '../jkUtilities_and_Tokens/prompts';
import { generateText, generateObject } from 'ai';
import { deepseek } from '../helpers/clients/deeepseekClient';
import { z } from 'zod';
import { quickAddJob } from './databaseActions';

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


// ------

export async function GenFullResume_DeepSeekJk(resumeData: any, jobdata: any, moreContext?: string, bio?: string) {

    const systemPrompt = `
        You are a professional resume optimization expert. Your task is to create an exceptional, highly targeted resume that will maximize the candidate's chances of landing their desired position. Follow these critical guidelines:

        1. ANALYSIS & OPTIMIZATION
        - Thoroughly analyze both the job requirements and candidate's background
        - Identify and highlight key transferable skills and relevant experiences
        - Optimize keywords and phrases to pass ATS (Applicant Tracking Systems)
        - Quantify achievements wherever possible with metrics and specific outcomes
        - Use the keywords from the job you are provided to optimize the users resume.

        2. TAILORING & POSITIONING
        - Strategically align the candidate's experience with job requirements
        - Emphasize experiences and skills that directly match the role
        - Incorporate industry-specific terminology and buzzwords
        - Demonstrate clear progression and growth in relevant areas

        3. COMPANY & CULTURE FIT
        - Mirror the company's communication style and terminology
        - Highlight experiences that align with the company's mission
        - Demonstrate understanding of industry challenges and trends

        4. FORMAT & PRESENTATION
        - Prioritize most relevant information at the top
        - Ensure consistent style and terminology throughout
        - Create compelling achievement statements using the STAR method:
          (Situation, Task, Action, Result)

        OUTPUT QUALITY EXPECTATIONS:
        - Professional, ATS-optimized resume word choices
        - Strategic positioning of candidate's experience
        - Quantified achievements and results
        - Clear alignment with job requirements
        - Compelling narrative that showcases candidate's value proposition.

        DESCRIPTIONS OF PROJECTS, EXPERIENCE, ETC:
        ALL DESCRIPTIONS of projects, experiences, and achievements should be structured using the STAR method:
        STAR is Situation, Task, Action, Result.
        - Use STAR method for achievement statements
        - Use STAR method for project details
        - Use STAR method for experience details.

        Remember: Every word must serve a purpose. Focus on impact, relevance, and strategic positioning to make the candidate stand out as the ideal choice for this role.

        You will be given the users current resume and the job that they are looking to apply to. 
        The job information will have keywords and basic description as to what the company is looking for.
        These things should provide you more context to craft a high-quality, 15 out of 10 resume.

        Your job is not too simply return their data back, but to make it better make every sentence better reword it in a way that clearly translates to employers value.
        The person giving you their data or résumé is not an expert you are, So you need to be the one tailoring what they're giving you and turning it into something amazing.
    `;

    let userPrompt = ''

    if (moreContext && moreContext?.length > 5) {
        userPrompt = `
        
        Here is my resume:
        ${resumeData}

        Here is the job that I want to apply to:
        ${jobdata}

        Here is some more context to help you craft my resume:
        ${moreContext}
        `;
    } 

    if (!moreContext || moreContext?.length < 5) {
        
        userPrompt = `
        Here is my resume:
        ${resumeData}
        Here is the job that I want to apply to:
        ${jobdata}
        `;

    }

    if (!!resumeData) {
        userPrompt = `

        I don't have a resume yet. but here is some ore context about me:
        ${moreContext}
        ${bio}

        Here is the job that I want to apply to:
        ${jobdata}

        `
    }

    console.log('starting....first attempt')

    // console.log(userPrompt)

    try {
        const result = await generateObject({
            model: deepseek('deepseek-chat'),
            system: systemPrompt,
            prompt: userPrompt,
            maxTokens: 7500,
            temperature: 0,
            schema: z.object({
                education: z.array(z.object({
                name: z.string(),
                school: z.string(),
                startDate: z.string(),
                endDate: z.string(),
                degree: z.string(),
                field: z.string(),
                date: z.string(),
                details: z.array(z.string()),
                description: z.string(),
                technologies: z.array(z.string())
                })),
                experience: z.array(z.object({
                title: z.string(),
                company: z.string(),
                location: z.string(),
                date: z.string(),
                description: z.string(),
                details: z.array(z.string())
                })),
                projects: z.array(z.object({
                name: z.string(),
                achievement: z.string(),
                description: z.string(),
                link: z.string(),
                technologies: z.array(z.string()),
                date: z.string(),
                details: z.array(z.string())
                })),
                skills: z.object({
                technical: z.array(z.string()),
                additional: z.array(z.string())
                }),
                additionalInfo: z.object({
                interests: z.array(z.string()),
                hobbies: z.array(z.string()),
                languages: z.array(z.string()),
                references: z.array(z.string())
                })
            })
        });

        const resObject = result?.object;
        const resToJson = result?.toJsonResponse;
        console.log('dstojson', resToJson)
        console.log('dstojson', resObject)
        return resObject;

    } catch (error) {
        console.error("Error during job board scraping:", error);
    }
}

export async function GenFullJkJob_DeepSeekJk(url: string, userId: any, text: string) {

    const systemPrompt = `Extract the following information from this text **accurately and completely**:

                1. **Title**: The most specific job title mentioned in the text. Ensure this is the **exact** title as listed, avoiding generic roles if a more specific one is given.

                2. **Company**: The employer hiring for this role. Avoid recruiters or parent companies unless explicitly stated as the hiring entity.

                3. **Keywords**: Exactly three **highly relevant** industry-specific keywords that best describe this position:
                  - Must be **directly related** to the job’s core responsibilities.
                  - **Avoid generic terms** like "Technology" or "Engineering."
                  - If no strong keywords are found, return an empty string "".

                4. **Skills**: Extract key **technical and professional skills** required for this role, including:
                  - **Programming languages, frameworks, tools** (e.g., React, Python, SQL, AWS).
                  - **Industry-specific knowledge or certifications** (e.g., FAA Regulations for aviation roles).
                  - If no skills are listed, return an empty string "".

                5. **Description**: Provide a **concise but highly informative** summary of the job description:
                  - **DO NOT oversimplify or remove important context**—use as much of the job description as necessary while keeping it **concise and structured**.
                  - Extract and **highlight key responsibilities** of the role.
                  - Clearly identify what the job is looking for in an ideal candidate.
                  - If salary, benefits, or work arrangements (remote/hybrid/on-site) are mentioned, **include them in the summary**.
                  - **Avoid marketing fluff** like "Join our exciting team!"—focus only on the actual role and its requirements.

                **IMPORTANT NOTES**:
                - Ensure **precision** in extracted details.
                - **Do not skip** any important job-specific information.
                - If the page contains unrelated content, focus only on the **actual job**. 
            `;

    const userPrompt = `Here is the text of the job page that I want to apply to:
    ${text}
    `

    console.log('starting....first attempt')

    // console.log(userPrompt)

    try {
        const result = await generateObject({
            model: deepseek('deepseek-chat'),
            system: systemPrompt,
            prompt: userPrompt,
            maxTokens: 7500,
            temperature: 0,
            schema: z.object({
                "Title": z.string(),
                "Company": z.string(),
                "Keywords": z.array(z.string()),
                "Skills": z.array(z.string()),
                "Description": z.string(),
              }),
        });

        const currentDate = new Date().toISOString().split('T')[0];
        const resObject = result?.object;
        const resToJson = result?.toJsonResponse;
        const combinedObject = {
            ...resObject,
            "Status": "Interested",
            "user_id": userId,
            "Date Applied": currentDate,
            "Link": url,
            "Easy apply": "No",
            "Interviewed": false,
            "Resume used": "",
            "Cover letter used": "",
        };
        console.log('dstojson', resToJson)
        console.log('dstojson', combinedObject)

        const add = await quickAddJob({job: combinedObject})

        return {
          status: "success",
        }


    } catch (error) {
        console.error("Error during job board scraping:", error);
        return {
            status: "error",
        }
    }
}

//  -----


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