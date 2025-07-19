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

let player = null;
let opponent = null;
let roomId = '';
let used = [];
let currentTurn = 1;
let scores = { my: 0, opp: 0 };

document.getElementById("joinBtn").onclick = async () => {
  roomId = document.getElementById("roomInput").value;
  if (!roomId) return alert("部屋番号を入れてね");

  const roomRef = ref(db, `rooms/${roomId}`);
  const snap = await get(roomRef);
  const data = snap.val();

  if (!data || !data.player1) {
    player = "player1";
    opponent = "player2";
    await set(roomRef, { player1: true, turns: {} });
  } else if (!data.player2) {
    player = "player2";
    opponent = "player1";
    await update(roomRef, { player2: true });
  } else {
    alert("部屋が満員です");
    return;
  }

  document.getElementById("entry").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("role").textContent = player;

  setupButtons();
  listenForTurns();
};

function setupButtons() {
  const grid = document.getElementById("numberGrid");
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => play(i, btn);
    grid.appendChild(btn);
  }
}

function play(num, btn) {
  if (used.includes(num) || currentTurn > 9) return;

  used.push(num);
  btn.disabled = true;
  btn.style.background = "#ccc";

  set(ref(db, `rooms/${roomId}/turns/turn${currentTurn}/${player}`), num);
}

function listenForTurns() {
  const turnsRef = ref(db, `rooms/${roomId}/turns`);
  onValue(turnsRef, (snapshot) => {
    const turns = snapshot.val() || {};
    currentTurn = Object.keys(turns).length + 1;
    document.getElementById("turn").textContent = Math.min(currentTurn, 9);

    scores = { my: 0, opp: 0 };

    for (let t in turns) {
      const mine = turns[t][player];
      const opp = turns[t][opponent];

      if (mine && opp) {
        if (mine > opp) scores.my++;
        else if (mine < opp) scores.opp++;
      }
    }

    document.getElementById("myScore").textContent = scores.my;
    document.getElementById("opponentScore").textContent = scores.opp;

    if (Object.keys(turns).length === 9) {
      const result = scores.my > scores.opp ? "勝ち！" : scores.my < scores.opp ? "負け…" : "引き分け！";
      alert(`ゲーム終了！\nあなた：${scores.my}点\n相手：${scores.opp}点\n→ ${result}`);
    }
  });
}
