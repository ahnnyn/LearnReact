
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";

const App = () =>{
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
    
  )
}

export default App;

//props chinh la mot bien object