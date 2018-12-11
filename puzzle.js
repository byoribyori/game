(function () {
  'use strict';
  var area = document.getElementById('area');
  var are = document.getElementById('are');
  var i, ii, id,ha,a, en = false,reee=false;
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
    if(!reee){
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
    for (var iii = 0; iii < 2000; iii++) {/////2000
      ir((Math.floor(Math.random() * 16)) + 1);
    }
    var re = tiles.toString();
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
      var kanu = tiles[q - 1];//データ
      tiles[q - 1] = tiles[w - 1];
      tiles[w - 1] = kanu;
      for (i = 1; i < 17; i++) {
        document.getElementById(i).innerText = tiles[i - 1] === 0 ? '' : tiles[i - 1];
      }
      sw = false;
      var ok = false;
      if (tiles.toString()===[1,2,3,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0].toString()){
        ok=true;
      }
      var ti;
      function al() {
        alert('完成\n ' + ti + '秒かかりました'+(reee?'\n やり直しました':''));
        var ree = document.createElement('button');
        ree.innerText = '同じ問題をもう一度';
        ree.onclick = function () {
          ha = Date.now();
          reee = true;
          tiles = re.split(',');
          for (var k = 1; k < 17; k++) {
            document.getElementById(k).innerText = tiles[k - 1] === '0' ? '' : tiles[k - 1];
          }
          for(var j=0;j<16;j++){
            tiles[j]=Number(tiles[j]);
          }
          en=false;
          mon();
        }
        are.appendChild(ree);
        are.appendChild(document.createElement('br'));
        var mou = document.createElement('button');
        mou.innerText = 'もう一度';
        mou.onclick = function () { window.location.reload(); }
        are.appendChild(mou);

      }
      if (end && ok) {
        en = false;
        a = Date.now();
        ti = Math.round((a - ha)/1000);
        setTimeout(al, 100);
      }
    }
  }
}())
