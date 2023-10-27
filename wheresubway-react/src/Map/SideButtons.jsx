import React, {useState} from 'react';
import styles from './MapSide.module.css';


function SideButtons({ onFetchStationInfo, setKeywordForSearch, keyword, youtubeSearch}) {

    const [clickedButton, setClickedButton] = useState(null); // null: 아무 버튼도 클릭되지 않음
    const [showGoogleSearch, setShowGoogleSearch] = useState(false);


    // 키워드를 수정하는 함수
    const handleButtonClick = (addition, buttonType) => {
        let updatedKeyword = keyword;

        // 버튼의 키워드 값을 리스트로 등록
        const allButtons = ['주변맛집', '주변명소', '주변공원', '주변주유소', '주변정류장'];

        // 이미 추가된 키워드를 제거
        allButtons.forEach(btn => {
            if (updatedKeyword.includes(btn)) {
                updatedKeyword = updatedKeyword.replace(btn, '').trim();
            }
        });

        // 새로 누른 버튼의 키워드를 추가
        updatedKeyword = `${updatedKeyword} ${addition}`.trim();
        // 변경된 키워드로 설정
        setKeywordForSearch(updatedKeyword);
        // 클릭된 버튼 상태 업데이트
        setClickedButton(buttonType);
    };

    
    return (
        <div className={styles.buttonContainer}>
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '10vh' }}
                onClick={onFetchStationInfo}>
                역정보🚉
            </button>
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '15vh' }}
                onClick={() => handleButtonClick(`주변맛집`, 'food')}>
                맛집🍗
            </button>
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '20vh' }}
                onClick={() => handleButtonClick(`주변명소`, 'view')}>
                 명소🤔
            </button>
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '25vh' }}
                onClick={() => handleButtonClick(`주변공원`, 'park')}>
                 공원🌲
            </button>
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '30vh' }}
                onClick={youtubeSearch}>
                유튜브👆
            </button>
            {/* <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '30vh' }}
                onClick={() => {
                    setShowGoogleSearch(true); // props로 전달받은 함수 호출
                }}>
                유튜브👆
            </button> */}
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '35vh' }}
                onClick={() => handleButtonClick(`주변주유소`, 'play')}>
                 주유소⛽️
            </button>
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '40vh' }}
                onClick={() => handleButtonClick(`주변정류장`, 'busstop')}>
                 정류장🚌
            </button>
            <button 
                className={styles.sideButton}
                style={{ zIndex: 1001, top: '45vh' }}
                onClick={() => handleButtonClick(`주변화장실`, 'toilet')}>
                 화장실🚾
            </button>
        </div>
    );
}

export default SideButtons;
