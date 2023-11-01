import './App.css';
import Main from './Main';
import Header from './Main/Header';   
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import Footer from './Main/Footer';
import { useState } from 'react';
import KeywordContext from './Component/useKeyword';
import BasicMap from './Map/index.jsx';
import GoogleSearch from './Google';
import SignIn from './Sign/SignIn';
import SignUp from './Sign/SignUp';
import SignFindId from './Sign/SignFindId';


function App() {
  
  const [keyword, setKeyword] = useState('');

  return (
    <KeywordContext.Provider value={{keyword, setKeyword}}>
      <Router>
        <AppContent />
      </Router>
    </KeywordContext.Provider>
  );
}

//앱 설정하기
function AppContent() {
  const location = useLocation();

  //푸터 안보일 페이지들 등록
  const excludedPaths = ["/api/auth/signIn", "/api/auth/signUp", "/map", '/google'];
  return (
    <>
      <Header />
      <Routes>
        <Route path="/api/auth/signIn" element={<SignIn />} />
        <Route path="/api/auth/signUp" element={<SignUp/>} />
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<BasicMap/>}/>
        <Route path='/api/auth/signFind' element={<SignFindId/>}/>

      </Routes>
    
      {!excludedPaths.includes(location.pathname) && <Footer />}

    </>
  );
}

export default App;


export function MainNav() {
    const navi = useNavigate();

    const main = () => {
      navi("/");
    }
    
    const BasicMap = () => {
      navi('/map');
    }

    const Google = () => {
      navi('/google');
    }
    
    const signUp = () => {
      navi("/signUp");
    }
    const signFindId = () => {
      navi("/signUp");
    }
    const signIn = () => {
      navi("/signIn");
    }

  return navi;
}
