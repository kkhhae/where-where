import * as React from 'react';
import MainCss from '../Component/main.module.css';
import { useNavigate } from 'react-router-dom';
import Swiper from './slider';  
import { useCookies } from 'react-cookie';
import RealtimePlay from '../NodeJs';
import Logo from '../Component/whereLogo.png'



function Main() {

    const [cookie, setCookie] = useCookies(['token']);

    const navigate = useNavigate();

    const gotoMap = () => {
        navigate('/map', {
        });
    }

    const gotoMapWithKeyword = (keyword) => {

        alert("업데이트 예정입니다. 맵으로 이동합니다.")
        navigate('/map', {
        });
        // navigate('/map', {
        //     state: { 
        //         keyword: keyword 
        //     }
        // });
    }

    const addPlace = () => {
    
            alert("업데이트 예정입니다.")
            // navigate('/api/auth/signIn')


    }

  return (

    <div>
        <div className={MainCss["masthead"]}>
            <div className="container px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        
                    </div>
                </div>
            </div>
        </div>
        <div className={MainCss["masthead"]}>
            <img src={Logo} alt="로고 이미지"style={{ display: 'block', margin: '0 auto' }}/>
        </div>
        <section className="page-section bg-primary" id="about">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">

                    <div className="col-lg-8 text-center"> {/* 1번 요소 */}
                        <h2 className="text-white mt-0">인기 핫플 목록 👍</h2>
                        <hr className="divider divider-light" />
                        <Swiper />
                        <br/>
                        <br/>
                        <RealtimePlay />
                    </div>

                    <div className="col-lg-4 " style={{paddingLeft:'70px'}}> {/* 2번 요소 */}
                        <h2 className="text-center mt-0 text-white mt-0 ">원하는 항목을 눌러주세요!</h2>
                        <hr className="divider divider-light" />
                        <div className=" gx-4 gx-lg-5">
                            <div className="text-center" onClick={() => gotoMapWithKeyword('주변명소')} >
                                <div className="mt-5 text-white mt-0">
                                    <div className="mb-2 "><i className="bi-gem fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">놀거리</h3>
                                    <p ><a >근처에 유명한 곳이 있나요?? 가고싶어요</a></p>
                                </div>
                            </div>
                            <div className="text-center text-white mt-0"  onClick={() => gotoMapWithKeyword('주변맛집')}>
                                <div className="mt-5">
                                    <div className="mb-2"><i className="bi-laptop fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">먹거리</h3>
                                    <p><a> 맛있는게 먹고싶어요! 맛집을 소개합니다</a></p>
                                </div>
                            </div>
                            <div className="text-center text-white mt-0"   onClick={() => gotoMapWithKeyword('정류장')}>
                                <div className="mt-5">
                                    <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">정류장</h3>
                                    <p ><a >여기 근처 정류장은 어디있나요??</a></p>
                                </div>
                            </div>
                            <div className="text-center text-white mt-0" onClick={() => gotoMapWithKeyword('화장실')}>
                                <div className="mt-5">
                                    <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">화장실</h3>
                                    <p ><a >너무 급해요! 찾고계신가요?</a></p>
                                </div>
                            </div>
                            <div className="text-center text-white mt-0" onClick={() => gotoMapWithKeyword(' ')}>
                                <div className="mt-5">
                                    <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">공원</h3>
                                    <p ><a >나들이가 가고싶어요! 어디 있나요?</a></p>
                                </div>
                            </div>

                            <br/>

                            <div className="text-center mt-0" onClick={() => gotoMapWithKeyword(' ')}>

                                    <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">+</h3>
                                    <p ><a >키워드 추가하기 </a></p>

                            </div>
                        </div>
                        <br/><br/> <br/><br/>
                    </div>
                  
                    <div className="container px-4 px-lg-5 text-center">

                    <hr className="divider divider-light" />

                    <h2 className="mb-4">여기도 추천해요! 장소 등록하기!!</h2>
                    <a className="btn btn-light btn-xl" onClick={addPlace}>추천하기</a>
                    </div>

                    
                    
                </div>
                <br></br>
                <h6 style={{textAlign:"center"}}> 로그인 후 사용가능합니다.</h6>
            </div>
          
        </section>
    

        {/* <section className="page-section" id="services">
            <div className="container px-4 px-lg-5">
                <h2 className="text-center mt-0">전국 검색! 원하는 항목을 눌러주세요! </h2>
                <hr className="divider" />
                <div className="row gx-4 gx-lg-5">
                    <div className="col-lg-3 col-md-6 text-center" onClick={() => gotoMapWithKeyword('주변명소')} >
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">놀거리</h3>
                            <p className="text-muted mb-0"><a >다양한 장소를 제공합니다.</a></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center"  onClick={() => gotoMapWithKeyword('주변맛집')}>
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-laptop fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">먹거리</h3>
                            <p className="text-muted mb-0"><a  >다양한 먹거리를 제공합니다.</a></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center"  onClick={() => gotoMapWithKeyword('정류장')}>
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">정류장</h3>
                            <p className="text-muted mb-0"><a >근처 정류장은 어디있나요??</a></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center" onClick={() => gotoMapWithKeyword('화장실')}>
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">화장실</h3>
                            <p className="text-muted mb-0"><a >너무 급해요! 찾고계신가요?</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

        <section className="header bg-dark text-white">
            
        </section>
        
    </div>
  
  );

}
export default Main;