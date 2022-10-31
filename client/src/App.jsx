import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
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
                <Route path="login" element={<Login/>}/>
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
