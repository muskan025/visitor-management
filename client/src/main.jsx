import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Error from './pages/Error.jsx'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import VisitorRegistration from './pages/VisitorRegistration.jsx'
import ReceptionistDashboard from './pages/ReceptionistDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <Error />,
  children: [
    {
      path: '/',
      element: <Home />, 
    }, 
    {
      path: '/signup',
      element: <Registration />,
    },
    {
      path: '/login',
      element: <Login />,
    },

    {
      path: '/visitor-registration',
      element: <VisitorRegistration />,
    },
    {
      path: '/receptionist-dashboard',
      element: <ReceptionistDashboard />,
    },
    {
      path: '/employee-dashboard',
      element: <EmployeeDashboard />,
    },
    {
      path: '/admin-dashboard',
      element: <AdminDashboard />,
    },
  ]
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
