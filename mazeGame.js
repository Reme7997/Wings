// 로그를 화면에 유지시키는 함수 (기존 메시지를 덮어쓰지 않음)
function displayLog(message) {
  const logDiv = document.getElementById('log');
  logDiv.innerText += message + '\n';  // 로그를 덧붙여서 출력
}

displayLog("mazeGame.js 파일이 로드되었습니다.");
