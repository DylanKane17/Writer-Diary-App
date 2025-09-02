import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import NewEntryPage from "./pages/NewEntryPage";
import EntriesPage from "./pages/EntriesPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./firebase/AuthContext";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NewProjectPage from "./pages/NewBookPage";
import BooksPage from "./pages/BooksPage";

function App() {
  return (
    <main class="bg-gradient-to-br from-slate-950 to-indigo-950 min-h-screen min-w-screen">
      <AuthProvider>
        <NavBar></NavBar>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
          <Route
            path="/new-entry"
            element={<NewEntryPage></NewEntryPage>}
          ></Route>
          <Route path="/entries" element={<EntriesPage></EntriesPage>}></Route>
          <Route
            path="/settings"
            element={<SettingsPage></SettingsPage>}
          ></Route>
          <Route
            path="/reset_password"
            element={<ResetPasswordPage></ResetPasswordPage>}
          ></Route>
          <Route
            path="/new-project"
            element={<NewProjectPage></NewProjectPage>}
          ></Route>
          <Route path="/" element={<BooksPage></BooksPage>}></Route>
        </Routes>
      </AuthProvider>
    </main>
  );
}

export default App;
