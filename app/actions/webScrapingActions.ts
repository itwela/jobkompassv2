
'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { Scrape_Utils_DeepSeekJk_Entire_Job_Board, Scrape_Utils_DeepSeekJk_Specific_Job, Utils_DeepseekJK_Extract_Company_And_Image, Utils_DeepSeekJk_Extract_Job_Location_From_Text, Utils_DeepSeekJk_Extract_Job_Title_From_Text } from './deepseekActions';
import { AnyNode } from 'postcss';

export interface JobData {
  id: string;
  title: string;
  location: string;
  company: string;
  company_img: string;
  department: string;
  link: string;
}

export interface ScrapeJobBoardResponse {
  total: number;
  company: string;
  company_img: string;
  pattern_found?: string;
  jobs: JobData[];
  timestamp: string;
  error?: string;
}

export async function getPageHtmlLength(url: string): Promise<number> {
  try {
    if (!url) {
      throw new Error('URL is required');
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      }
    });

    // Load the HTML content
    const $ = cheerio.load(response.data);
    
    // Get the entire HTML content
    const bodyContent = $('body').html();

    if (!bodyContent) {
      return 0;
    }

    console.log('bodyContent', bodyContent.length);
    // Return the length of the HTML content
    return bodyContent?.length;

  } catch (error: any) {
    console.error('Error getting page HTML length:', error);
    throw new Error(error.message || 'Failed to get page HTML length');
  }
}

export async function Utils_Format_GreenHouse_Url(oldUrl: string, urlGlue: string) {
    // Extract everything to the right of "/jobs"
    const id = oldUrl.split('/jobs')[1]; // This gets the part after "/jobs"
  
    // Construct the new URL
    const newUrl = `${urlGlue}/jobs${id}`; // Ensure "/jobs" is part of the new URL
    return newUrl;
}

export async function Utils_Get_Jobs_From_HTML_Cheap_Way(url: string) {
  
  if (!url) {
    return {
      total: 0,
      jobs: [],
      timestamp: new Date().toISOString(),
      error: 'Please provide a Greenhouse job board URL'
    };
  }

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    }
  });

  // Load the HTML content
  const $ = cheerio.load(response.data);

  const allContent = $.html();

  // Get the entire Head content
  const headContent = $('head').html();
  if (!headContent) {
    return 0;
  }

  // Get the entire BODY content
  const bodyContent = $('body').html();
  if (!bodyContent) {
    return 0;
  }
  
  // Extract job-related information
  const jobs: any = [];

  // Find all job openings
  $('div.opening').each((i, element) => {
    const $opening = $(element);
    const job = {
      title: $opening.find('a').text().trim(),
      location: $opening.find('span.location').text().trim(),
      department: $opening.parent().find('h2').text().trim(),
      link: $opening.find('a').attr('href')
    };
    jobs.push(job);
  });

  
  if (jobs.length > 0) {

    // Convert to clean format
    let cleanText = '';
    jobs.forEach((job: any) => {
      cleanText += `Title: ${job.title}\n`;
      cleanText += `Location: ${job.location}\n`;
      cleanText += `Department: ${job.department}\n`;
      cleanText += `Link: ${job.link}\n\n`;
    });
    const getCompanyNameAndImg = await Utils_DeepseekJK_Extract_Company_And_Image(allContent.substring(0, 6000))

    return {
      total: jobs.length,
      company: getCompanyNameAndImg.company,
      company_img: getCompanyNameAndImg.company_image,
      jobs: jobs,
      cleanText: cleanText,
      timestamp: new Date().toISOString(),
      error: false
    };

  } else {
    return null
  }


}

// export async function Utils_Get_Jobs_DeepSeek_Way(url: string) {
  
//   if (!url) {
//     return {
//       total: 0,
//       jobs: [],
//       timestamp: new Date().toISOString(),
//       error: 'Please provide a Greenhouse job board URL'
//     };
//   }

//   const response = await axios.get(url, {
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     }
//   });

//   // Load the HTML content
//   const $ = cheerio.load(response.data);

//   const allContent = $.html();

//   // Get the entire Head content
//   const headContent = $('head').html();
//   if (!headContent) {
//     return 0;
//   }

//   // Get the entire BODY content
//   const bodyContent = $('body').html();
//   if (!bodyContent) {
//     return 0;
//   }
  
//   // Extract job-related information
//   const jobs: any = [];

//   const getJobsWithDeepseek = await Scrape_Utils_DeepSeekJk_Entire_Job_Board(allContent)

//   if (!getJobsWithDeepseek) {
//     return null
//   }

//   for (const job of getJobsWithDeepseek?.jobs) {
//     jobs.push(job) 
//   }

//   // Safely access company and image from getJobsWithDeepseek
//   const cname = getJobsWithDeepseek?.company || ''
//   const cimg = getJobsWithDeepseek?.company_img || ''

//   // Check if jobs array exists and has items
//   if (jobs && Array.isArray(jobs) && jobs?.length > 0) {
//     return {
//       total: jobs.length,
//       company: cname,
//       company_img: cimg,
//       jobs: jobs,
//       timestamp: new Date().toISOString(),
//       error: false
//     };

//   } else {
//     return null
//   }
// }

export async function Utils_Get_Jobs_DeepSeek_Way(url: string) {
  
  if (!url) {
    return {
      total: 0,
      jobs: [],
      timestamp: new Date().toISOString(),
      error: 'Please provide a Greenhouse job board URL'
    };
  }

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    }
  });

  // Load the HTML content
  const $ = cheerio.load(response.data);

  const allContent = $.html();
  console.log("all content length:", allContent.length.toLocaleString())
  // Get the entire Head content
  const headContent = $('head').html();
  console.log('head len', headContent?.length.toLocaleString())
  if (!headContent) {
    return 0;
  }

  // Get the entire BODY content
  const bodyContent = $('body').html();
  console.log('body len', bodyContent?.length.toLocaleString())
  if (!bodyContent) {
    return 0;
  }
  
  const getJobsWithDeepseek = await Scrape_Utils_DeepSeekJk_Entire_Job_Board(bodyContent)


  if (!getJobsWithDeepseek) {
    console.log('No valid data returned from DeepSeek');
    return {
      total: 0,
      company: '',
      company_img: '',
      jobs: [],
      timestamp: new Date().toISOString(),
      error: 'Failed to parse jobs data'
    };
  }

  // Safely access company and image from getJobsWithDeepseek
  const cname = getJobsWithDeepseek?.company || 'Unknown Company';
  const cimg = getJobsWithDeepseek?.company_img || '';

  const jobs: JobData[] = [];
  // Validate each job before adding it
  for (const job of getJobsWithDeepseek.jobs) {
    if (job && job.title && job.location) {
      jobs.push({
        id: job.id || `job-${Date.now()}-${jobs.length}`,
        title: job.title,
        location: job.location,
        company: job.company || cname,
        company_img: job.company_img || cimg,
        department: job.department || '',
        link: job.url || url,
      });
    }
  }
  // Return results even if no jobs were found
  return {
    total: jobs.length,
    company: cname,
    company_img: cimg,
    jobs: jobs,
    timestamp: new Date().toISOString(),
    error: jobs.length === 0 ? 'No valid jobs found' : undefined
  };

}

export async function Utils_Get_Specific_Job_DeepSeek_Way(url: string) {
  
  if (!url) {
    return {
      job: {},
      timestamp: new Date().toISOString(),
      error: 'Please provide a job URL'
    };
  }

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    }
  });

  // Load the HTML content
  const $ = cheerio.load(response.data);

  const allContent = $.html();
  console.log("all content length:", allContent.length.toLocaleString())
  // Get the entire Head content
  const headContent = $('head').html();
  console.log('head len', headContent?.length.toLocaleString())
  if (!headContent) {
    return 0;
  }
  // Get the entire BODY content
  const bodyContent = $('body').html();
  console.log('body len', bodyContent?.length.toLocaleString())
  if (!bodyContent) {
    return 0;
  }
  
  const getJobWithDeepseek = await Scrape_Utils_DeepSeekJk_Specific_Job(bodyContent)

  if (!getJobWithDeepseek) {
    console.log('No valid data returned from DeepSeek');
    return {
      job: {},
      timestamp: new Date().toISOString(),
      error: 'Failed to parse jobs data'
    };
  }

  // Return results even if no jobs were found
  return {
    job: getJobWithDeepseek.job,
    timestamp: new Date().toISOString(),
    error: getJobWithDeepseek.job.length === 0 ? 'No valid jobs found' : undefined
  };

}

// export async function scrapeJobs(url: string): Promise<ScrapeJobBoardResponse> {
//   try {
//     if (!url) {
//       return {
//         total: 0,
//         jobs: [],
//         timestamp: new Date().toISOString(),
//         error: 'Please provide a Greenhouse job board URL'
//       };
//     }

//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//       }
//     });

//     const $ = cheerio.load(response.data);
//     const jobs: JobData[] = [];

//     // Find the first greenhouse.io job link
//     // const firstJobLink = $('a[href*="greenhouse.io/"][href*="/jobs/"]').first();
//     const firstJobLink = $('a[href*="/jobs"]').first();

//     if (!firstJobLink.length) {
//       console.log('No Greenhouse job links found', firstJobLink);
//       return {
//         total: 0,
//         company: '',
//         company_img: '',
//         jobs: [],
//         timestamp: new Date().toISOString(),
//         error: 'No Greenhouse job links found',
//       };
//     }

//     // Get the parent container of the first job link
//     const firstJobContainer = firstJobLink.parent();
//     const jobCardPattern = firstJobContainer.parent();

//     // / ---------------------------------------------------------------------------------------------------------------

//     // Find all similar containers that have greenhouse job links
//     const jobContainers = $(jobCardPattern.prop('tagName')).filter((index, element) => {
//       return $(element).find('a[href*="/jobs"]').length > 0;
//     });

//     // NOTE ^ HERE I CAN ADD SOMETHING THAT SAYS IF JOBCONTAINERS.LENGTH IS EQUAL TO THE LEGHTH I HAVE ON FILE, DONT CONTINUE AND JUST USE THAT DATA
//     // IF NOT CONTINUE AND REFETCH THE NEW JOB DATA

//     // / ---------------------------------------------------------------------------------------------------------------

//     // Map for more in-depth job containers
//     const moreInDepthJobContainersMap = new Map<any, { jobLink: any, combinedText: string }>();

//     // Build the map
//     $(jobCardPattern.prop('tagName')).each((index, element) => {
//       const $container = $(element);
//       const jobLink = $container.find('a[href*="/jobs"]').first();

//       // Combine text from the container and its siblings
//       const combinedText = $container
//         .add($container.siblings('span')) // Combine container with its span siblings
//         .map((_, el) => $(el).text().trim()) // Extract and trim text
//         .get() // Convert jQuery object to plain array
//         .join(' '); // Join all the text into a single string

//       // Use the element itself as a key for mapping
//       moreInDepthJobContainersMap.set(element, {
//         jobLink,
//         combinedText,
//       });
//     });

//     // Extract job information using reliable `jobContainers`
//     await Promise.all(jobContainers.map(async (i, container) => {
//       const $container = $(container);

//       // Retrieve the corresponding more in-depth data
//       const moreInDepthData = moreInDepthJobContainersMap.get(container);
//       const jobLink = moreInDepthData?.jobLink || $container.find('a[href*="/jobs"]').first();
//       const combinedText = moreInDepthData?.combinedText || $container.text().trim();
//       // Extract job title and location from the combined text
//       const jobTitle = await Utils_DeepSeekJk_Extract_Job_Title_From_Text(combinedText);
//       const jobLocation = await Utils_DeepSeekJk_Extract_Job_Location_From_Text(combinedText);

//       const job: JobData = {
//         id: `job-${i}`,
//         title: jobTitle,
//         location: jobLocation,
//         url: await Utils_Format_GreenHouse_Url(jobLink.attr('href'), url),
//         container_html: $container.html() || undefined,
//         container_tag: jobCardPattern.prop('tagName'),
//       };

//       jobs.push(job);

//       await new Promise(resolve => setTimeout(resolve, 500));
//     }));


//     return {
//       total: jobs.length,
//       pattern_found: jobCardPattern.prop('tagName'),
//       jobs,
//       timestamp: new Date().toISOString()
//     };

//   } catch (error: any) {
//     console.error('Scraping error:', error);
//     return {
//       total: 0,
//       jobs: [],
//       timestamp: new Date().toISOString(),
//       error: error.message || 'Failed to scrape job listings'
//     };
//   }
// }



