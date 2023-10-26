import React, { useContext, useState } from 'react';
import axios from 'axios';
import KeywordContext from '../../Component/useKeyword';
import KakaoMap from '../../kakaoMapApi';


//미사용
function Station(props) {
    const {keyword, setKeyword} = useContext(KeywordContext);
    const [stationInfos, setStationInfos] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    const fetchStationInfo = async () => {
        await getStationInfo(keyword);
    };

    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        // 뒤에 "역"이 붙으면 "역" 제거
        if (inputValue.endsWith("역")) {
            inputValue = inputValue.substring(0, inputValue.length - 1);
        }
        setKeyword(inputValue);
    };

    const handleSearch = () => {
        fetchStationInfo();
        if (intervalId) {
            clearInterval(intervalId);
        }
        const newIntervalId = setInterval(fetchStationInfo, 20000); // 20초마다 호출
        setIntervalId(newIntervalId);
    };

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

    const getStationInfo = async (inputValue) => {
        
        try {
            const response = await axios.get(`http://swopenAPI.seoul.go.kr/api/subway/47636646486b686f36344563434d6c/xml/realtimeStationArrival/0/5/${inputValue}`);
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



    return (
        <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-8 align-self-end">       
                    <br/><br/><br/><br/><br/><br/>
                    <h4 className="text-black font-weight-bold">지도</h4>
                    <hr className="divider" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                    <label htmlFor="searchBox"></label>
                    <input
                    name="keyword"
                    id="searchBox"
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="2호선 역명을 입력해주세요! ex. 신촌, 역명은 제외됩니다!"
                    value={keyword}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                        if (e.which === 13 || e.keyCode === 13) handleSearch(keyword);
                    }}

                    
                    />
                    <button 
                        className="btn btn-primary btn-xs" 
                        value={keyword} 
                        onClick={handleSearch}
                    > search!</button>
                    <div className="input-group-append"></div>
                    
                </div>
                <div className="mx-auto mt-5 search-bar input-group mb-3"></div>
                <KakaoMap/>
                {/* <button className="btn btn-primary btn-xs" onclick={() => setZoomable(false)}>지도 확대/축소 끄기</button>
                <button className="btn btn-primary btn-xs" onclick={() => setZoomable(true)}>지도 확대/축소 켜기</button> */}
                <div className="col-lg-8 align-self-baseline"></div>
            </div>
            <br />
            <br />
            <br />
            <div>
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
    );
}

export default Station;
