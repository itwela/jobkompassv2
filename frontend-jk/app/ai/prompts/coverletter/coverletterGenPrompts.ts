import { replicate } from "@/frontend-jk/app/helpers/clients/replicateClient";


const aiExperienceGenerator = async () => {
    try {
      const input = {
        prompt: `
        {system_prompt}
        ${markdownScriptEnhancerPrompt}
        {system_prompt}

        |begin_of_text|
        ${newGuideContent}
        `,
        
        max_new_tokens: 10000,
        prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"
      };

      const output = await replicate.run("meta/meta-llama-3-8b-instruct", { input });

      if (Array.isArray(output)) {
        const formattedOutput = output
          .join('')
          .trim()
          // Keep markdown characters and basic text formatting
          .replace(/[^a-zA-Z0-9\s.,!?#*\-_\[\]()]/g, '')
          // Normalize spaces while preserving markdown line breaks
          .replace(/[ \t]+/g, ' ')
          // Ensure proper spacing after punctuation
          .replace(/([.,!?])(\w)/g, '$1 $2')
          // Preserve markdown headers
          .replace(/#+\s*/g, match => match);

        console.log("replicate works!", formattedOutput);
        setNewGuideContent(formattedOutput);
        return formattedOutput;

      } else {
        const cleanOutput = String(output)
          .replace(/[^a-zA-Z0-9\s.,!?#*\-_\[\]()]/g, '')
          .replace(/[ \t]+/g, ' ')
          .replace(/([.,!?])(\w)/g, '$1 $2')
          .replace(/#+\s*/g, match => match);

        console.log("replicate works!", cleanOutput);
        setNewGuideContent(cleanOutput);
        return cleanOutput;

      }
    } catch (error) {
      console.error("Error in testReplicate:", error);
    }
  };