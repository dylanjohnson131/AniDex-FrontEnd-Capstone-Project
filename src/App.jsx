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

export const App = () => {
   return (
     <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<><NavBar /><Outlet /></>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/AniDex_Database" element={<AniDexPage />} />
          <Route path="/Collection" element={<CollectionPage />} />
          <Route path="/Log_New_Animal" element={<LogNewAnimalPage />} />
        </Route>
     </Routes>
   );
};


