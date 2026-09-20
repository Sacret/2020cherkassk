---
title: Онлайн-карта
date: 2020-02-07 19:42:34
---

<iframe id="online-map" src="https://www.google.com/maps/d/embed?mid=1Vj0EpdORbew_DgWx8VxQnz7pzchExOI&ehbc=2E312F" width="640" height="480"></iframe>

<script>
  (function () {
    var marks = {
      '3': [47.4136251, 40.0984401],
      '4': [47.411741, 40.1045662],
      '5': [47.4212205, 40.0774652],
      '6': [47.4036604, 40.0910827],
      '15': [47.4187124, 40.0892615],
      '16': [47.415667, 40.0871426],
      '21': [47.4068055, 40.1003981],
      '22': [47.4096745, 40.0964056],
      '23': [47.4166825, 40.1000842],
      'm': [47.4165128, 40.0804451]
    };
    var mark = new URLSearchParams(window.location.search).get('mark');
    var coordinates = marks[mark];

    if (!coordinates) return;

    var map = document.getElementById('online-map');
    map.src = 'https://www.google.com/maps/d/embed' +
      '?mid=1Vj0EpdORbew_DgWx8VxQnz7pzchExOI' +
      '&ll=' + coordinates[0] + '%2C' + coordinates[1] +
      '&z=18&ehbc=2E312F';
  }());
</script>
