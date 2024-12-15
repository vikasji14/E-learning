import { Login } from './pages/Login'
import HeroSection from './pages/student/HeroSection';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { RouterProvider } from 'react-router';
import Courses from './pages/student/Courses';
import MyLearning from './pages/student/MyLearning';
import Profile from './pages/student/Proffile';
import { AuthenticatedUser,ProtectedRoute } from './components/ProtectRoutes';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <>
          <HeroSection />
          <Courses />
        </>
      },
      {
        path: 'login',
        element: <AuthenticatedUser> <Login /></AuthenticatedUser>
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ]
  }

])

function App() {


  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
      </main>

    </>
  )
}

export default App