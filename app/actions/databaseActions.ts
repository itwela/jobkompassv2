'use server';

import { supabaseClientClient } from "../utils/supabase/client";
import { createSupServerInstance } from "../utils/supabase/server";


export async function quickAddJob({ job }: { job: any }) {
    
    "must call supabase server instance from within every server action and it will work."
    const supabase = await createSupServerInstance();
    /* 
    "id"
    "Company"
    "Status"
    "Link" 
    "Keywords"
    "Interviewed"
    "user_id"
    "Title"
    "Date Applied"
    "Resume used"
    "Cover letter used"
    "Description"
    "Skills"
    */ 

    console.log("job", job)

    const { data, error } = await supabase
        .from("Job").insert([
            { 
                "id": crypto.randomUUID(),
                "Company": job.Company,
                "Status": job.Status,
                "Link": job.Link, 
                "Keywords": job.Keywords,
                "Interviewed": job.Interviewed,
                "user_id": job.user_id,
                "Title": job.Title,
                "Date Applied": job["Date Applied"],
                "Resume used": job["Resume used"],
                "Cover letter used": job["Cover letter used"],
                "Description": job.Description,
                "Skills": job.Skills,
            }
    ]);
  
    if (error) {
      console.error("Error adding job:", error);
      throw new Error("Failed to add job");
    }
  
    return {
        status: 'success'
    };
}

// interface ResumeUpload {
//     file: File;
//     name: string;
//     type: string;
//     size: number;
//     lastModified: number;
// }

// all files like this will be the " thing " + " firstname " + " user id " + " filename "
export async function addResumeToDb(resume: FormData, user: any) {
    const supabase = await createSupServerInstance();
    
    const file = resume.get('resume') as File;
    const fileInfoStr = resume.get('fileInfo') as string;
    const fileInfo = JSON.parse(fileInfoStr);

    // check if filename exists in Profiles table resumes
    const { data: checkIfResumeExists, error: checkIfResumeExistsError } = await supabase
       .from("Profiles")
       .select("resumes")
       .eq("user_id", user?.[0]?.user_id);
    if (checkIfResumeExistsError) {
        console.error("Error checking if resume exists:", checkIfResumeExistsError);
        return {
            status: 'error',
            message: 'Failed to check if resume exists'
        };
    }

    if (checkIfResumeExists && checkIfResumeExists.length > 0 && checkIfResumeExists[0].resumes.includes(file.name)) {
        console.log("Resume already exists")
        return {
            status: 'error',
            message: 'Resume already exists'
        };
    }


    try {

        // Convert file to buffer for upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const userFN = user?.[0]?.firstName
        const userID = user?.[0]?.user_id

        const { data: addResumeToDbData, error: addResumeToDbError } = await supabase
            .storage
            .from('docs')
            // all files like this will be the " thing " / " firstname " - " user id " / " filename "
            .upload(`resumes/${userFN}-${userID}/${file.name}`, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: true  // Allow overwriting of files
        });

        if (addResumeToDbError) {
            console.log("Error uploading resume:", addResumeToDbError);
            return {
                status: 'error',
                message: 'Failed to upload resume to storage',
            };
        }

        const { data: currentResumeTitles, error: currentResumeTitlesError } = await supabase
            .from("Profiles")
            .select("resumes")
            .eq("user_id", userID)
            .single();

        const updatedResumes = [...(currentResumeTitles?.resumes || []), file.name];

        const { data: addResumeTitleToUserData, error: addResumeTitleToUserError  } = await supabase
            .from("Profiles")
            .update({
            resumes: updatedResumes
            })
        .eq("user_id", userID); // Use the user ID to target the specific user        
        
        if (addResumeTitleToUserError) {
            console.log("Error adding job:", addResumeTitleToUserError);
            return {
                status: 'error',
                message: 'Failed to add resume title to user table'
            };
        }

        return {
            status: 'success',
            message: 'File uploaded successfully'
        };

    } catch (error) {
        console.error("Error processing resume upload:", error);
        return {
            status: 'error',
            message: 'Failed to process resume upload'
        };
    }
}

export async function addCoverLetterToDb(cover: FormData, user: any) {
    const supabase = await createSupServerInstance();
    
    const file = cover.get('cover') as File;
    const fileInfoStr = cover.get('fileInfo') as string;
    const fileInfo = JSON.parse(fileInfoStr);

    // check if filename exists in Profiles table resumes
    const { data: checkIfCoverLetterExists, error: checkIfCoverLetterExistsError } = await supabase
       .from("Profiles")
       .select("cover_letters")
       .eq("user_id", user?.[0]?.user_id);
    if (checkIfCoverLetterExistsError) {
        console.error("Error checking if Cover Letter exists:", checkIfCoverLetterExistsError);
        return {
            status: 'error',
            message: 'Failed to check if Cover Letter exists'
        };
    }

    if (checkIfCoverLetterExists && checkIfCoverLetterExists.length > 0 && checkIfCoverLetterExists[0].cover_letters.includes(file.name)) {
        console.log("Cover Letter already exists")
        return {
            status: 'error',
            message: 'Cover Letter already exists'
        };
    }


    try {

        // Convert file to buffer for upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const userFN = user?.[0]?.firstName
        const userID = user?.[0]?.user_id

        const { data: addCoverLetterToDb , error: addCoverLetterToDbError } = await supabase
            .storage
            .from('docs')
            // all files like this will be the " thing " / " firstname " - " user id " / " filename "
            .upload(`cover/${userFN}-${userID}/${file.name}`, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: true  // Allow overwriting of files
        });

        if (addCoverLetterToDbError) {
            console.log("Error uploading Cover Letter:", addCoverLetterToDbError);
            return {
                status: 'error',
                message: 'Failed to upload Cover Letter to storage',
            };
        }

        const { data: currentCoverLetterTitles, error: currentCoverLetterError } = await supabase
            .from("Profiles")
            .select("cover_letters")
            .eq("user_id", userID)
            .single();

        if (currentCoverLetterError) {
            console.error("Error fetching current cover letters:", currentCoverLetterError);
            return {
                status: 'error',
                message: 'Failed to fetch current cover letters'
            };
        }

        const updatedCoverLetters = [...(currentCoverLetterTitles.cover_letters || []), file.name];

        const { data: addCoverLetterTitleToUserData, error: addCoverLetterTitleToUserError } = await supabase
            .from("Profiles")
            .update({
                cover_letters: updatedCoverLetters
            })
            .eq("user_id", userID);
        if (addCoverLetterTitleToUserError) {
            console.log("Error adding job:", addCoverLetterTitleToUserError);
            return {
                status: 'error',
                message: 'Failed to add resume title to user table'
            };
        }

        return {
            status: 'success',
            message: 'File uploaded successfully'
        };

    } catch (error) {
        console.error("Error processing resume upload:", error);
        return {
            status: 'error',
            message: 'Failed to process resume upload'
        };
    }
}

export async function getUsersResume(resumeName: string, userName: string, userId: string) {
    const supabase = await createSupServerInstance();
    const filePath = `resumes/${userName}-${userId}/${resumeName}`;
    const { data, error } = await supabase
        .storage
        .from('docs')
        .download(filePath);
    if (error) {
        console.error("Error downloading resume:", error);
        return {
            status: 'error',
            message: 'Failed to download resume'
        };
    }

    // Convert Blob to ArrayBuffer
    const arrayBuffer = await data.arrayBuffer();
    
    return {
        data: arrayBuffer,
        type: data.type
    };
}