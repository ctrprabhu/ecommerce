import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/auth/AuthGuard";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={
                <AuthGuard requireAuth={false}>
                  <SignUpPage />
                </AuthGuard>
              }
            />
            <Route
              path="/signin"
              element={
                <AuthGuard requireAuth={false}>
                  <SignInPage />
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard requireAuth={true}>
                  <ProfilePage />
                </AuthGuard>
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
