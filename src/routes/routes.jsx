import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductPage from "../app/productPage";
import App from "../app";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ':pageNumber',
        element: <App />,
      },
    ],
  },
  {
    path: '/products/:id',
    element: <ProductPage />,
  },
  {
    path: '*',
    element: <div>NOT_FOUND</div>,
  },
])

export const Router = () => {
  return <RouterProvider router={router}/>
}