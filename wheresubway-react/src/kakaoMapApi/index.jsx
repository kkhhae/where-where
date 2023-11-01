import React, { useContext, useEffect, useState} from 'react';
import KeywordContext from '../Component/useKeyword';

const {kakao} = window;


function KakaoMap(){
    // const [searchedKeyword, setSearchedKeyword] = useState('');
    const mapRef = React.useRef(null);
    const infowindowRef = React.useRef(new kakao.maps.InfoWindow({ zIndex: 1 }));
    
    //키워드 가져오기
    var keyword = useContext(KeywordContext);

    useEffect(() => {
        // 지도를 표시할 div 생성
        var mapContainer = document.getElementById('map');
        
        // 지도 화면 설정
        var mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도 생성
        mapRef.current = new kakao.maps.Map(mapContainer, mapOption);

        // 장소 검색 객체 생성
        var ps = new kakao.maps.services.Places(); 

        // 키워드로 장소 검색
        // ps.keywordSearch(keyword, placesSearchCB);
        ps.keywordSearch(keyword, placesSearchCB);
    }, [keyword]);

    /*=================== 기능 구현=====================*/


    
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {

        if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();
            let markers = [];
            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       

            
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            mapRef.current.setBounds(bounds);
        } 
    }

    
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {

        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindowRef.current.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindowRef.current.open(mapRef.current, marker);
        });
    }


    return (
        <div id='map' style={{
            width: '120vh',
            height: '60vh'
        }}>
        </div>
    );
}
export default KakaoMap;   

  
