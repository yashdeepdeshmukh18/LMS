import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { CourseProvider } from './context/CourseContext.jsx';
import { ThemeProvider } from './context/themes/rootTheme.jsx';
import { NavbarThemeProvider } from './context/themes/navbarThemes.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
    <NavbarThemeProvider>

    <AuthProvider>
      <CourseProvider>


        <StrictMode>
          <App />
        </StrictMode>

      </CourseProvider>

    </AuthProvider>

    </NavbarThemeProvider>
    </ThemeProvider>

  </BrowserRouter>
)
