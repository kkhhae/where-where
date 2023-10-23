import './App.css';
import Main from './views/main';
import Header from './views/main/Header';  
import SignIn from './views/sign/signIn';  
import Map from './views/map';        


import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import Footer from './views/main/Footer';
import SignUp from './views/sign/signUp';
import { useContext, useState } from 'react';
import KeywordContext from './Component/useKeyword';
import BasicMap from './Kakao/index.jsx';

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
  const excludedPaths = ["/api/auth/signIn", "/api/auth/signUp"];
  return (
    <>
      <Header />
      <Routes>
        <Route path="/api/auth/signIn" element={<SignIn />} />
        {/* <Route path="/search/map" element={<Map />} /> */}
        <Route path="/api/auth/signUp" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<BasicMap/>}/>
      </Routes>
    
      {!excludedPaths.includes(location.pathname) && <Footer />}

    </>
  );
}

export default App;


export function MainNav() {
    const navi = useNavigate();

    const signIn = () => {
      navi("/signIn");

    }
    const main = () => {
      navi("/");

    }
    const map = () => {
      navi('/search/map');

    }
    const BasicMap = () => {
      navi('/test');
    }

  
  return navi;
}
