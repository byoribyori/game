function d(e) {
  return document.getElementById(e);
}

function change(e) {
  return `${e % 13 ? Math.floor(e / 13) : e / 13 - 1}${e % 13 ? e % 13 : 13}`;
}
function Mchange(e) {
  return e % 13 ? Math.floor(e / 13) : e / 13 - 1;
}
function Nchange(e) {
  return e % 13 ? e % 13 : 13;
}
function Wchange(e) {
  return Mchange(e) * 2 + (Nchange(e) > 7 ? 1 : 0);
}

//css設定
const one_card = Math.min(innerWidth / 15, innerHeight / 9);
d('style').innerHTML += `
th>div{
  width:${one_card / 1.5}px;
  height:${one_card}px;
  border-radius:${one_card / 10}px;
  font-size:${one_card / 3.5}px;
  line-height:${one_card / 2 - 1}px;
}
table{
  margin:${one_card * 1.3}px auto 0 auto;
}
`;

//カード作成
let table = '';
for (let i = 0; i < 4; i++) {
  table += '<tr>';
  for (let j = 1; j < 14; j++) {
    table += `<th><div id=${i}${j} class=m${i}>
    ${i == 0 ? '♣' : i == 1 ? '♦' : i == 2 ? '♠' : '♥'}<br>${j == 1 ? 'A' : j == 11 ? 'J' : j == 12 ? 'Q' : j == 13 ? 'K' : j}</div></th>`;
  }
  table += '</tr>';
}
d('table').innerHTML = table;

//css設定2
d('style').innerHTML += `
.player{
  width: ${(innerWidth - d('table').getClientRects()[0].width) / 2.5}px;
  font-size:${(innerWidth - d('table').getClientRects()[0].width) / 29}px;
  text-align:center;
  border-bottom:solid 2px;
}
#opponent1{
  position: absolute;
  left: 0;
  top: ${one_card * 3}px;
}
#opponent3{
  position: absolute;
  right: 0;
  top: ${one_card * 3}px;
}
#I{
  position:absolute;
  left:0;
  top:${one_card * 7}px;
}`;

let ranking = [1, 4];

//スタート
d('start').onclick = () => {
  d('start').remove();

  //位置のデータ
  let position_data = {};
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 14; j++) {
      position_data[`${i}${j}`] = [d(`${i}${j}`).getClientRects()[0].top, d(`${i}${j}`).getClientRects()[0].left];
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 14; j++) {
      d(`${i}${j}`).style = `position:absolute;top:${position_data[`${i}${j}`][0]}px;left:${position_data[`${i}${j}`][1]}px`;
    }
  }
  for (let i = 1; i < 14; i++) {
    position_data[`m${i}`] = [position_data[`3${i}`][0] + one_card * 2.5, position_data[`3${i}`][1]];
  }
  position_data['o1'] = [d('opponent1').getClientRects()[0].top + d('opponent1').getClientRects()[0].height * 1.2,
  d('opponent1').getClientRects()[0].left + (d('opponent1').getClientRects()[0].width - one_card / 1.5) / 2];
  position_data['o2'] = [d('opponent2').getClientRects()[0].top + d('opponent2').getClientRects()[0].height * 1.2,
  d('opponent2').getClientRects()[0].left + (d('opponent2').getClientRects()[0].width - one_card / 1.5) / 2];
  position_data['o3'] = [d('opponent3').getClientRects()[0].top + d('opponent3').getClientRects()[0].height * 1.2,
  d('opponent3').getClientRects()[0].left + (d('opponent3').getClientRects()[0].width - one_card / 1.5) / 2];

  //カード配り
  let card = {
    1: [],
    2: [],
    3: [],
    4: []
  };
  let card_data = [];
  for (let i = 0; i < 4; i++) {
    card_data.push([]);
    for (let j = 1; j < 14; j++) {
      card[4].push(i * 13 + j);
      card_data[i].push(0);
    }
    card_data[i][6] = 7;
  }
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 13; j++) {
      let random = Math.floor(Math.random() * card[4].length);
      card[i].push(card[4][random]);
      card[4].splice(random, 1);
    }
  }
  for (let i = 1; i < 4; i++) {
    card[i].sort((a, b) => {
      return a - b;
    });
  }
  //console.log(card, card_data)

  //カード配り演出
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 14; j++) {
      setTimeout(() => {
        let c = d(`${i}${j}`);
        c.className = `card_ura`;
        c.style = `position:absolute;top:${(position_data[17][0] + position_data[27][0]) / 2}px;left:${position_data[17][1]}px;`;
      }, i * 130 + j * 10);
    }
  }
  setTimeout(() => {
    for (let i = 1; i < 5; i++) {
      setTimeout(() => {
        d(change(card[i][0])).style =
          `position:absolute;top:${position_data[i == 4 ? 'm7' : `o${i}`][0]}px;left:${position_data[i == 4 ? 'm7' : `o${i}`][1]}px;`;
      }, i * 200);
    }
    setTimeout(() => {
      for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 13; j++) {
          d(change(card[i][j])).style =
            `display:none;position:absolute;top:${position_data[i == 4 ? 'm7' : `o${i}`][0]}px;left:${position_data[i == 4 ? 'm7' : `o${i}`][1]}px;`;
        }
      }
    }, 400);
    setTimeout(() => {
      for (let i = 0; i < 52; i++) {
        let ura = document.getElementsByClassName('card_ura');
        ura[i].style.display = ``;
      }
    }, 1900);
    setTimeout(() => {
      for (let i = 0; i < 13; i++) {
        let n = d(change(card[4][i]));
        n.className = `m${change(card[4][i])[0]}`;
        n.style =
          `position:absolute;top:${position_data[`m${i + 1}`][0]}px;left:${position_data[`m${i + 1}`][1]}px;`;
      }
    }, 2000);
  }, 1300);

  //7を出す
  setTimeout(() => {
    a: for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 5; j++) {
        let n = i * 13 + 7;
        if (card[j].indexOf(n) != -1) {
          d(change(n)).style = `position:absolute;top:${position_data[change(n)][0]}px;left:${position_data[change(n)][1]}px;`;
          d(change(n)).className = `m${change(n)[0]}`;
          card[j].splice(card[j].indexOf(n), 1);
          if (n == 20) {
            setTimeout(() => {
              Do = j == 1 ? 4 : j - 1;
              turn();
            }, 1100);
          }
          continue a;
        }
      }
    }
    for (let i = 1; i < 5; i++) {
      d(`t${i}`).innerText = card[i].length;
    }
  }, 4200);

  //t のターンになる
  let players = [1, 2, 3, 4];
  let Do;
  function turn() {
    if (players.length) {
      Do = players.indexOf(Do + 1) > -1 ? Do + 1 : players.indexOf(Do + 2) > -1 ? Do + 2 : players.indexOf(Do + 3) > -1 ? Do + 3 : players[0];
      if (players.indexOf(1) > -1) d('opponent1').style.borderBottomColor = Do == 1 ? `red` : `lightblue`;
      if (players.indexOf(2) > -1) d('opponent2').style.borderBottomColor = Do == 2 ? `red` : `lightblue`;
      if (players.indexOf(3) > -1) d('opponent3').style.borderBottomColor = Do == 3 ? `red` : `lightblue`;
      if (players.indexOf(4) > -1) d('I').style.borderBottomColor = Do == 4 ? `red` : `lightblue`;
      setTimeout(() => {
        play[Do](Do);
      }, Do == 4 ? 0 : 1100);
    } else {

    }
  }

  //NPC思考設定
  const think_data = [

    //出せるところランダム
    (n) => {
      let can = can_card(n);
      if (can.length) {
        put(can[Math.floor(Math.random() * can.length)], n);
      } else {
        pass(n);
      }
    },

    //基本
    (n) => {
      let can = can_card(n);
      if (can.length) {
        if (can.length == 1) {
          put(can[0], n);
          return;
        }
        let edge = biggest_space(n);
        let put_card = for_me(can, edge);
        if (put_card.length == 1) {
          put(put_card[0], n);
          return;
        }
        put_card = dont_help(put_card, n);
        put(put_card[Math.floor(Math.random() * put_card.length)], n);
      } else {
        pass(n);
      }
    },

  ];

  //出せるカードを探す
  function can_card(n) {
    let c = card[n];
    let can = [];
    for (let i = 0; i < c.length; i++) {
      if (!check(c[i])) can.push(c[i]);
    }
    return can;
  }

  //持っていない（出してもらう）ところが多い端のカードから順に並べる
  function biggest_space(n) {
    n = card[n];
    for (let i = 0; i < n.length; i++) {
      card_data[Mchange(n[i])][Nchange(n[i]) - 1] = 1;
    }

    let o = [];
    for (let i = 0; i < n.length; i++) {
      let m = Mchange(n[i]);
      let nn = Nchange(n[i]) - 1;
      let space = 0;
      let count = 0;
      if (nn > 6) {
        do {
          count++;
          if (!card_data[m][nn - count]) space++;
        } while (nn - count != 6)
      } else {
        do {
          count++;
          if (!card_data[m][nn + count]) space++;
        } while (nn + count != 6)
      }
      o.push([space, n[i]]);
    }
    o.sort((a, b) => {
      return b[0] - a[0];
    });
    for (let i = 0; i < n.length; i++) {
      card_data[Mchange(n[i])][Nchange(n[i]) - 1] = 0;
    }

    return o;
  }

  //遠くにあるカードにつながるカード
  function for_me(can, edge) {
    let big = [-1, []];
    b: for (let i = 0; i < can.length; i++) {
      let cn = can[i];
      let wn = Wchange(cn);
      for (let j = 0; j < edge.length; j++) {
        let e = edge[j];
        let way = Wchange(e[1]);
        if (way == wn) {
          if (big[0] < e[0]) {
            big[0] = e[0];
            big[1] = [cn];
          } else if (big[0] == e[0]) {
            if (big[1].indexOf(cn) == -1) big[1].push(cn);
          } else if (big[0] > e[0] || !e[0]) {
            continue b;
          }
        }
      }
    }
    return big[1];
  }

  //なるべく相手を助けないようにする
  function dont_help(c, n) {
    n = card[n];
    for (let i = 0; i < n.length; i++) {
      card_data[Mchange(n[i])][Nchange(n[i]) - 1] = 1;
    }

    let o = [];
    for (let i = 0; i < c.length; i++) {
      let m = Mchange(c[i]);
      let nn = Nchange(c[i]) - 1;
      let space = 0;
      let count = 0;
      if (nn > 6) {
        do {
          count++;
          if (card_data[m][nn + count] == 0) space++;
        } while (nn + count != 13)
      } else {
        do {
          count++;
          if (card_data[m][nn - count] == 0) space++;
        } while (nn - count != -1)
      }
      o.push([space, c[i]]);
    }
    o.sort((a, b) => {
      return a[0] - b[0];
    });
    for (let i = 0; i < n.length; i++) {
      card_data[Mchange(n[i])][Nchange(n[i]) - 1] = 0;
    }

    let most = [[], o[0][0]];
    for (let i = 0; i < o.length; i++) {
      if (o[i][0] == most[1]) {
        most[0].push(o[i][1]);
      } else {
        break;
      }
    }
    return most[0];
  }

  let play = {
    1: '',
    2: '',
    3: '',
    4: () => {
      I = true;
    }
  };
  for (let i = 1; i < 4; i++) {
    let random = Math.floor(Math.random() * think_data.length); random = 1;
    play[i] = think_data[random];
  } 

  //クリックに反応
  let I = false;
  for (let i = 0; i < card[4].length; i++) {
    d(change(card[4][i])).onclick = (e) => {
      let n = Number(e.target.id[0]) * 13 + Number(`${e.target.id[1]}${e.target.id.length === 3 ? e.target.id[2] : ''}`);
      if (I && !check(n)) {
        I = false;
        put(n, 4);
      }
    }
  }
  d('pass').onclick = () => {
    if (I) {
      pass(4);
      I = false;
    }
  }

  //出せるかチェック
  function check(c) {
    let m = Mchange(c);
    c = Nchange(c);
    let space = 0;
    if (c > 7) {
      for (let i = 0; i < c - 8; i++) {
        if (!card_data[m][c - 2 - i]) space++;
      }
    } else {
      for (let i = 0; i < 6 - c; i++) {
        if (!card_data[m][c + i]) space++;
      }
    }
    return space;
  }

  //カードを置く
  function put(n, w) {
    nn = change(n);
    d(nn).style = `position:absolute;top:${position_data[nn][0]}px;left:${position_data[nn][1]}px;
    z-index:1;box-shadow:grey ${one_card / 13}px ${one_card / 18}px ${one_card / 18}px;`;
    d(nn).className = `m${nn[0]}`;
    card[w].splice(card[w].indexOf(n), 1);
    d(`t${w}`).innerText = card[w].length;
    card_data[nn[0]][Nchange(n) - 1] = 1;
    setTimeout(() => {
      d(nn).style.transition = 'box-shadow 0.5s';
      d(nn).style.zIndex = '';
      d(nn).style.boxShadow = '';
    }, 1050);
    setTimeout(() => {
      turn();
    }, 1200);
    if (!card[w].length) {
      document.getElementsByClassName('player')[w - 1].innerText = `${ranking[0]}位`;
      d(w == 4 ? 'I' : `opponent${w}`).style = `border:solid 2px ${ranking[0] == 1 ? 'gold' : ranking[0] == 2 ? 'whitesmoke' : ranking[0] == 3 ? 'brown' : 'lightblue'};`;
      ranking[0]++;
      setTimeout(() => {
        players.splice(players.indexOf(w), 1);
      }, 300);
    }
  }

  //パス
  function pass(w) {
    switch (d(`p${w}`).innerText) {
      case '●●●':
        end(w);
        break;
      case '●●・':
        d(`p${w}`).innerText = '●●●';
        setTimeout(turn, 200);
        break;
      case '●・・':
        d(`p${w}`).innerText = '●●・';
        setTimeout(turn, 200);
        break;
      case '・・・':
        d(`p${w}`).innerText = '●・・';
        setTimeout(turn, 200);
        break;
    }
  }

  //パス4
  function end(w) {
    players.splice(players.indexOf(w), 1);
    document.getElementsByClassName('player')[w - 1].innerText = `${ranking[1]}位`;
    d(w == 4 ? 'I' : `opponent${w}`).style = `border:solid 2px ${ranking[1] == 1 ? 'gold' : ranking[1] == 2 ? 'whitesmoke' : ranking[1] == 3 ? 'brown' : 'lightblue'};`;
    ranking[1]--;
    for (let i = 0; i < card[w].length; i++) {
      let n = change(card[w][i]);
      d(n).style = `position:absolute;top:${position_data[n][0]}px;left:${position_data[n][1]}px;
        z-index:1;box-shadow:grey ${one_card / 13}px ${one_card / 18}px ${one_card / 18}px;`;
      d(n).className = `m${n[0]}`;
      card_data[Mchange(card[w][i])][Nchange(card[w][i]) - 1] = 1;
    }
    setTimeout(() => {
      for (let i = 0; i < card[w].length; i++) {
        let n = change(card[w][i]);
        d(n).style.transition = 'box-shadow 0.5s';
        d(n).style.zIndex = '';
        d(n).style.boxShadow = '';
      }
      turn();
    }, 1050);
  }


}

