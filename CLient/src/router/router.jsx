import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing/Landing.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/home/Home";
import Recipe from "../pages/Recipe.jsx";
import RecipeForm from "../components/form/RecipeForm";
import NotFound from "../pages/notfound/NotFound";
import LoginForm from "../components/form/LoginFom.jsx";
import ProtectedRoute from "../../ProtectectRouter.jsx";
import LayoutPublic from "../components/layout/LayoutPublic";
import LayoutPrivate from "../components/layout/LayoutPrivate";
import { AuthProvider } from "../context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <LayoutPublic />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <LayoutPrivate />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "recipe/:id",
        element: <Recipe />,
      },
      {
        path: "new-recipe",
        element: <RecipeForm />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;