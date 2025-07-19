import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUjqj7MgM12ZDtNwUwl4-lwisKq134sK4",
  authDomain: "nubattle-7d23c.firebaseapp.com",
  databaseURL: "https://nubattle-7d23c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nubattle-7d23c",
  storageBucket: "nubattle-7d23c.appspot.com",
  messagingSenderId: "1058629130807",
  appId: "1:1058629130807:web:51de42073135086bc37db2",
  measurementId: "G-77LYV5DRY5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let roomId = prompt("部屋番号を入力してください");
let myPlayerId = null;
let myUsedNumbers = [];
let currentTurn = 1;
let scores = { player1: 0, player2: 0 };

const gameRef = ref(db, `rooms/${roomId}`);

async function joinRoom() {
  const snapshot = await get(gameRef);
  const data = snapshot.val();

  if (!data) {
    await set(gameRef, {
      player1: true,
      currentTurn: 1,
      scores: { player1: 0, player2: 0 }
    });
    myPlayerId = "player1";
  } else if (!data.player2) {
    await update(gameRef, { player2: true });
    myPlayerId = "player2";
  } else {
    alert("満員です！");
  }

  listenToGame();
  setupUI();
}

function setupUI() {
  const board = document.getElementById("board");
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "num-btn";
    btn.onclick = () => submitNumber(i, btn);
    board.appendChild(btn);
  }
}

function submitNumber(num, btn) {
  if (myUsedNumbers.includes(num)) return;

  set(ref(db, `rooms/${roomId}/turns/${currentTurn}/${myPlayerId}`), num);
  myUsedNumbers.push(num);
  btn.disabled = true;
  btn.classList.add("used");
}

function listenToGame() {
  const turnsRef = ref(db, `rooms/${roomId}/turns`);
  onValue(turnsRef, (snapshot) => {
    const turns = snapshot.val();
    if (!turns) return;

    const turnData = turns[currentTurn];
    if (turnData && turnData.player1 && turnData.player2) {
      // 勝敗判定
      const p1 = turnData.player1;
      const p2 = turnData.player2;
      let winner = null;
      if (p1 > p2) winner = "player1";
      else if (p2 > p1) winner = "player2";

      if (winner) {
        scores[winner]++;
        update(ref(db, `rooms/${roomId}/scores`), scores);
      }

      // ターン進める
      currentTurn++;
      update(ref(db, `rooms/${roomId}`), { currentTurn });

      // ゲーム終了
      if (currentTurn > 9) {
        let result = "引き分け！";
        if (scores.player1 > scores.player2) result = "プレイヤー1の勝ち！";
        if (scores.player2 > scores.player1) result = "プレイヤー2の勝ち！";
        alert(`ゲーム終了！\n${result}`);
      }
    }
  });
}

joinRoom();
