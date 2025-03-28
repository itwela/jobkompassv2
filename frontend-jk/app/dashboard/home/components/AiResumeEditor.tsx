'use client';

import { useState, useRef } from 'react';
import JobScraper from './JobScraper';
import Docxtemplater from 'docxtemplater';
import { PDFDocument } from 'pdf-lib';
import PizZip from 'pizzip';
import { usePDFJS } from '@/app/helpers/functions';
import { usePDF } from '@react-pdf/renderer';
import { findCompanyNameAndJobAmount, theHtml } from '@/app/jkUtilities_and_Tokens/prompts';
import { DeepseekJK_Get_Company_And_Job_Count, } from '@/app/actions/deepseekActions';
import { set } from 'zod';
import { DeepSeekJK_FindCompanyAndCount_Type } from '@/app/types';
import { getPageHtmlLength } from '@/app/actions/webScrapingActions';
export default function AiResumeEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalContent, setOriginalContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiError, setAIError] = useState('');
  const [pdfError, setPdfError] = useState('');
  const [deepseekData, setDeepseekData] = useState<DeepSeekJK_FindCompanyAndCount_Type>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsLoading(true);
    try {
      const content = await extractDocumentContent(selectedFile);
      setOriginalContent(content);
      setEditedContent(content);
    } catch (error) {
      console.error('Error processing file:', error);
      setOriginalContent('Error processing file');
    } finally {
      setIsLoading(false);
    }
  };

  const extractDocumentContent = async (file: File): Promise<string> => {
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      let fullText = '';
      
      await usePDFJS(async (pdfjs) => {
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items
            .map((item: any) => item.str)
            .join(' ') + '\n';
        }
      });
      
      return fullText;
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const arrayBuffer = await file.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      });
      return doc.getFullText();
    }
    throw new Error('Unsupported file type');
  };

  const handleDownload = async () => {
    if (!file || !editedContent) return;
    
    setIsLoading(true);
    try {
      if (file.type === 'application/pdf') {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        page.drawText(editedContent, {
          x: 50,
          y: page.getHeight() - 50,
          size: 12,
        });
        const pdfBytes = await pdfDoc.save();
        downloadFile(pdfBytes, 'edited-resume.pdf', 'application/pdf');
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const zip = new PizZip();
        const doc = new Docxtemplater(zip);
        doc.setData({ content: editedContent });
        doc.render();
        const buffer = doc.getZip().generate({ type: 'nodebuffer' });
        downloadFile(buffer, 'edited-resume.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to generate download');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (data: ArrayBuffer | Uint8Array, fileName: string, mimeType: string) => {
    const blob = new Blob([data], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="ai-resume-editor p-4 border rounded-lg mt-4 space-y-4">
      <button onClick={() => getPageHtmlLength("https://boards.greenhouse.io/inthepocket")}>Test</button>
      {deepseekData && (
        <div>
          <h1>Response: {deepseekData.response}</h1>
          <h1>Company Name: {deepseekData.companyName}</h1>
          <h1>Total Job Count: {deepseekData.totalJobCount}</h1>
        </div>
      )}
      <h1>{theHtml?.length}</h1>
      <h2 className="text-xl font-bold">Resume Editor</h2>
      
      <div className="file-upload">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {file ? 'Change File' : 'Upload Resume'}
        </button>
        {file && (
          <span className="ml-2 text-sm text-gray-600">
            {file.name}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="text-gray-500">Processing file...</div>
      )}

      {originalContent && (
          <div className="editor-container grid grid-cols-2 gap-8 h-[calc(100vh-200px)]">
            <div className="original-content h-full flex flex-col">
              <h3 className="font-semibold mb-4">PDF Preview</h3>
              <div className="bg-gray-50 p-4 rounded-lg flex-1 overflow-y-auto shadow-sm">
                {file?.type === 'application/pdf' && (
                 <embed
                 style={{
                         width: '100%',
                   height: '100%',
                 }}
                 type='application/pdf'
                 src={file && URL.createObjectURL(file)}
                 />
                )}
              {file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                <div className="text-gray-500">
                  DOCX preview not available - please edit using the text area
                </div>
              )}
            </div>
          </div>

          <div className="edited-content h-full flex flex-col">
            <h3 className="font-semibold mb-4">Edit Resume Content</h3>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full flex-1 p-4 border rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Edit your resume content here..."
            />
          </div>
        </div>
      )}

      {/* {editedContent && (
        <div className="action-buttons flex gap-2">
          <button
            onClick={async () => {
              setIsAIProcessing(true);
              setAIError('');
              try {
                const { content, error } = await summarizeResume(editedContent);
                if (error) throw new Error(error);
                setEditedContent(content);
              } catch (error) {
                setAIError('Failed to summarize resume');
                console.error(error);
              } finally {
                setIsAIProcessing(false);
              }
            }}
            disabled={isLoading || isAIProcessing}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {isAIProcessing ? 'Summarizing...' : 'Summarize'}
          </button>

          <button
            onClick={async () => {
              setIsAIProcessing(true);
              setAIError('');
              try {
                const { content, error } = await expandResume(editedContent);
                if (error) throw new Error(error);
                setEditedContent(content);
              } catch (error) {
                setAIError('Failed to expand resume');
                console.error(error);
              } finally {
                setIsAIProcessing(false);
              }
            }}
            disabled={isLoading || isAIProcessing}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isAIProcessing ? 'Expanding...' : 'Expand'}
          </button>

          <button
            onClick={handleDownload}
            disabled={isLoading || isAIProcessing}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            Download Edited Resume
          </button>
        </div>
      )} */}

      {aiError && (
        <div className="text-red-500 mt-2">{aiError}</div>
      )}
    </div>
  );
}
