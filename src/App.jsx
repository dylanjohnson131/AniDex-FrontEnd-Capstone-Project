import "./App.css";
import { NavBar } from "./Components/Nav/NavBar.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./Homepage";
import { WelcomePage } from "./Components/Welcome/WelcomePage";
import { LoginPage } from "./Components/Welcome/Auth/LoginPage";
import { RegisterPage } from "./Components/Welcome/Auth/RegisterPage";
import { AniDexPage } from "./Components/AniDex/AniDexPage";
import { LogNewAnimalPage } from "./Components/NewAnimalLog/NewAnimalLog.jsx"; 
import { CollectionPage } from "./Components/Collection/CollectionPage";

// Main App component that sets up the routes for the application
// It includes public routes (WelcomePage, LoginPage, RegisterPage) which
// do not show the navbar and does not require authentication
//and protected routes (HomePage, AniDexPage, CollectionPage, LogNewAnimalPage)
//which are nested under a parent route that displays the navbar and uses
// uses <Outlet /> for nested content.
export const App = () => {
   return (
     <Routes>
        {/* Public routes without NavBar */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes with NavBar */}
        <Route element={<><NavBar /><Outlet /></>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/AniDex_Database" element={<AniDexPage />} />
          <Route path="/Collection" element={<CollectionPage />} />
          <Route path="/Log_New_Animal" element={<LogNewAnimalPage />} />
        </Route>
     </Routes>
   );
};


