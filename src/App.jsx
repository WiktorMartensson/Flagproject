import "./app.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/theme";

// Layout
import RootLayout from "./Layouts/RootLayout";

// Pages
import Home from "./Pages/Home";
import CountryPage from "./Pages/CountryPage";
import countryDetailsLoader from "./Components/CountryDetailsLoader";

import Cards from './Pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path=":code" element={<CountryPage />} loader={countryDetailsLoader} />
      <Route index element={<Cards />} />
    </Route>
  )
);
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
