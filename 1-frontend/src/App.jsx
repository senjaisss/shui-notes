import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import PostNotePage from './pages/PostNotePage/PostNotePage.jsx';

function Layout() {
  return (
    <div>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: "postnote", element: <PostNotePage /> }, 
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
