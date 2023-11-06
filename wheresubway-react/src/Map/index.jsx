  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import AddMapCustomControlStyle from './addMapCustomControlStyle.module';
  import Mstyles from './MapSide.module.css';
  import styles from './MapSide.module.css';
  import { useLocation } from "react-router-dom";


  //컴포넌트들
  import StationInfo from './StationInfo';
  import SideButtons from './SideButtons';
  import NaverSearch from "../Naver";
  import YoutubeSearch from "../Google";


  export default function BasicMap() {
    const {kakao} = window; //카카오변수 전역설정
    const ps = new kakao.maps.services.Places();
    var markers = [];   //카카오맵 마커

    //역정보 세팅
    const [stationInfos, setStationInfos] = useState([]); 

    //카카오맵 세팅
    const [keyword, setKeyword] = useState(""); // 키워드 검색 값 상태
    const [map, setMap] = useState(null); //map세팅

    //사이드바 버튼 세팅
    const [showSideButtons, setShowSideButtons] = useState(true);

    //지하철 정보 세팅
    const [intervalId, setIntervalId] = useState(''); // interval 역정보쓸거 상태 추가(초당 검색)
    const [alwaysStation, setAlwaysStation] = useState(""); //버튼(키워드설정) 눌러도 해당역 계속 재생되게

    //사이드바 버튼 클릭 시 키워드 재설정
    const [newKeyword, setNewKeyword] = useState("");
    const setKeywordForSearch = (updatedKeyword) => {
        setNewKeyword(updatedKeyword);
    };

    //구글 api 유튜브 상태값 저장 (클릭시에 실행)
    const [onYoutubeSearch, setOnYoutubeSearch] = useState(false);

    //네이버 api 검색 상태값 저장 (클릭시에 실행)
    const [onNaverSearch, setOnNaverSearch] = useState(false);
 
    //메인에서 클릭한 항목(전국) 키워드값 갖고오기
    const location= useLocation();
    const mainKeyword = location.state?.keyword;


    /* -------------------- 맵 세팅 --------------------- */

    //맵 기본세팅
    useEffect(() => {
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(37.5558353, 126.937324),
            level: 2
        }; 
        
        const createdMap = new kakao.maps.Map(mapContainer, mapOption);
        setMap(createdMap); 

    }, []);



    // 지하철 정보 세팅용 useEffect 추가(초당 재검색)
    useEffect(() => {
        const fetchInfoInterval = setInterval(() => {
            // 지하철 정보 삭제
            setStationInfos([]);
            
            // 지하철 정보 다시 가져오기
            fetchStationInfo();
        }, 10000); //10초마다 -> 10초로 api가 지정되있음

        // 컴포넌트가 unmount될 때 interval 정리
        return () => clearInterval(fetchInfoInterval);
    }, [alwaysStation]); 

    //사이드바 버튼(주변 먹거리 등) 클릭 시 이벤트
    useEffect(() => {

        if (newKeyword === null) {
            // 현재 keyword를 다시 설정하여 재검색
            setKeyword(keyword);
        } else if (newKeyword) {
            searchPlaces(newKeyword);
            setNewKeyword(null);
        }
    }, [newKeyword]); // keyword가 변경될 때마다 검색 실행

    //메인에서 넘어온 키워드 이벤트
    useEffect(() => {
        if (mainKeyword && map) {
            handleSearch();
        }
    }, []);
    


    
    /*  ------------------------ 호출용 핸들러 호출 ------------------------ */

    //역검색 비동기호출 이벤트 핸들러
    const fetchStationInfo = async () => {
        setAlwaysStation(keyword);
        getStationInfo(alwaysStation);
    };
    // 유튜브 버튼 클릭 이벤트 핸들러
    const handleYoutubeButtonClick = () => {
        setOnYoutubeSearch(!onYoutubeSearch); // 유튜브 검색 상태 반전
        setOnNaverSearch(false); // 네이버 검색 상태는 항상 꺼짐

    };

    // 네이버 버튼 클릭 이벤트 핸들러
    const handleNaverButtonClick = () => {
        setOnNaverSearch(!onNaverSearch); // 네이버 검색 상태 반전
        setOnYoutubeSearch(false); // 유튜브 검색 상태는 항상 꺼짐

    };



    /* ------------------------기능들 ------------------------- */
 
    //서치버튼 실행
    const handleSearch = async () => {
        if(!keyword) {
            return alert("검색어를 입력해주세요!");
         }
         setShowSideButtons(true);
         

      let updatedKeyword = keyword;
     

      // 키워드 끝이 "역"으로 끝나지 않으면 "역"을 붙임
      if (!keyword.endsWith("역")) {
          updatedKeyword += '역';
      } 
      setStationInfos([]);
      fetchStationInfo(updatedKeyword);
      searchPlaces(updatedKeyword);  // 업데이트된 키워드를 전달
    };
  
  

    //키워드 서치 호출
    const searchPlaces = async(searchKeyword) => {
      if(!searchKeyword) return;

      console.log("검색 키워드:", searchKeyword);
      

      if (!searchKeyword.replace(/^\s+|\s+$/g, '')) {
          alert('검색어를 입력해주세요!');
          return false;
      }

      setKeyword(searchKeyword);    
      removeMarker();   
    //   getMarkerImage(searchKeyword); 
      //카맵 내부함수
      ps.keywordSearch(searchKeyword, placesSearchCB, {useMapBounds:true, size:15});

    };

  /* --------------------역 검색 --------------------- */

    //결과 파싱
    const parseXML = (xmlStr) => {
        const dom = new DOMParser();
        const xmlDoc = dom.parseFromString(xmlStr, "text/xml");
        const stations = xmlDoc.getElementsByTagName("row");
        const parsedData = Array.from(stations).map(station => {
        return {
            stationName: station.getElementsByTagName("statnNm")[0]?.textContent || '', //지하철 역명
            arrivalMessage: station.getElementsByTagName("arvlMsg2")[0]?.textContent || '', //도착,출발,진입
            subwayId: station.getElementsByTagName("subwayId")[0]?.textContent || '', //지하철 호선
            trainLineNm: station.getElementsByTagName("trainLineNm")[0]?.textContent || '', //도착지 방면(~행 (다음역 ))
            statnFid: station.getElementsByTagName("statnFid")[0]?.textContent || '', //이전 역 ID
            statnTid: station.getElementsByTagName("statnTid")[0]?.textContent || '', //다음 역 ID
            statnId: station.getElementsByTagName("statnId")[0]?.textContent || '' //현재 역 ID
        };

        });
        
        return parsedData;
    };

    //역검색
    const getStationInfo = async (inputValue) => {
        if(!inputValue) return;

        const API_KEY = process.env.REACT_APP_TRAIN_API;

        if (inputValue.endsWith("역")) {
            inputValue = inputValue.substring(0, inputValue.length - 1);
        }

        try {
            const response = await axios.get(`${API_KEY}${inputValue}`);

            if (response.status >= 500) {
                alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
            } else if (response.status >= 400) {
                alert("요청이 잘못되었습니다. 입력 값을 확인해주세요.");
            } else {
                const parsedData = parseXML(response.data);
                console.log("지하철 : ",parsedData);
                setStationInfos(parsedData);

                
            }
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
        }

    };


  /* --------------------카카오맵 검색 --------------------- */

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      console.log("장소 검색 콜백 호출됨. 상태:", status);
      if (status === kakao.maps.services.Status.OK) {

          // 검색 목록과 마커를 표출합니다
          displayPlaces(data);

          // 페이지 번호를 표출합니다
          displayPagination(pagination);

      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

          alert('검색 결과가 존재하지 않습니다.');
          return;

      } else if (status === kakao.maps.services.Status.ERROR) {

          alert('검색 결과 중 오류가 발생했습니다.');
          return;

      }

    }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function(marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });

                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout =  function () {
                    infowindow.close();
                };
            })(marker, places[i].place_name);

                    
            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        console.log("map :", map);
        
        // 검색된 첫 번째 장소를 중심으로 지도를 이동합니다.
        if(places[0]) {
            map.setCenter(new kakao.maps.LatLng(places[0].y, places[0].x));
        }
    
    
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {


        var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                    '<div class="info">' +
                    '   <h5>' + places.place_name + '</h5>';
      
        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>';
                        // +'   <span class="jibun gray">' +  places.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  places.address_name  + '</span>'; 
        }
                    
          itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                    '</div>';           
      
        el.innerHTML = itemStr;
        el.className = 'item';
      
        //클릭이벤트 -> 클릭 시 맵 중앙으로 , 유튜브 영상 검색
        el.onclick = function() {
            var placePosition = new kakao.maps.LatLng(places.y, places.x);
            map.setCenter(placePosition);
            setKeyword(places.place_name);
        }
      
        return el;
      }
      
    // // 이미지 경로를 키워드에 따라 동적으로 설정
    // function getMarkerImage(searchKeyword)   {

    //     console.log("marker set",searchKeyword);
    //     let markerImageSrc = '';

    //     // 키워드에 따라 마커 이미지 선택
    //     if (searchKeyword.includes('주변맛집')) {
    //         markerImageSrc = 'https://img.icons8.com/3d-fluency/94/hamburger.png';
    //     }
    //     else if (searchKeyword.includes('주변명소')) {
    //         markerImageSrc = 'https://img.icons8.com/3d-fluency/94/big-ben.png';
    //     } 
    //     else if (searchKeyword.includes('주변공원')) {
    //         markerImageSrc = 'https://img.icons8.com/3d-fluency/94/coniferous-tree.png';
    //     } 
    //     //기본
    //     else {
    //         markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    //     }
       

    //     return markerImageSrc;
    // }




    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {

        // var markerImageSrc = getMarkerImage(keyword);
        
        // var imageSrc = markerImageSrc
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        var imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
              spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
              spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
              offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
              marker = new kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage 
          });


        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        // // 기존 마커의 이미지를 키워드에 맞춰 업데이트
        // if (markers.length > 0) {
        //     markers[0].setImage(new kakao.maps.MarkerImage(markerImageSrc, imageSize, imgOptions));
        // }

        // 기존에 있는 코드 부분
        kakao.maps.event.addListener(marker, 'click', function() {
            map.setCenter(position); 
        });

      
      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
          markers[i].setMap(null);
      }   
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
          fragment = document.createDocumentFragment(),
          i; 

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild (paginationEl.lastChild);
      }

      for (i=1; i<=pagination.last; i++) {
          var el = document.createElement('a');
          el.href = "#";
          el.innerHTML = i;

          if (i===pagination.current) {
              el.className = 'on';
          } else {
              el.onclick = (function(i) {
                  return function() {
                      pagination.gotoPage(i);
                  }
              })(i);
          }

          fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {   
      while (el.hasChildNodes()) {
          el.removeChild (el.lastChild);
      }
    }



    const resetClick = () => {
        // 페이지를 새로 고침
        window.location.reload();
      }
      


    /*------------------네이버 서치 호출------------------ */

    

return (
    <>
    <AddMapCustomControlStyle />
    <div className="map_wrap" style={{ position: "relative" }}>
        
        <div id="map"  style={{width: "100%", height: "100%",position: "relative", overflow: "hidden"}}>
      {/* sidebar */}
      <div className={Mstyles.flexContainer}> 
                <div id="info" className={Mstyles.info}>
                    <div id = "menu_wrap">
                    <div id="info.header" className={Mstyles.header}>
                        <div id="info.header.main" className="main">
                            <div role="navigation">
                                <h4 className="screen_out">검색</h4>
                                <ul className={Mstyles.menu}>
                                    <li id="search.tab1" className="keyword keyword-ACTIVE">
                                    <input
                                        name="searchBar"
                                        id="keyword"
                                        type="text"
                                        className="form-control rounded-pill"
                                        placeholder="지역을 입력해주세요!"
                                        onChange={(e) => {
                                            // 지하철 정보 검색 중지
                                            if (intervalId) {
                                                clearInterval(intervalId);
                                                setIntervalId(null); // intervalId 상태 초기화
                                            }

                                            setKeyword(e.target.value); // 키워드 상태 업데이트
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.which === 13 || e.keyCode === 13) handleSearch(keyword);
                                        }}
                                        style={{ border:"2px #000" }}
                                    />


                                        <br></br>
                                        <a className="btn btn-light" 
                                        style={{width: "100%", border:"1px solid #919191"}}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onClick={() =>handleSearch(keyword)}
                                        >검색 👉</a>
                                    </li>

                                    <li id="search.tab5"  className="">
                                        <a href="#" className="mainmenutab" title="검색결과"></a>
                                        <ul id="placesList"></ul>
                                        <ul id="pagination"></ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            {/* end sidebar */}

            {/* 사이드바 지하철정보 출력 */}
            <StationInfo stationInfos={stationInfos} />

            {/* 사이드바 기본 기능 버튼 지도 + 키워드 */}
            {
                showSideButtons && <SideButtons 
                    handleSearchWithKeyword={searchPlaces}
                    keyword={keyword}
                    setKeywordForSearch={setKeywordForSearch}
                />
            }   

            {/* 사이드바 api 호출 버튼들 지하철, 네이버 ,유튜브 등 */}
            <button 
                className={styles.sideApiButton}
                style={{ zIndex: 1001, top: '10vh' }}
                onClick={ () => 
                fetchStationInfo(keyword)}>
                역정보🚉
            </button>
            <button 
                className={styles.sideApiButton}
                style={{ zIndex: 1001, top: '15vh' }}
                onClick={handleYoutubeButtonClick}> 
                유튜브🖥️
            </button>
            {onYoutubeSearch &&
             <YoutubeSearch keyword={keyword} onYoutubeSearch={onYoutubeSearch}/>} 

            <button 
                className={styles.sideApiButton}
                style={{ zIndex: 1001, top: '20vh' }}
                onClick={handleNaverButtonClick}>
                포스팅📄
            </button>
            {onNaverSearch &&
             <NaverSearch keyword={keyword} onNaverSearch={onNaverSearch}/>}
            
            <button 
                className={styles.sideApiButton}
                style={{ zIndex: 1060, top: '90vh' , left:'40%', width:'20%', position: 'absolute', background:'black', color: 'white'}}
                onClick={resetClick}> 
                리셋! 고장나면 눌러주세요!
            </button>&
        </div>
        {/* end map */}
        
      </div>
</> 
);

}
