## 개요
'최악의 상황에서도 과연 리팩토링을 통해 레거시 코드를 바꿀 수 있는가?'

깃허브를 찾아보던 중 한 프로젝트에서 부족한 부분들이 너무 많아 짧은 기간 동안 리팩토링하면서

legacy 코드를 개선하고, troubleshooting 경험을 쌓으며 개발 역량을 향상시키는 데에 그 의의가 있음.

## mini_shopy
사용 스텍 : ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) / ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) / ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Refactoring Team
Frontend : 김도균 (Github : KIM DO GYUN)

Backend : 구동하 (Github : Acacian)

## 변경 사항
- Database & Server : 유저 확장 시 비용이 기하급수적으로 상승하는 Firebase에서

MySQL로 변경하였으며, 기존에 없던 서버도 새로 만들어 줌.

## TroubleShooting
- 기존 코드가 Firebase api를 사용하였고 프론트엔드까지 다 묶여 있어 어떻게 설계를 해야 하나

고민이 많았는데, Firebase 관련 api들을 완전히 없애 버리고 새롭게 서버를 만든 후 비슷한 역할의

api로 대체 후 프론트엔드는 Cors를 허용해 백엔드 api의 응답을 받는 방식으로 변경

