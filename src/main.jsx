import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Users from './pages/Users.jsx';
import TodoApp from './components/todo/TodoApp.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ErrorPage from './pages/Error.jsx';
import BookPage from './pages/BookPage.jsx';
import "antd/dist/reset.css";
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: "/books",
        element: 
        (
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        )
      },

      {
        path: "/users",
        element: <Users />,
      }
  ]
},

{
  path: "/login",
  element: <Login />,
},

{
  path: "/register",
  element: <Register />,
}
  
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  {/* </StrictMode>, */}
  </AuthWrapper>
)
