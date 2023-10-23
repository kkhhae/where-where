import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMapCustomControlStyle from './addMapCustomControlStyle.module';


export default function BasicMap() {
  const {kakao} = window; 
  const ps = new kakao.maps.services.Places();

  const [stationInfos, setStationInfos] = useState([]);
  const [keyword, setKeyword] = useState(null); // 키워드 검색 값 상태
  const [map, setMap] = useState(null); //map세팅


  const [intervalId, setIntervalId] = useState(''); // interval ID 상태 추가(초당 검색)

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
  }, []);
  


  //검색어 키워드등록
  const hand = (e) => { 
    let inputValue = e.target.value;
    setKeyword(inputValue);
  }

  //서치버튼 눌렀을때 실행
  const handleSearch = async () => {
    searchPlaces();  //카카오맵 호출
    fetchStationInfo(); //역 정보 호출
   
    if (intervalId) {
        clearInterval(intervalId);
    }
    const newIntervalId = setInterval(fetchStationInfo, 20000); // 역정보 20초마다 호출
    setIntervalId(newIntervalId);
  };

//키워드 서치 호출
const searchPlaces = async() => {
  console.log("검색 키워드:", keyword);
  console.log("검색 지역 : ", map);


  if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  const updatedKeyword = keyword + '역';
  setKeyword(updatedKeyword);
  console.log(keyword);

  ps.keywordSearch(updatedKeyword, placesSearchCB); 
}

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

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB (data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {

      
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       
        if(map){
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    } 
  }

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x) 
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
  });
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
      name="keyword"
      id="keyword"
      type="text"
      className="form-control rounded-pill"
      placeholder="2호선 역명을 입력해주세요! ex. 신촌, 역명은 제외됩니다!"
      // value={keyword}

      onChange={hand}
      onKeyPress={(e) => {
        if (e.which === 13 || e.keyCode === 13) handleSearch(keyword);
      }}
    />
        <div style={{zIndex:1000, backgroundColor:"white"}}>
          {stationInfos.length > 0 && (
              <ul>
              {stationInfos.map((info, index) => (
                  <li key={index}>
                      {info.stationName}: {info.arrivalMessage} 
                      / subwayId: {info.subwayId} / trainLineNm: {info.trainLineNm} / statnFid: {info.statnFid} / statnTid: {info.statnTid} / statnId: {info.statnId}
                  </li>
              ))}
              </ul>
          )}
        </div>

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
