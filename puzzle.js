(function () {
  'use strict';
  var area = document.getElementById('area');
  var are = document.getElementById('are');
  var i, ii, id,ha,a, en = false;
  var table = document.createElement('table');
  for (i = 0; i < 4; i++) {
    var tr = document.createElement('tr');
    for (ii = 0; ii < 4; ii++) {
      var td = document.createElement('td');
      td.className = 'tile';
      td.textContent = (i * 4 + ii + 1) === 16 ? '' : (i * 4 + ii + 1);  //表示文字
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  area.appendChild(table);

  const sta = document.getElementById('st');
  sta.onclick = () => {
  ha = Date.now();
  mon();
  }



  function mon() {
    while (are.firstChild) {
      are.removeChild(are.firstChild);
    }
    while (area.firstChild) {
      area.removeChild(area.firstChild);
    }
    var sw = true;
    var tiles = [];
    var table = document.createElement('table');
    for (i = 0; i < 4; i++) {
      var tr = document.createElement('tr');
      for (ii = 0; ii < 4; ii++) {
        var td = document.createElement('td');
        td.id = i * 4 + ii + 1;
        td.onclick = onclick;
        td.className = 'tile';
        td.textContent = (i * 4 + ii + 1) === 16 ? '' : (i * 4 + ii + 1);  //表示文字
        td.mo = (i * 4 + ii + 1) === 16 ? '' : (i * 4 + ii + 1);         //データ文字
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    area.appendChild(table);
    tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    var end = false;
    for (var iii = 0; iii < 2000; iii++) {
      ir((Math.floor(Math.random() * 16)) + 1);
    }
    end = true;

    function onclick(e) {
      if (!en) {
        id = Number(e.target.id);
        ir(id);
      }
    }
    function ir(dd) {
      sw = true;
      if (dd > 4) {//  上
        if (tiles[dd - 5] === 0) {
          swap(dd, dd - 4);
        }
      }
      if (dd % 4 != 0) {//  右
        if (tiles[dd] === 0 && sw) {
          swap(dd, dd + 1);
        }
      }
      if (dd % 4 != 1) {//  左
        if (tiles[dd - 2] === 0 && sw) {
          swap(dd, dd - 1);
        }
      }
      if (dd < 13) {//  下
        if (tiles[dd + 3] === 0 && sw) {
          swap(dd, dd + 4);
        }
      }
    }

    function swap(q, w) {
      //if (!end) {
        //console.log('入れ替え', q, w);//入れ替え text mo tiles
      //}
      var kanu = tiles[q - 1];//データ
      tiles[q - 1] = tiles[w - 1];
      tiles[w - 1] = kanu;
      for (i = 1; i < 17; i++) {
        document.getElementById(i).innerText = tiles[i - 1] === 0 ? '' : tiles[i - 1];
      }
      sw = false;
      var qq = 0;
      for (var q = 0; q < 15; q++) {
        if (tiles[q] === [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0][q]) {
          qq++;
        }
      }
      var ti;
      function al() {
        alert('完成\n '+ti+'秒かかりました');
      }
      if (end && qq === 15) {
        en = false;
        a = Date.now();
        ti = Math.round((a - ha)/1000);
        setTimeout(al, 100);
      }
    }
  }
}())
