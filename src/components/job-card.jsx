// import { useUser } from '@clerk/clerk-react'
// import React, { useEffect, useState } from 'react'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
// import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from './ui/button';
// import useFetch from '@/hooks/use-fetch';
// import { saveJobs } from '@/api/apiJobs';

// const JobCard = ({
//     job,
//     isMyJob=false,
//     savedInit = false,
//     onJobSaved = () => {},
// }) => {
//     const [saved,setSaved] = useState(savedInit)

//     const {fn:fnSavedJobs,
//     data:dataSavedJobs,
//     loading:loadingSavedJobs}=useFetch( saveJobs,{alreadySaved:saved});

//     const {user} = useUser();

//     const handleSaveJobs = async () => {
//         await fnSavedJobs({
//             user_id: user.id,
//             job_id: job.id,
//         });
//         onJobSaved();
//     };

//     useEffect(()=>{
//         if(dataSavedJobs!==undefined) setSaved(dataSavedJobs?.length > 0);
//     },[dataSavedJobs]);
//   return <Card>
//     <CardHeader>
//         <CardTitle className="flex justify-between font-bold">
//             {job.title}
//         {isMyJob && (
//             <Trash2Icon
//             fill="red"
//             size={18}
//             className='text-red-300 cursor-pointer'/>
//         )}
        
//         </CardTitle>

//     </CardHeader>
//     <CardContent className="flex flex-col gap-4 flex-1">
//         <div className='flex justify-between'>
//             {job.company && <img src={job.company.logo_url} className='h-6'/>}
//             <div className='flex gap-2 items-center'>
//                 <MapPinIcon size={15}/> {job.location}
//             </div>
//         </div>
//         <hr />
//         {job.description.substring(0,job.description.indexOf("."))+"..."}
//     </CardContent>
//     <CardFooter className='flex gap-2'>
//         <Link to={`/job/${job.id}`} className='flex-1'>
//         <Button variant='secondary' className='w-full'>
//             More Details</Button></Link>

//             {!isMyJob && (
//                 <Button variant='outline'
//                 className='w-15'
//                 onClick={handleSaveJobs}
//                 disabled={loadingSavedJobs} >
//                     {saved ? (<Heart size={20} stroke='red' fill="red" />)
//                     :(<Heart size={20} />)}
                    

//                 </Button>
//             )}

            

//     </CardFooter>
//   </Card>
// }

// export default JobCard

import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { saveJobs } from '@/api/apiJobs'; // Make sure you've created this

const JobCard = ({
    job,
    isMyJob=false,
    savedInit = false,
    onJobSaved = () => {},
}) => {
    const [saved,setSaved] = useState(savedInit)

    // --- FIX #1: Remove the static options from here ---
    const {fn:fnSavedJobs,
    // data:dataSavedJobs, // We don't need this data or useEffect anymore
    loading:loadingSavedJobs}=useFetch(saveJobs); // Remove options

    const {user} = useUser();

    const handleSaveJobs = async () => {
        // --- FIX #2: This is the new logic ---
        
        // 1. Immediately update the UI for a fast feel
        const newSavedState = !saved;
        setSaved(newSavedState);

        // 2. Call the API, passing the *current* saved state
        // (If it 'was' saved, the API will delete it. If it 'was not' saved, API will insert it)
        try {
            await fnSavedJobs({
                user_id: user.id,
                job_id: job.id,
                alreadySaved: saved, // Pass the 'saved' state dynamically
            });
            onJobSaved();
        } catch (error) {
            // 3. If API fails, roll back the UI change
            console.error("Failed to save job", error);
            setSaved(!newSavedState); // Revert to the old state
        }
    };

    // --- FIX #3: We don't need this useEffect anymore ---
    // The UI is updated instantly in handleSaveJobs
    // useEffect(()=>{
    //     if(dataSavedJobs!==undefined) setSaved(dataSavedJobs?.length > 0);
    // },[dataSavedJobs]);
    
    return <Card className='flex flex-col'>
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">
                {job.title}
            {isMyJob && (
                <Trash2Icon
                fill="red"
                size={18}
                className='text-red-300 cursor-pointer'/>
            )}
            
            </CardTitle>

        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
            <div className='flex justify-between'>
                {job.company && <img src={job.company.logo_url} className='h-6'/>}
                <div className='flex gap-2 items-center'>
                    <MapPinIcon size={15}/> {job.location}
                </div>
            </div>
            <hr />
            {job.description.substring(0,job.description.indexOf("."))+"..."}
        </CardContent>
        <CardFooter className='flex gap-2'>
            <Link to={`/jobpage/${job.id}`} className='flex-1'>
            <Button variant='secondary' className='w-full'>
                More Details</Button></Link>

                {!isMyJob && (
                    <Button variant='outline'
                    className='w-15'
                    onClick={handleSaveJobs}
                    disabled={loadingSavedJobs} >
                        {saved ? (<Heart size={20} stroke='red' fill="red" />)
                        :(<Heart size={20} />)}
                        
                    </Button>
                )}
        </CardFooter>
    </Card>
}

export default JobCard