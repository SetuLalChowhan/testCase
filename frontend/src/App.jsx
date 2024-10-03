import Header from "./components/Header"
import UserLogin from "./components/UserLogin"
import UserProfile from "./components/UserProfile"
import UserRegistration from "./components/UserRegistration"
import { BrowserRouter,Routes,Route } from "react-router-dom"

function App() {

  return (
  <BrowserRouter>
  <Header isLoggedIn={true}/>
   <Routes>
    <Route path="/"  element={<UserRegistration/>}  />
    <Route path="/login"  element={<UserLogin/>}  />
    <Route path="/profile"  element={<UserProfile/>}  />
   </Routes>
  
  </BrowserRouter>
  )
}

export default App
