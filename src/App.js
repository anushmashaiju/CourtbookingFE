import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import AddNewCourt from './Pages/AddNewCourt';
import CourtUserViewPage from './Pages/CourtUserViewPage';
import Mybookings from './Pages/Mybookings';
import { AdminAuth, LoginAuth, UserAuth } from './Authorisation/authorization';
function App() {
  return (
   <>
   <ToastContainer/>  
   <BrowserRouter>
  <Routes>
    <Route element={<LoginAuth/>}>
    <Route path='/'element={<Login/>}/>
    </Route>
    {/*user route*/}
    <Route element={<UserAuth/>}>
    <Route path='/home' element={<Home/>}/>
    <Route path='/courtUserViewPage/:id' element={<CourtUserViewPage/>}/>
    <Route path='/myBookings' element={<Mybookings/>}/>
     </Route>

     {/*admin route*/}
     <Route element={<AdminAuth/>}>
    <Route path='/addNewCourt' element={<AddNewCourt/>}/>
    </Route>
  </Routes>
   </BrowserRouter>
   
   </>
  );
}

export default App;
