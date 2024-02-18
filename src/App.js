import HomePage from "./components/home/HomePage";
import Login from "./components/Login";
import Manage from "./components/manager/Manage";
import AccountManage from "./components/manager/AccountManage";
import StaffManage from "./components/manager/StaffManage";
import RoomManage from "./components/manager/RoomManage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// 创建一个全局实例client,并通过QueryClientProvider将所有client传递下去，用于管理所有请求
const queryClient = new QueryClient();

function App() {
  return (
    //提供client
    <QueryClientProvider client={queryClient}>
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
            <Route path="staff" element={<StaffManage></StaffManage>}></Route>
            <Route path="rooms" element={<RoomManage></RoomManage>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
