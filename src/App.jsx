import { useState } from 'react'
import {Button} from "./components/ui/button"
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing-page'
import Onboarding from './pages/onboarding'
import JobListing from './pages/job-listing'
import JobPage from './pages/job-page'
import MyJobs from './pages/my-jobs'
import PostJob from './pages/post-job'
import SaveJobs from './pages/save-jobs'
import { ThemeProvider } from './components/theme-provider'

const router=createBrowserRouter([
  {
    element:< AppLayout />,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
       {
        path:'/onboarding',
        element:<Onboarding/>
      },
       {
        path:'/joblisting',
        element:<JobListing/>
      },
       {
        path:'/jobpage',
        element:<JobPage/>
      },
       {
        path:'/myjobs',
        element:<MyJobs/>
      },
       {
        path:'/postjob',
        element:<PostJob/>
      },
       {
        path:'/savejobs',
        element:<SaveJobs />
      }
    ]

  }
])
function App() {
  const [count, setCount] = useState(0)

  return (

     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
    

    
    
  )
}

export default App
