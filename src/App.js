import HomePage from "./components/home/HomePage";
import Login from "./components/Login";
import Manage from "./components/manager/Manage";
import AccountManage from "./components/manager/AccountManage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 渲染HomePage组件 */}
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/manage" element={<Manage></Manage>}>
            <Route
              path="account"
              element={<AccountManage></AccountManage>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
