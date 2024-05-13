import Login from "./component/Login";
import Register from "./component/Register";
import UserHome from "./component/User/UserHome";
import UserNavBar from "./component/User/UserNavBar"
import { Route, Routes} from 'react-router-dom';
import PdfViewer from "./component/PdfViewer";
import Compose from './component/User/Compose'
import Outgoing from "./component/User/Outgoing";

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {

  const token = getToken()

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Login/>}/>
        <Route path='/register'element={<Register/>} />
        <Route path = "/PdfViewer/:filename" element = {<PdfViewer/>} />

        <Route path="/user" element={
              <>
              <UserNavBar setToken = {setToken} token = {token}/>
              <UserHome/>
              </>
            } />
          <Route path = "/user/compose" element={
              <>
              <UserNavBar/>
              <Compose/>
              </>
            } />

          <Route path = "/user/outgoing" element={
              <>
              <UserNavBar/>
              <Outgoing/>
              </>
            } />
      </Routes>
      {/* <Login/> */}
      {/* <Register/> */}
    </div>
  );
}

export default App;
