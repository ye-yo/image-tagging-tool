# 🏷 Image Tagging Tool

<img width="816" alt="스크린샷 2022-04-12 오후 2 51 52" src="https://user-images.githubusercontent.com/50618754/162890242-2a0b65c3-5086-45f5-b5b1-b487be16d69f.png">

> 💡 이미지에서 원하는 영역을 선택하여 태그를 부여하는 서비스입니다.

## 실행 방법
```
git clone https://github.com/ye-yo/image-tagging-tool.git
npm install
npm start
```
## 기술 스택
React, Typescript, Redux, Redux-Persist, Styled-Components

## 기능 요약

- 드래그를 통한 영역 태깅
- 태그 목록 확인
- 태그 수정
  - 태그명 수정
  - 위치 변경
  - 크기 변경
- sessionStorage 통한 데이터 유지

## 기능 설명

### 드래그를 통한 영역 태깅
`useDrawBox` 커스텀 훅을 생성해 canvas 위에서 발생하는 마우스 이벤트의 좌표에 따라 영역을 그릴 수 있도록 구현하였습니다.<br>
drag 종료 시에는 `prompt`를 띄워 영역의 이름을 입력할 수 있게 하였습니다.

### 태그 목록 확인
<img width="299" alt="스크린샷 2022-04-12 오후 3 04 40" src="https://user-images.githubusercontent.com/50618754/162891590-434cc546-e70b-42a2-b6ae-a5388aef7592.png">
생성한 영역은 태그 목록에서 확인가능하며, 태그 목록이 드래그에 방해되지 않도록 토글박스와 같이 펼치고 접을 수 있게 만들었습니다.

### 태그 수정
#### 태그명 수정

<img width="302" alt="스크린샷 2022-04-12 오후 2 52 18" src="https://user-images.githubusercontent.com/50618754/162891534-4a747414-b8cd-4be1-97f9-a2334dc6a024.png"><img width="302" alt="스크린샷 2022-04-12 오후 3 10 05" src="https://user-images.githubusercontent.com/50618754/162892355-9351fbc3-3c67-4a57-8291-1ca28345017b.png">

태그 목록에서 항목에 마우스를 올리면 수정, 삭제 버튼이 나타나도록 만들었으며, 수정 버튼을 클릭 시 태그명을 수정가능하도록 만들었습니다.<br>
태그명을 수정 후 `Done` 버튼을 클릭하면 수정이 완료됩니다.

#### 위치 변경
`useDrag` 커스텀 훅을 생성하여 영역 박스를 드래그하면 위치를 수정할 수 있게 만들었습니다.

#### 크기 변경
<img width="600" src="https://user-images.githubusercontent.com/50618754/162893436-3e71b829-02ab-4af2-a5a2-8db2b0f7eff1.gif"/>

`useResize` 커스텀 훅을 생성하여 기능을 구현하였으며, 박스 오른쪽 하단에 `resize-handle`을 두어 크기를 조정할 수 있게 하였습니다.</br>
다만 빠르게 조정할 경우 마우스가 `resize-handle`에서 벗어나 크기 조정이 중단되는 문제가 있습니다.

### sessionStorage를 통한 데이터 유지
새로고침 시에도 데이터를 유지시키기 위해서 `sessionStorage`를 사용하였으며, 태깅 기능의 경우는 만료 조건이 없는 `localStorage`보다 브라우저가 종료되면 데이터가 제거되는 `sessionStorage`가 적합하다고 판단되었습니다.</br>
`sessionStorage` 저장 및 불러오기 기능은 기존에는 함수를 만들어 구현했었는데, 이번 프로젝트에서는 Redux에서 storage 저장 기능을 간편하게 관리해주는 `redux-persist` 라이브러리를 사용하여 구현해보았습니다.
