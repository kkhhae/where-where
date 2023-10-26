import * as React from 'react';
import MainCss from '../../Component/main.module.css';
import '../../Component/slide';
import { useNavigate } from 'react-router-dom';




function Main(props) {
    const navigate = useNavigate();

    const gotoMap = () => {
        navigate('/map', {
        });
    }

    const gotoMapWithKeyword = (keyword) => {
        navigate('/map', {
            state: { keyword: keyword }
        });
    }


  return (

    <div>
        <div className={MainCss["masthead"]}>
            <div className="container px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-60 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white font-weight-bold">어디? 어디!</h1>
                        <hr className="divider" />
                    </div>
                    <div className="col-lg align-self-baseline">
                        <div className="mx-auto mt-5 search-bar input-group mb-3">
                            <a className="btn btn-light btn-xl" onClick={gotoMap} style={{width:"75%", margin:"auto"}}>검색하러가기 👉</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className="page-section bg-primary" id="about">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 className="text-white mt-0">인기👍 핫플 역 목록</h2>
                        <hr className="divider divider-light" />
    

                        <div className="slider slider-1">
                            <div className="slides">
                                <div className="active" style={{color:"white"}}></div>
                                <div style={{color:"blue"}}></div>
                                <div style={{color:"green"}}></div>
                                <div style={{color:"red"}}></div>
                            </div>
    
                            <div className="pages">
                                <div className="active"></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
    
                            <div className="side-btns">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        {/* <hr className="divider divider-light" /> */}
                        {/* <p className="text-white-75 mb-4" ><a  href=''>다른역 더 보기 👉</a></p> */}
                    </div>
                </div>
            </div>
        </section>
    

        <section className="page-section" id="services">
            <div className="container px-4 px-lg-5">
                <h2 className="text-center mt-0">원하는 걸 눌러주세요! </h2>
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
        </section>

        <section className="page-section bg-dark text-white">
            <div className="container px-4 px-lg-5 text-center">
                <h2 className="mb-4">여기도 추천해요! 장소 등록하기!!</h2>
                <a className="btn btn-light btn-xl" href=''>추천하기</a>
            </div>
            <br></br>
            <h6 style={{textAlign:"center"}}> 로그인 후 사용가능합니다.</h6>
        </section>
        
    </div>
  
  );

}
export default Main;