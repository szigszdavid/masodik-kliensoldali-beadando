
import { Layout } from "./layout/Layout";
import { Home } from "./home/Home";
import { Registration } from "./registration/Registration";
import { Login } from "./login/Login"
import { UserTasks } from "./usertasks/UserTasks";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TaskBank } from "./taskbank/TaskBank";
import { EditableTaskList } from "./editableTaskList/EditableTaskList";
import { Profile } from "./profile/Profile";
import { AuthStatus } from "./login/AuthStatus";
import { RequireAuth } from "./login/RequireAuth";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/taskbank" element={<TaskBank />} >
            <Route path=":playlist"/>
          </Route>
          <Route path="/tracks"/>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usertasks" element={JSON.parse(window.localStorage.getItem("user")) !== null ? <UserTasks /> : <Login />} />
          <Route path="/editabletasklist" element={JSON.parse(window.localStorage.getItem("user")) !== null ? <EditableTaskList /> : <Login />} />
          <Route path="/profile" element={JSON.parse(window.localStorage.getItem("user")) !== null ? <Profile /> : <Login />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
