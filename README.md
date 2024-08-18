Google Sheets & Etherscan Automation

프로젝트 개요
이 프로젝트는 이더스캔에서 거래 데이터를 가져와 구글 시트에 자동으로 추가하는 스크립트를 제공합니다.
이 스크립트는 특정 지갑 주소로의 거래 내역을 주기적으로 확인하고, 거래 내역을 구글 시트에 기록합니다.

기능
거래 내역 확인: 이더스캔 API를 사용하여 특정 지갑 주소로의 거래 내역을 확인합니다.
구글 시트에 기록: 확인된 거래 내역을 구글 시트에 자동으로 추가합니다.
주기적 실행: Google Apps Script 트리거를 사용하여 주기적으로 스크립트를 실행합니다.

설치 및 설정
Etherscan API 키 발급: Etherscan에서 API 키를 발급받습니다.
Google Sheets 준비: 구글 시트를 생성하고, 거래 내역을 추가할 시트를 준비합니다.
Google Sheets에서 Apps Script 열기:
구글 시트에서 Extensions > Apps Script를 선택합니다.

코드 복사 및 붙여넣기:
자바스크립트 코드를 복사하여 스크립트 편집기에 붙여넣습니다.

API 키 및 타겟 주소 설정:
apikey=mykey 부분을 실제 Etherscan API 키로 대체합니다.
targetAddress 변수에 검색하고자 하는 지갑 주소를 입력합니다.

사용 방법
트리거 생성:
createTimeDrivenTriggers 함수를 실행하여 5분마다 checkForTransaction 함수가 실행되도록 트리거를 생성합니다.
트리거 삭제:
필요시 deleteTriggers 함수를 실행하여 기존 트리거를 삭제할 수 있습니다.

주의 사항
API 호출 제한: Etherscan API에는 호출 횟수 제한이 있으므로, 너무 많은 요청을 보내지 않도록 주의하세요.
데이터 형식 확인: API 응답 데이터가 예상과 다를 수 있으므로, Logger.log(data)를 사용하여 응답 데이터를 확인하세요.
권한 설정: 스크립트가 구글 시트에 데이터를 쓰기 위해 필요한 권한을 가지고 있는지 확인하세요.

