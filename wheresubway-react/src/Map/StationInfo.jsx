import React from 'react';
import styles from './MapSide.module.css';

function StationInfo({ stationInfos }) {
    return (
        <>
        <div className={styles.stationView} style={{ display: stationInfos.length > 0 ? 'block' : 'none', zIndex: 1003 }}>
            <p style={{textAlign:"center"}}> - ㅇ - ㅇ -</p>

            {stationInfos.map((info, index) => (
                <li key={index}>
                    {info.stationName}: {info.arrivalMessage} 
                    / {info.trainLineNm}
                </li>
            ))}
        </div>
       
    </>
    );
}

export default StationInfo;
