function checkForTransaction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 지갑 주소 목록을 가져옵니다 (예: G2:G)
  var addressRange = sheet.getRange('G2:G');  // G열의 2행부터 시작
  var addresses = addressRange.getValues();  // 주소 목록을 배열로 가져옴

  // 특정 주소 (대문자/소문자 구분 없음)
  var targetAddress = "0xYourTargetAddressHere".toLowerCase();
  
  // 각 지갑 주소에 대해 거래 내역을 가져옵니다
  addresses.forEach(function(row) {
    var walletAddress = row[0];
    if (!walletAddress) return;  // 주소가 없으면 건너뛰기

    var apiUrl = "https://api.etherscan.io/api?module=account&action=txlist&address=" + walletAddress + "&startblock=0&endblock=latest&sort=desc&apikey=mykey";
    
    // API 호출
    var response = UrlFetchApp.fetch(apiUrl);
    var data = JSON.parse(response.getContentText());
    
    // 응답 데이터 확인
    Logger.log(data);

    // 거래 내역 처리
    if (Array.isArray(data.result)) {
      data.result.forEach(function(tx) {
        if (tx.to && tx.to.toLowerCase() === targetAddress) {  // 특정 주소로의 전송 확인
          sheet.appendRow([
            new Date(tx.timeStamp * 1000), // 거래 시간
            tx.from,                       // 보낸 주소
            tx.to,                         // 받는 주소
            tx.value,                      // 금액 (Wei 단위, 필요시 변환)
            tx.hash,                       // 트랜잭션 해시
            tx.isError === '0' ? '성공' : '실패' // 거래 상태
          ]);
        }
      });
    } else {
      Logger.log("data.result is not an array");
    }
  });
}

function createTimeDrivenTriggers() {
  // 거래 내역 확인 작업을 주기적으로 실행할 트리거 생성
  ScriptApp.newTrigger('checkForTransaction')
           .timeBased()
           .everyMinutes(5)  // 5분마다 실행
           .create();
}

function deleteTriggers() {
  // 기존에 설정된 트리거를 삭제하는 함수
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
