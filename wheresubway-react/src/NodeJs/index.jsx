import React, { useEffect, useState } from 'react';
import './style.css';

function RealtimePlay() {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/sse');

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setRankingData(eventData.rankingData);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div >
        <h2 className="text-white mt-0">실시간 역 인기도 조회 👍</h2>
      <table >
        <thead>
          <tr>
            <th>역 명</th>
            <th>순 위</th>
            <th>조회수 변동폭</th>
          </tr>
        </thead>
        <tbody >
          {rankingData.slice(0, 5).map((item, index) => (
            <tr key={index} className={item.delta === -1 || item.delta === 1 ? 'positive-change' : ''}>
              <td>{item.name}</td>
              <td>{item.rank}</td>
              <td>{item.delta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RealtimePlay;
