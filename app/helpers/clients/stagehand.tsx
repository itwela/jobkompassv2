'use server'

import { Page, BrowserContext, Stagehand } from "@browserbasehq/stagehand";
import StagehandConfig from "@/stagehand.config";
import { z } from "zod";
import OpenAI from 'openai'
import { deepseek } from "./deeepseekClient";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { AISdkClient } from "./aisdkClient";
import { quickAddJob } from "@/app/actions/databaseActions";
import { Description } from "@radix-ui/react-dialog";
// import { JobKompassSdkClient } from "./jobKompassSdkClient";
// import { ollama } from "./jobKompassDeepseekClient";
    // SECTION -----------------------------------------------
      // NOTE STAGEHAND 
      export async function getJobInformationStagehand(url: string, userId: any) {
        
        console.log(url, userId)

        const stagehand = new Stagehand({
          ...StagehandConfig,
          llmClient: new AISdkClient({
            model: deepseek('deepseek-chat')
            // model: ollama('deepseek-r1:7b')
          }),
        });
        await stagehand.init();
      
        if (StagehandConfig.env === "BROWSERBASE" && stagehand.browserbaseSessionID) {
          console.log(
            `View this session live in your browser: https://browserbase.com/sessions/${stagehand.browserbaseSessionID}`
          );
        }
      
        const { page, context } = stagehand;
        async function jobInfo({page, context, stagehand, url}: { page: Page; context: BrowserContext; stagehand: Stagehand; url: string}) {
  
/*  ------------------------------------------------------------------------
          // NOTE - THIS IS THE QUICK ADD FEATURE BEHIND TH SCENES.
------------------------------------------------------------------------ */ 



// ------------------------------------------------------------------------
// TODO First, Go to the url provided.
            
          await page.goto(url);
// ------------------------------------------------------------------------ 

          await page.waitForLoadState('networkidle', { timeout: 20000 }); // Adjust timeout as needed
// ------------------------------------------------------------------------
// TODO Second, I want to get the Job Title and the Company Hiring for this position.

          // Extract all job information in one call
          let jobInfo;
          try {
            jobInfo = await page.extract({
              instruction: `Extract the following information from this job posting:
                  1. The most specific job title shown in the posting.
                  2. The Company / Employer hiring for the role. Do not over complicate this and make sure the Company you think is hiring makes sense.
                  3. Exactly three **highly relevant** keywords that best describe this position. These should be:
                    - Specific to the role or industry (e.g., "Machine Learning," "Full Stack Development," "Product Management").
                    - NOT generic terms like "Technology" or "Innovation."
                    - If no strong keywords are found, return an empty string "".
                  4. Key **technical or professional skills** required for this role. This may include:
                    - Programming languages, software, or frameworks (e.g., Python, React, SQL).
                    - Industry-specific knowledge or certifications (e.g., FAA Regulations for aviation roles).
                    - If no skills are listed, return an empty string "".
                  5. A concise, informative job description (max 2 sentences). This should:
                    - Summarize the key responsibilities and purpose of the role.
                    - Avoid unnecessary fluff like "How you'll help us Keep Climbing."
                    - If a clear description is not available, generate one based on the job title and responsibilities.

                  Also,

                  Determine if this is an "Easy Apply" job by checking:
                  - Presence of application form fields (name, email, resume, etc.).
                  - Presence of a submit/apply button.

                  Answer with Yes ONLY if both conditions are met, otherwise No.

                Your returned answer should LITERALLY only be the word Yes or No depending on these parameters. You must put one or the other no exceptions        
              `,
              useTextExtract: true,
              schema: z.object({
                "Title": z.string(),
                "Company": z.string(),
                "Keywords": z.array(z.string()),
                "Skills": z.array(z.string()),
                "Description": z.string(),
                "Easy apply": z.string(),
              }),
            });
          } catch (error) {
            console.error("Failed to extract job information:", error);
            throw new Error("Job information extraction failed");
          }

          // 5. Check Easy Apply Status
          // let deepseek_easy_apply;
          // try {
          //   const [{ selector: form, description: easy_apply }] = await page.observe({
          //     instruction: `You are on a job application page. Determine if this is an "Easy Apply" job by checking:
          //       - Presence of application form fields (name, email, resume, etc.)
          //       - Presence of a submit/apply button
          //       Answer with Yes ONLY if both conditions are met, otherwise No.
          //       Your returned answer should LITERALLY only be the word Yes or No depending on these parameters.
          //       `
          //   });
          //   deepseek_easy_apply = easy_apply;
          // } catch (error) {
          //   console.error("Failed to check easy apply status:", error);
          //   throw new Error("Easy apply status check failed");
          // }

          // Combine all results
          const getStarterJobInfo = {
            Title: jobInfo.Title,
            Company: jobInfo.Company,
            Keywords: jobInfo.Keywords,
            Skills: jobInfo.Skills,
            Description: jobInfo.Description,
            "Easy apply": jobInfo["Easy apply"],
          };
 // ------------------------------------------------------------------------ 



// ------------------------------------------------------------------------
// TODO Finally, I want to add this data and just more information to my database so we can start tracking jobs.
  
          const currentDate = new Date().toISOString().split('T')[0];
          const resultingObject = {
            "Company": getStarterJobInfo["Company"],
            "Status": "Interested",
            "Link": url,
            "Keywords": getStarterJobInfo["Keywords"],
            "Interviewed": false,
            "user_id": userId,
            "Title": getStarterJobInfo["Title"],
            "Date Applied": currentDate,
            "Resume used": "",
            "Cover letter used": "",
            "Description": getStarterJobInfo.Description,
            "Skills": getStarterJobInfo["Skills"],
            "Easy apply": getStarterJobInfo["Easy apply"],
          }

          const add = await quickAddJob({job: resultingObject})

          return {
            status: "success",
          }
 // ------------------------------------------------------------------------ 
 
        }
        const results = await jobInfo({ page, context, stagehand, url });
        await stagehand.close();
        console.log("Resulting Object Server", results)
        return results;
      }
      
      
// END --------------------------------------------------------
