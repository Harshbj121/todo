import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import TaskDashboard from './Components/TaskDashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Registration />
    },
    {
      path: '/',
      element: <TaskDashboard />
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
