import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarLoader } from 'react-spinners';
import ApplyJobDrawer from '@/components/apply-job';

const JobPage = () => {

  const {isLoaded, user } = useUser();
  const {id} = useParams();
  console.log("id from useParams:", id);

  const {
    loading: loadingJob,
    data:job,
    fn:fnJob,
    error: jobError,
  } = useFetch(getSingleJob, {
    job_id: id,
  })

    const {
    loading: loadingHiringStatus,
    
    fn:fnHiringStatus,
    
  } = useFetch(updateHiringStatus, {
    job_id: id,
  })

  const handleStatusChange = (value)=>{
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(()=> fnJob());
  }

  useEffect(()=>{
    if(isLoaded && id) {
      console.log("Fetching job with ID:", id);
      fnJob();
    }
  },[isLoaded]);

  if (jobError) {
    console.error("Error from useFetch:", jobError);
    return (
      <div style={{ color: 'red' }}>
        <h2>Error loading job:</h2>
        <pre>{jobError.message || JSON.stringify(jobError)}</pre>
      </div>
    );
  }

  if(!isLoaded || loadingJob){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>;
    }

    console.log('Job data:', job);
    console.log(jobError);


    if (!job) {
    return <div>Job not found.</div>;
  }


  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url} className='h-12' alt={job?.title} />
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon/>
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <Briefcase/> {job?.applications?.length} Applicants
        </div>

        <div className='flex gap-2'>
          {job?.isOpen? <><DoorOpen/> Open</>: <><DoorClosed/> Closed</>}
        </div>

      </div>

      {/* hiring status */}
      {loadingHiringStatus && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}

      {job?.recruiter_id === user?.id && (<Select  onValueChange={handleStatusChange}>
          <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950 "}`} >
            <SelectValue placeholder={"Hiring Status "+ (job?.isOpen ? "(Open)" : "(Closed)")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem  value="open">Open</SelectItem>
            <SelectItem  value="close">Closed</SelectItem>
          </SelectContent>
        </Select>)}

      <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
      <p className='sm:text-lg'>{job?.description}</p>

       <h2 className='text-2xl sm:text-3xl font-bold'>What we are looking for</h2>
       <MDEditor.Markdown source={job?.requirements} className=' px-6 text-white bg-transparent sm:text-lg'/>


       {job?.recruiter_id !== user?.id && (<ApplyJobDrawer job={job} user={user} fetchJob={fnJob} 
       applied={job?.applications?.find((ap)=> ap.candidate_id === user.id)}/>)}

        

    </div>
  )
}

export default JobPage