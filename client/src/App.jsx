import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AppLayout from "./components/layout/AppLayout";
import Board from "./pages/Board";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<AuthLayout/>}>
                <Route path="signIn" element={<SignIn/>}></Route>
                <Route path="signUp" element={<SignUp/>}>
              </Route>
              </Route>
              <Route path='/' element={<AppLayout/>}>
                  <Route index element={<Home />} />
                  <Route path='boards' element={<Home />} />
                  <Route path='boards/:boardId' element={<Board />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
