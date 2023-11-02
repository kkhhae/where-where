import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./google.module.css";


function YoutubeSearch({ keyword, onYoutubeSearch }) {
    const [videos, setVideos] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    useEffect(() => {
        if (onYoutubeSearch) {
            console.log('유튜브서치!')
            getYoutubeVideos(keyword);
        }
    }, []);
    

    // 검색 함수
    const getYoutubeVideos = async (keyword) => {
        try {
            const response = await axios.get("https://youtube.googleapis.com/youtube/v3/search", {
                params: {
                    key: process.env.REACT_APP_GOOGLE_KEY,
                    part: "snippet",
                    maxResults: 1,
                    q: keyword,
                    type: "video",
                    regionCode: "KR",
                }
            });
            if(response.status === 200){
            setVideos(response.data.items);
            setSelectedVideoId(response.data.items[0].id.videoId);
            console.log(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={styles.showYoutubeSearch}>
            {onYoutubeSearch && videos.map((video, index) => (
                <div key={video.id.videoId} className={styles.videoItem}>
                    {selectedVideoId === video.id.videoId ? (
                        <iframe
                            width="100%"
                            height="600px"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            frameBorder="0"
                            allowFullScreen>
                        </iframe>
                    ) : (
                        <p onClick={() => { setSelectedVideoId(video.id.videoId) }}>
                            {video.snippet.title}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default YoutubeSearch;
