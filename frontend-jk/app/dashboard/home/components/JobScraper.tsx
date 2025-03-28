'use client';

import { useState } from 'react';
import { Utils_Get_Jobs_DeepSeek_Way, Utils_Get_Jobs_From_HTML_Cheap_Way, Utils_Get_Specific_Job_DeepSeek_Way, type ScrapeJobBoardResponse } from '@/app/actions/webScrapingActions';
import { JK_Colors } from '@/app/jkUtilities_and_Tokens/colors';
export default function JobScraper() {
  const [url, setUrl] = useState('');
  const [jobs, setJobs] = useState<ScrapeJobBoardResponse['jobs']>([
    // {
    //   id: 'mock-1',
    //   title: 'Senior Software Engineer',
    //   location: 'San Francisco, CA',
    //   url: 'https://example.com/job1'
    // },
    // {
    //   id: 'mock-2',
    //   title: 'Product Manager',
    //   location: 'New York, NY',
    //   url: 'https://example.com/job2'
    // },
    // {
    //   id: 'mock-3',
    //   title: 'UX Designer',
    //   location: 'Remote',
    //   url: 'https://example.com/job3'
    // }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState(false);
  const [company, setCompany] = useState('');
  const [companyImg, setCompanyImg] = useState<any>('');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleScrapeSpecificJob= async () => {
    try {
      setLoading(true);
      setError('');  
      const gotJobsTheDeepSeekWay = await Utils_Get_Specific_Job_DeepSeek_Way(url)
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeJobBoard = async () => {
    try {
      setLoading(true);
      setError('');
      setJobs([]);
      
      const gotJobsTheCheapWay = await Utils_Get_Jobs_From_HTML_Cheap_Way(url);
      
      if (!gotJobsTheCheapWay) {
        const gotJobsTheDeepSeekWay = await Utils_Get_Jobs_DeepSeek_Way(url).catch((error: any) => {
          setError(error.message);
          return null;
        });
        if (gotJobsTheDeepSeekWay) {
          setJobs(gotJobsTheDeepSeekWay.jobs || []);
          setCompany(gotJobsTheDeepSeekWay.company || '');
          setCompanyImg(gotJobsTheDeepSeekWay.company_img || '');
        }
      }

      setJobs(gotJobsTheCheapWay && gotJobsTheCheapWay.jobs);
      setCompany(gotJobsTheCheapWay && gotJobsTheCheapWay.company || '');
      setCompanyImg(gotJobsTheCheapWay &&gotJobsTheCheapWay.company_img || '');

      console.log('Debug info:', gotJobsTheCheapWay);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-scraper space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Greenhouse job board URL"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleScrapeSpecificJob}
          disabled={loading}
          style={{ backgroundColor: loading ? JK_Colors.lightGrey : JK_Colors.blue }}
          className="px-4 py-2 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Scraping...' : 'Scrape Job'}
        </button>
      </div>


{/* ------------------------------- */}

          {selectedJob?.length > 0 && (
                  <div className="space-y-2 h-max">
                    <h3 className="font-semibold">{jobs?.length} Found Jobs:</h3>
                    <ul className="space-y-2">
                      {jobs?.map((job, index) => (
                        <li 
                          key={`${job?.id}-${index}`} 
                          className="p-2 border rounded flex w-full flex-col"
                        >
                          <img src={companyImg}/>
                          <a 
                            href={job?.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {job?.title}
                          </a>
                          <span>{job?.location}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
          )}

          {selectedJob?.length === 0 && (
            <div className="space-y-2 h-max">
              <h3 className="font-semibold">No Jobs Found:</h3>
            </div>
          )}

{/* ------------------------------- */}












      {error && (
        <div className="text-red-500 text-sm">
          Error: {error}
        </div>
      )}

      {company && (
        <div className="text-blue-500 text-sm">
          Company: {company}
        </div>
      )}

      {companyImg && (
        <div className="text-blue-500 text-sm">
          Company Image: {companyImg}
        </div>
      )}

      {/* job board stuff , L os far */}
      {jobs?.length > 0 && (
        <div className="space-y-2 h-max">
          <h3 className="font-semibold">{jobs?.length} Found Jobs:</h3>
          <ul className="space-y-2">
            {jobs?.map((job, index) => (
              <li 
                key={`${job?.id}-${index}`} 
                className="p-2 border rounded flex w-full flex-col"
              >
                <img src={companyImg}/>
                <a 
                  href={job?.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {job?.title}
                </a>
                <span>{job?.location}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
