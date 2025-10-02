import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import PostNotePage from './pages/PostNotePage/PostNotePage.jsx';
import EditNotePage from './pages/EditNotePage/EditNotePage.jsx';

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
      { path: "editnote/:id", element: <EditNotePage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
