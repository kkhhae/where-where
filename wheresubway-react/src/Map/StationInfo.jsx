import React from 'react';
import styles from './MapSide.module.css';

function StationInfo({ stationInfos }) {
    return (
        <>
        <div className={styles.stationView} style={{ display: stationInfos.length > 0 ? 'block' : 'none', zIndex: 1003 ,textAlign:"center"}}>
            <p>실시간 역정보🚋</p>
            {stationInfos.map((info, index) => (
                <li key={index}>
                    {info.stationName}: {info.arrivalMessage} 
                    / {info.trainLineNm}
                    
                    <br/>
                </li>
            ))}

        </div>
       
    </>
    );
}

export default StationInfo;
