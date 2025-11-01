import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {Button} from './ui/button.jsx'
import { SignedIn, SignedOut, SignIn, SignInButton, UserAvatar, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Divide, Heart, PenBox } from 'lucide-react'

const Header = () => {
  const [showSignIn,setShowSignIn] = useState(false);
  const {user} = useUser();
  const [search,setSearch] = useSearchParams();
  useEffect(()=>{
    if(search.get("sign-in")){
      setShowSignIn(true);
    }
  },[search])
  const handleOverlayCLick=(e)=>{
    if(e.target === e.currentTarget){
      setShowSignIn(false);
      setSearch({})
    }
  };
  return (<>
  <nav className='py-4 flex justify-between items-center '>
    <Link>
    <img src='/logo.png' className='h-20' />
    </Link>
    
      <SignedOut>
        <Button variant='outline' onClick={()=>{setShowSignIn(true)}}>Login</Button>
        
      </SignedOut>
      <SignedIn>
        {user?.unsafeMetadata?.role==='recruiter' && (<Link to="/postjob">
        <Button variant="destructive" className="rounded-full">
          <PenBox size={20} className='mr-2'/>
          Post a Job
          </Button></Link>)}
        
        <UserButton appearance={
          {
            elements:{
              userButtonAvatarBox: "h-10 w-10"
            }
          }
        } >
          <UserButton.MenuItems>
            <UserButton.Link
            label="My Jobs"
            labelIcon={<BriefcaseBusiness size={15}/>}
            href="/myjobs"/>
            <UserButton.Link
            label="Saved Jobs"
            labelIcon={<Heart size={15}/>}
            href="/savejobs"/>
          </UserButton.MenuItems>

        </UserButton>
      </SignedIn> 
  </nav>
  {showSignIn && <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 '
  onClick={handleOverlayCLick}>
    <SignIn
    signUpForceRedirectUrl='/onboarding'
    fallbackRedirectUrl='/onboarding'
    />
    </div>}
  </>
  )
}

export default Header