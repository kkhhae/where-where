  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import AddMapCustomControlStyle from './addMapCustomControlStyle.module';
  import { useLocation } from "react-router-dom";

  export default function BasicMap() {
    const {kakao} = window; 
    const ps = new kakao.maps.services.Places();
    var markers = [];
    const [stationInfos, setStationInfos] = useState([]);
    const [keyword, setKeyword] = useState(null); // 키워드 검색 값 상태
    const [map, setMap] = useState(null); //map세팅
    const [intervalId, setIntervalId] = useState(''); // interval ID 상태 추가(초당 검색)

    //메인 검색결과값 가져오기
    const location = useLocation();
    const keywordFromFirstPage = location.state?.keyword || "";
    console.log("main keyword", keywordFromFirstPage);
    console.log("현재 설정된 키워드:", keyword);
    /* -------------------- 맵 세팅 --------------------- */
  
    //기본세팅
    useEffect(() => {
    
      var mapContainer = document.getElementById('map');
      var mapOption = {
          center: new kakao.maps.LatLng(37.5558353, 126.937324),
          level: 3
      }; 
      
      const createdMap = new kakao.maps.Map(mapContainer, mapOption);
      setMap(createdMap); 
      if (keyword) {
        handleSearch();
    }
      if (keywordFromFirstPage) {
        setKeyword(keywordFromFirstPage);
        handleSearch();
    }
      //keyword값 검사 후 실행 (비동기 방지)
    }, [keyword]);
    


    //검색어 키워드등록
    const hand = (e) => { 
      let inputValue = e.target.value;
      setKeyword(inputValue);
    }

    //서치버튼 실행
    const handleSearch = async () => {
      if(!keyword) return;  // keyword가 없으면 함수 실행 중지
  
      let updatedKeyword = keyword;
      if (!keyword.endsWith("역")) {
          updatedKeyword += '역';
      }
      searchPlaces(updatedKeyword);  // 업데이트된 키워드를 전달
      fetchStationInfo();
  
      if (intervalId) {
          clearInterval(intervalId);
      }
      const newIntervalId = setInterval(fetchStationInfo, 20000); // 역정보 20초마다 호출
      setIntervalId(newIntervalId);
    };
  
  

    //키워드 서치 호출
    const searchPlaces = async(searchKeyword) => {
      if(!searchKeyword) return;

      console.log("검색 키워드:", searchKeyword);
      console.log("검색 지역 : ", map);

      if (!searchKeyword.replace(/^\s+|\s+$/g, '')) {
          alert('키워드를 입력해주세요!');
          return false;
      }

      console.log("ps.keywordSearch 호출");
      ps.keywordSearch(searchKeyword, placesSearchCB, {useMapBounds:true, size:5}); 
    };

  /* --------------------역 검색 --------------------- */

  //역검색 비동기호출
  const fetchStationInfo = async () => {
    await getStationInfo(keyword);
  };

  //파싱
  const parseXML = (xmlStr) => {
      const dom = new DOMParser();
      const xmlDoc = dom.parseFromString(xmlStr, "text/xml");
      const stations = xmlDoc.getElementsByTagName("row");
      const parsedData = Array.from(stations).map(station => {
          return {
              stationName: station.getElementsByTagName("statnNm")[0]?.textContent || '',
              arrivalMessage: station.getElementsByTagName("arvlMsg2")[0]?.textContent || '',
              subwayId: station.getElementsByTagName("subwayId")[0]?.textContent || '',
              trainLineNm: station.getElementsByTagName("trainLineNm")[0]?.textContent || '',
              statnFid: station.getElementsByTagName("statnFid")[0]?.textContent || '',
              statnTid: station.getElementsByTagName("statnTid")[0]?.textContent || '',
              statnId: station.getElementsByTagName("statnId")[0]?.textContent || ''
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
  }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {

      var el = document.createElement('li'),
      itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                  '<div class="info">' +
                  '   <h5>' + places.place_name + '</h5>';

      if (places.road_address_name) {
          itemStr += '    <span>' + places.road_address_name + '</span>' +
                      '   <span class="jibun gray">' +  places.address_name  + '</span>';
      } else {
          itemStr += '    <span>' +  places.address_name  + '</span>'; 
      }
                  
        itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                  '</div>';           

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
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

    return (
      <>
        <AddMapCustomControlStyle />
        <div className="map_wrap" style={{ position: "relative" }}>
        <div 
          id="map" 
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden"
          }}
        ></div>


        <div
          className="col-lg-8 align-self-baseline"
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <input
              name="searchBar"
              id="keyword"
              type="text"
              className="form-control rounded-pill"
              placeholder="2호선 역명을 입력해주세요! ex. 신촌, 역명은 제외됩니다!"
              // value={keyword}

              onChange={hand}
              onKeyPress={(e) => {
                if (e.which === 13 || e.keyCode === 13) handleSearch(keyword);
              }}
              style={{
                border:"2px #000"
              }}
          />
        </div> 

        <div style={{zIndex:1000, backgroundColor:"white", float:"left", position: "absolute",
          top: "200px", left: "20%", transform: "translateX(-100%)"}}>
            {/* 역 정보 호출 */}
            {stationInfos.length > 0 && (
                <ul>
                {stationInfos.map((info, index) => (
                    <li key={index}>
                        {info.stationName}: {info.arrivalMessage} 
                        / {info.trainLineNm}
                    </li>
                ))}
                </ul>
            )}
        </div>
        <div id="menu_wrap" className="bg_white" style={{zIndex:1000, backgroundColor:"white", float:"right", position: "absolute",
          top: "200px", left: "20%", transform: "translateX(300%)"}}>
              <ul id="placesList"></ul>
              <div id="pagination"></div>
        </div>
        


        </div>
        <div className="custom_zoomcontrol radius_border">
          <span onClick={() => map && map.setLevel(map.getLevel() - 1)}>
            +
          </span>
          <span onClick={() => map && map.setLevel(map.getLevel() + 1)}>
            -
          </span>
        </div>
      
      </>
    );
  }
