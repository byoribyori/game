(function () {
  'use strict';
  var data = [];
  var hasameru = [];
  var my = true;
  var pasu = false;
  var end = false;
  var kuropasu = false;
  var o, id, kati;
  var area = document.getElementById('area');
  var bot = document.getElementById('end');
  var table = document.createElement('table');
  table.className = 'table';
  for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr');
    data[i - 1] = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var ii = 1; ii < 9; ii++) {
      var td = document.createElement('td');
      td.id = ii + '' + i;
      td.onclick = onclick;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  area.appendChild(table);
  var teki = [];
  for (var te = 1; te < 9; te++) {
    for (var ki = 1; ki < 9; ki++) {
      teki.push(te + '' + ki);
    }
  }
  var b = 'black';
  var w = 'white';
  put(document.getElementById('44'), w);
  put(document.getElementById('54'), b);
  put(document.getElementById('55'), w);
  put(document.getElementById('45'), b);

  function com() {
    var sentaku = [];
    for (var se = 0; se < 8; se++) {
      for (var n = 0; n < 8; n++) {
        if (data[se][n] === 0) {
          sentaku.push((n + 1) + '' + (se + 1));
        }
      }
    }
    var sen = [];
    while (sentaku.length) {
      if (check(sentaku[0], 2)) {
        sen.push(sentaku[0]);
      }
      sentaku.shift();
    }
    if (sen.length === 0) {
      my = true;
      pasu = true;
      endc();
      if (!end) {
        if (endcheck()) {
          alert('白パス');
        }
      }
      return;
    } else if (kuropasu) {
      alert('黒パス');
    }
    id = sen[Math.floor(Math.random() * sen.length)];
    o = document.getElementById(id);
    if (check(id, 2)) {
      put(o, 'white');
      kaesu(id, 'white');
      my = true;
      setTimeout(endc, 100)
      setTimeout(endcheck, 100);
    } else {
      com();
    }
  }
  function onclick(e) {
    if (my) {
      my = false;
      id = e.target.id;
      o = document.getElementById(id);
      if (check(id, 1)) {
        put(o, 'black');
        kaesu(id, 'black');
        kuropasu = false;
        setTimeout(com, 1000);
      } else {
        my = true;
      }
    }
  }

  function put(oo, color) {
    oo.textContent = '●';
    oo.className = color;
    data[Number(oo.id[1]) - 1][Number(oo.id[0]) - 1] = color === 'black' ? 1 : 2;//dataに仮盤面
    pasu = false;
  }

  function check(z, cl) {
    var x = Number(z[1]) - 1;
    var y = Number(z[0]) - 1;

    var jo = data[x][y];//checkする状態
    if (jo > 0) {
      return false;
    }
    var lc = cl === 1 ? 2 : 1;
    //[[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
    var aite = false;
    hasameru = [];
    var xx = x;
    var yy = y;

    var a;
    for (a = 0; a < 7; a++) {//1 1
      xx += 1;
      yy += 1;//先を見る
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {//盤面外ならout
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {//最初は相手
        break;
      }
      if (data[xx][yy] === lc) {//1つでもはさんでいる
        aite = true;
      } else if (aite && data[xx][yy] != 0) {//はさんだ
        hasameru.push('右下');
        break;
      }
    }

    aite = false;
    xx = x;
    yy = y;
    for (a = 0; a < 7; a++) {//1 0
      xx += 1;
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {
        break;
      }
      if (data[xx][yy] === lc) {
        aite = true;
      } else if (aite && data[xx][yy] != 0) {
        hasameru.push('下');
        break;
      }
    }

    aite = false;
    xx = x;
    yy = y;
    for (a = 0; a < 7; a++) {//1 -1
      xx += 1;
      yy -= 1;
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {
        break;
      }
      if (data[xx][yy] === lc) {
        aite = true;
      } else if (aite && data[xx][yy] != 0) {
        hasameru.push('左下');
        break;
      }
    }

    aite = false;
    xx = x;
    yy = y;
    for (a = 0; a < 7; a++) {//0 1
      yy += 1;
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {
        break;
      }
      if (data[xx][yy] === lc) {
        aite = true;
      } else if (aite && data[xx][yy] != 0) {

        hasameru.push('右');
        break;
      }
    }

    aite = false;
    xx = x;
    yy = y;
    for (a = 0; a < 7; a++) {//0 -1
      yy -= 1;
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {
        break;
      }
      if (data[xx][yy] === lc) {
        aite = true;
      } else if (aite && data[xx][yy] != 0) {

        hasameru.push('左');
        break;
      }
    }

    aite = false;
    xx = x;
    yy = y;
    for (a = 0; a < 7; a++) {//-1 1
      xx -= 1;
      yy += 1;
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {
        break;
      }
      if (data[xx][yy] === lc) {
        aite = true;
      } else if (aite && data[xx][yy] != 0) {
        hasameru.push('右上');
        break;
      }
    }

    aite = false;
    xx = x;
    yy = y;
    for (a = 0; a < 7; a++) {//-1 0
      xx -= 1;
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {
        break;
      }
      if (data[xx][yy] === lc) {
        aite = true;
      } else if (aite && data[xx][yy] != 0) {
        hasameru.push('上');
        break;
      }
    }

    aite = false;
    xx = x;
    yy = y;
    for (a = 0; a < 7; a++) {//-1 -1
      xx -= 1;
      yy -= 1;
      if (xx > 7 || yy > 7 || xx < 0 || yy < 0 || data[xx][yy] === 0) {
        break;
      }
      if (a === 0 && data[xx][yy] === cl) {
        break;
      }
      if (data[xx][yy] === lc) {
        aite = true;
      } else if (aite && data[xx][yy] != 0) {

        hasameru.push('左上');
        break;
      }
    }
    if (hasameru.length) {
      return true;
    } else {
      return false;
    }
  }

  function kaesu(idd, lor) {
    var xxx = Number(idd[1]) - 1;
    var yyy = Number(idd[0]) - 1;
    var rol = lor === 'black' ? 'white' : 'black';
    var kaesi = true;
    while (hasameru.length) {
      if (hasameru[0] === '右下') {
        while (kaesi) {
          xxx++;
          yyy++;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }
      xxx = Number(idd[1]) - 1;
      yyy = Number(idd[0]) - 1;
      kaesi = true;
      if (hasameru[0] === '下') {
        while (kaesi) {
          xxx++;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }
      xxx = Number(idd[1]) - 1;
      yyy = Number(idd[0]) - 1;
      kaesi = true;
      if (hasameru[0] === '左下') {
        while (kaesi) {
          xxx++;
          yyy--;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }

      xxx = Number(idd[1]) - 1;
      yyy = Number(idd[0]) - 1;
      kaesi = true;
      if (hasameru[0] === '右') {
        while (kaesi) {
          yyy++;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }

      xxx = Number(idd[1]) - 1;
      yyy = Number(idd[0]) - 1;
      kaesi = true;
      if (hasameru[0] === '左') {
        while (kaesi) {
          yyy--;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }

      xxx = Number(idd[1]) - 1;
      yyy = Number(idd[0]) - 1;
      kaesi = true;
      if (hasameru[0] === '右上') {
        while (kaesi) {
          xxx--;
          yyy++;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }

      xxx = Number(idd[1]) - 1;
      yyy = Number(idd[0]) - 1;
      kaesi = true;
      if (hasameru[0] === '上') {
        while (kaesi) {
          xxx--;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }

      xxx = Number(idd[1]) - 1;
      yyy = Number(idd[0]) - 1;
      kaesi = true;
      if (hasameru[0] === '左上') {
        while (kaesi) {
          xxx--;
          yyy--;
          o = document.getElementById((yyy + 1) + '' + (xxx + 1));
          if (o.className === rol) {
            o.className = lor;
            data[xxx][yyy] = lor === 'black' ? 1 : 2;
          } else {
            kaesi = false;
            hasameru.shift();
          }
        }
      }
    }
    var dataa = '';
    for (var dat = 0; dat < 8; dat++) {
      for (var da = 0; da < 8; da++) {
        dataa += data[dat][da] + ' ';
      }
      dataa += '\n'
    }
  }

  function endcheck() {
    var sentak = [];
    for (var see = 0; see < 8; see++) {
      for (var nn = 0; nn < 8; nn++) {
        if (data[see][nn] === 0) {
          sentak.push((nn + 1) + '' + (see + 1));
        }
      }
    }
    var senn = [];
    while (sentak.length) {
      if (check(sentak[0], 1)) {
        senn.push(sentak[0]);
      }
      sentak.shift();
    }
    if (senn.length === 0) {
      if (pasu === true) {
        if (!end) {
          var onee = 0;
          var twoo = 0;
          for (var enn = 0; enn < 8; enn++) {
            for (var dcc = 0; dcc < 8; dcc++) {
              if (data[enn][dcc] === 1) {
                onee++;
              } else if (data[enn][dcc] === 2) {
                twoo++;
              }
            }
          }
          var bla = document.getElementById('bla');
          bla.innerText = onee;
          var whi = document.getElementById('whi');
          whi.innerText = twoo;
          if (onee - twoo > 0) {
            kati = '黒の勝ち';
            bla.className = "winb";
          } else if (twoo - onee > 0) {
            kati = '白の勝ち';
            whi.className = "winw";
          } else {
            kati = '引き分け';
          }
          var bo = document.createElement('button');
          bo.onclick = function () { window.location.reload(); }
          bo.innerText = 'もう一度';
          bo.className = 're';
          bot.appendChild(bo);
          alert('黒' + onee + '白' + twoo + '\n ' + kati);
          end = true;
        }
        return false;
      }
      if (!end) {
        kuropasu = true;
        setTimeout(com, 200);
        return false;
      }
    } else {
      return true;
    }
  }

  function endc() {
    var one = 0;
    var two = 0;
    for (var en = 0; en < 8; en++) {
      for (var dc = 0; dc < 8; dc++) {
        if (data[en][dc] === 1) {
          one++;
        } else if (data[en][dc] === 2) {
          two++;
        }
      }
    }
    if (one + two === 64 && !end) {
      var bla = document.getElementById('bla');
      bla.innerText = one;
      var whi = document.getElementById('whi');
      whi.innerText = two;
      if (one - two > 0) {
        kati = '黒の勝ち';
        bla.className = "winb";
      } else if (two - one > 0) {
        kati = '白の勝ち';
        whi.className = "winw";
      } else {
        kati = '引き分け';
      }
      if (!end) {
        var bo = document.createElement('button');
        bo.onclick = function () { window.location.reload(); }
        bo.innerText = 'もう一度';
        bo.className = 're';
        bot.appendChild(bo);
      }
      alert('黒' + one + '白' + two + '\n ' + kati);
      end = true;
    }
  }
}())
