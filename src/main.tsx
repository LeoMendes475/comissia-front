import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import './main.css';
import Home from './pages/Home.tsx';
import Navbar from './components/NavBar.tsx';

import { UserCreate } from './pages/User/Create.tsx';

import { AffiliatesCreate } from './pages/affiliates/Create.tsx';
import UserList from './pages/User/List.tsx';
import AffiliatesList from './pages/affiliates/List.tsx';
import { AffiliatesEdit } from './pages/affiliates/Edit.tsx';
import { UserEdit } from './pages/User/Edit.tsx';
import CommisionList from './pages/Commission/List.tsx';
import { CommisionEdit } from './pages/Commission/Edit.tsx';
import { CommisionCreate } from './pages/Commission/Create.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/userlist",
    element: <UserList />
  },
  {
    path: "/usercreate",
    element: <UserCreate />
  },
  {
    path: "/user/edit/:id",
    element: <UserEdit />
  },
  {
    path: "/affiliateslist",
    element: <AffiliatesList />
  },
  {
    path: "/affiliatescreate",
    element: <AffiliatesCreate />
  },
  {
    path: "/affiliates/edit/:id",
    element: <AffiliatesEdit />
  },
  {
    path: "/commissionlist",
    element: <CommisionList />
  },
  {
    path: "/commissioncreate",
    element: <CommisionCreate />
  },
  {
    path: "/commission/edit/:id",
    element: <CommisionEdit />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex'>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
