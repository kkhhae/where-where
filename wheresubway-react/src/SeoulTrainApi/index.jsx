import React, { useState } from 'react';
import axios from 'axios';


//미사용중.
function StationInfo() {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState(null);

    const getStationInfo = async () => {
        try {
            const response = await axios.get(`keyword=${keyword}`);
            console.log("station 정보조회 성공")
            setData(response.data);
            
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
        }
    };

    return (
        <div>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default StationInfo;
