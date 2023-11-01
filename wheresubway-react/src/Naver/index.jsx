import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './naver.module.css';

function NaverSearch({keyword, onNaverSearch}) {

    
    const [results, setResults] = useState([]);
  
    useEffect(() => {
        if (onNaverSearch) {
            console.log('네이버서치!')
            getNaverSearchResults(keyword);
        }
    }, [onNaverSearch, keyword]);


    const getNaverSearchResults = async (keyword) => {
    try {
        const api_url = `v1/search/blog.json`
        const response = await axios.get(api_url, {
            params:{
                query:`${decodeURI(keyword)}`,
                display:5,
                start:1,
                sort:'sim'
            },
            headers: {
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT, 
            'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SECRET
            }
        }); 

        if (response.status === 200) {
            setResults(response.data.items);
            console.log(response.data.items);
        }
        } catch (error) {
        console.error(error);
        }
    };

    

    return (
        <div className={styles.naverSearch}>
            <h4 style={{textAlign:'center'}}>포스팅 검색 결과</h4>
            <br/>
            {results.map((result, index) => (
                <div key={index}>
                <h5>{result.title.replace(/<[^>]+>/g, '') || result.title.replace("&quot;" , ' ') || result.title.replace("&gt", '') || result.title.replace("&amp;", '') }</h5>  {/* 태그 제거 부분 */}
                <p>{result.description.replace(/<[^>]+>/g, '') || result.description.replace("&gt", '') || result.description.replace("&quot;" , ' ') || result.description.replace("&amp;", '')}</p>  {/* 태그 제거 부분 */}
                <a href={result.link} target="_blank" rel="noreferrer">Read more</a>
                <br/>
                <br/>
                </div>
            ))}
        </div>
    );
}





export default NaverSearch;
