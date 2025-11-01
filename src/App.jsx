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
import ProtectedRoutes from './components/protected-routes'

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
        element:
        <ProtectedRoutes>
          <Onboarding/>
          </ProtectedRoutes>
        
      },
       {
        path:'/joblisting',
        element:
        <ProtectedRoutes><JobListing/></ProtectedRoutes>
        
      },
       {
        path:'/jobpage',
        element:<ProtectedRoutes><JobPage/></ProtectedRoutes>
      },
       {
        path:'/myjobs',
        element:<ProtectedRoutes><MyJobs/></ProtectedRoutes>
      },
       {
        path:'/postjob',
        element:<ProtectedRoutes><PostJob/></ProtectedRoutes>
      },
       {
        path:'/savejobs',
        element:<ProtectedRoutes><SaveJobs /></ProtectedRoutes>
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
