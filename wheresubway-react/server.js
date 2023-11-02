// npm install react-chartjs-2 chart.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const readline = require('readline');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const clients = []; // SSE 클라이언트를 저장할 배열

// 초기 데이터를 rankingData에 저장
let rankingData = [
  {
    name: "홍대입구역",
    rank: 1,
    score: 100.0,
    delta: 3
  },
  {
    name: "이태원역",
    rank: 2,
    score: 95.0,
    delta: -1
  },
  {
    name: "압구정역",
    rank: 3,
    score: 90.0,
    delta: 0
  },
  {
    name: "서울역",
    rank: 4,
    score: 85.0,
    delta: 2
  },
  {
    name: "잠실역",
    rank: 5,
    score: 80.0,
    delta: -2
  },
  {
    name: "신사역",
    rank: 6,
    score: 75.0,
    delta: 0
  },
  {
    name: "합정역",
    rank: 7,
    score: 70.0,
    delta: 2
  },
  {
    name: "동대문역",
    rank: 8,
    score: 65.0,
    delta: 1
  },
  {
    name: "혜화역",
    rank: 9,
    score: 60.0,
    delta: -1
  },
  {
    name: "용산역",
    rank: 10,
    score: 55.0,
    delta: -3
  } 
];

// SSE 라우트 설정
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 새 클라이언트를 clients 배열에 추가
  clients.push(res);

  // 클라이언트 연결 해제 시 처리
  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });

  // 순위 정보를 주기적으로 클라이언트에게 전송
  const sendRankingData = () => {
    // 이전 순위 저장
    // const prevRankingData = [...rankingData];
    const prevRankingData = JSON.parse(JSON.stringify(rankingData));


    // score에 변동분을 더하고 빼기 (10% 범위)
    rankingData = rankingData.map((item, index) => {
      const score_delta = (Math.random() * 0.2 - 0.1);
      item.score = Math.max(1, item.score + score_delta * item.score);

      return item;
    });

    // score를 기반으로 순위를 다시 계산
    rankingData.sort((a, b) => b.score - a.score);
    rankingData.forEach((item, index) => {
      item.rank = index + 1;
    });

    // console.log(prevRankingData);
    // console.log(rankingData);
    // process.exit();
    
    // 이전 순위 대비 변동폭 계산
    rankingData.forEach((item, index) => {
      const prevItem = prevRankingData.find(prev => prev.name === item.name);
      item.delta = prevItem ? prevItem.rank - item.rank : 0;
    });

    const eventData = {
      rankingData: rankingData,
    };

    // 모든 클라이언트에 데이터 전송
    clients.forEach(client => {
      client.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });
  };

  const intervalId = setInterval(sendRankingData, 8000); // 5초에 한 번 데이터 업데이트

  // stop 명령을 입력하면 클라이언트에게 전송 중단
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('서버 전송을 중단하려면 "stop"을 입력하세요:\n', input => {
    if (input === 'stop') {
      rl.close();
      res.end();
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
