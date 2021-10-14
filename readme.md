# 소니스토어 리뉴얼 마크업 가이드 v.1.1

## root 폴더 파일
* package.json : node.js 패키지 정보 및 의존성 라이브러리, 확장 모듈 등 정보 포함.
* gulpfile.js : gulp 설정 파일.

## 폴더 구조
* dist : distribution, 빌드(compile) 후 출력되는 리소스
	* css
	* html
	* images
	* js : UX javascript 파일
		* 특정 페이지에서 단독 사용된 경우 본문에 ```<script>``` 삽입
		* 다수 페이지에서 사용되나, 해당 요소가 hbs patials 인 경우 해당 .hbs 파일에 삽입
		* ux-common.js : GNB/사이드메뉴 등 공통 레이아웃 구성, 팝업/탭/폼 구성요소 관련 기능
		* ux-main.js : 메인 페이지
		* ux-category.js : 상품 목록 상단 메뉴 구성 관련 스크립트
		* ux-product.js : 상품 상세 각종 기능들
	* lib : library 외부 라이브러리 폴더로 각각 css/js 로 나누었다.
* node_modules : node.js 패키지
* src : 개발 소스
	* hbs : handlebars.js 파일
		* data : handlebars 에서 사용되는 data
			* gnb.json : gnb 메뉴 data
			* ia.json :  gnb 포함, 그 외 gnb에 포함되지 않은 페이지 data
			* reco.json :  추천제품 페이지 data
		* ~~helper :  handlebars의 custom helper~~
		* ~~layouts :  공통으로 사용되는 layout~~
		* patials :  반복 사용되는 모듈
			* header, footer 등 일반 레이아웃에 포함된 요소
				* appnavbar.hbs :  앱 전용 하단 네비게이션
				* header.hbs
				* footer.hbs
			* sort, banner 등 둘 이상 페이지에서 반복 사용되는 요소
				* boardsort.hbs
				* employeesort.hbs
				* fullSliderBanner.hbs
				* installmentPlan.hbs
				* itemsort.hbs
	* html :  1뎁스 메뉴별로 디렉토리 구성
	* scss : 하기 참조

## HTML/CSS/SCSS 구성
* html 은 각 1뎁스 메뉴 별 폴더 아래 작성한다.
* ~~구축 중에는 각 1뎁스 메뉴 별 scss 작성. 배포 시 css 취합 예정)~~
	* variables.scss
		* 공통 설정이 있는 파일
		* 설정들은 font, color, clearfix 등 common style, 반응형의 break points 관련 설정, easing 등 이 있습니다.
		* 모든 scss 파일에서 import 합니다.
	* common.scss : 공통 요소 중 메인 페이지에도 import 하는 파일
	* contents.scss : 공통 요소 중 메인 페이지에 import 하지않는 파일
	* 이하는 각 페이지 별 scss 파일
		* main.scss : 메인 페이지
		* app.scss : 앱 전용 요소와 앱 전용 페이지
		* category.scss : 상품 목록
		* dm.scss : 수신거부 신청/신청 완료 페이지 (소니에서 개발)
		* esp.scss : 연장서비스플랜
		* event.scss : 기획전 목록, 기획전 상세
		* liveon.scss : 라이브온
		* membership.scss : 멤버십
		* mypage.scss : 마이페이지
		* order.scss : 주문/장바구니
		* product.scss : 상품 상세
		* recommend.scss : 스토어 추천 제품
		* support.scss : 고객서비스
* 각 페이지에서 필요한 css 파일을 로드하되, 순서는 다음과 같다.
 * library
 * contents.css
 * 페이지 별 css
```
<link rel="shortcut icon" href="/dist/images/favicon_144x144.png">
<link rel="stylesheet" href="/dist/lib/css/swiper.min.css">
<link rel="stylesheet" href="/dist/css/main.css">
<script src="/dist/lib/js/jquery-3.6.0.min.js"></script>
<script src="/dist/lib/js/swiper.min.js"></script>
<script src="/dist/js/ux-common.js"></script>
<script src="/dist/js/ux-main.js"></script>
```

## HTML/CSS/SCSS 에서 네이밍
* 파일명은 camelCase로 작성한다.
```productList.html```
* 의미가 있고 일반적인 이름을 사용하며, 대상의 기능을 정확히 명시한다.
```
<!-- Not recommeded -->
<div class="popup_reg">
```
```
<!-- Recommeded -->
<div class="popup__registering">
```
* 보편적으로 이해하기 쉬운 이름을 사용한다.
* 가능한 한 짧지만, 필요한만큼 긴 ID 및 클래스 이름을 사용한다.
* 선택자로 특별한 경우가 아니라면 className을 지정한다.
* className BEM(Block-Element-Modifier)에 근거하여 작성한다. [1]
```.block__element--modifier```
* client의 상태에 대한 정보는 <html> 태그에 담는다.
```<html class="js mobile ios ...">```
* user의 상태에 대한 정보는 <body> 태그에 담는다.
```<body class="logout ...">```
* 개별 모듈의 상태는 각 모듈의 root 요소에 담는다.
```<div class="nav nav__active nav--secondary__active">```

## HTML/CSS/SCSS 작성 가이드
* 들여쓰기는 공백 두 칸으로 사용하며, 들여쓰기에 탭이나 탭/공백 혼용은 사용하지 않는다.
* 꼭 필요한 경우가 아니라면 link/script 에서 ```type``` Attirbutes 는 생략한다.
* Entity 는 특별한 경우가 아니면 사용하지 않는다. ```<, >, &``` 등은 예외로 한다.
* 속성 값의 따옴표(quotation marks)는 쌍 따옴표(double quoatation marks)를 사용한다.
* 꼭 필요한 경우가 아니라면 id/className과 태그 선택자(type selector)를 혼용하지 않는다.
```
/* Not recommended */
ul#example {}
div.error {}
```
```
/* Recommended */
#example {}
.error {}
```
* 가능한 단축 속성(shorthand)을 사용한다.
* 필요한 경우가 아니라면 '0' 에는 단위를 붙이지 않는다. 1 이하의 소수점에서도 0을 제외한다.
* SCSS에서 Vendor prefix는 자동으로 작성되기에 생략한다.

## 반응형 Breakpoints
* 기본형 (대응 해상도/시안 해상도)
	* mobile : 320px ~ 640px / 360px
	* tablet : 641px ~ 1280px / 768px
	* PC : 1281px ~ 1920px / 1920px
* 예외
	* 일부 요소/페이지에서는 1281px ~ 1366px || 1367px ~ 1920px 대응이 있습니다.
	* Small-PC : 1281px ~ 1366px / 1366px
	* Large-PC : 1367px ~ 1920px / 1920px
		* header/footer
		* 메인 페이지
		* 상품 목록·상세 페이지
	* 주문·결제/장바구니/마이페이지의 주문 목록 화면은 767px 이하에서 모바일/태블릿 화면을 구성한다.

## JAVASCRIPT 에서 네이밍
* Java Naming Rule을 준수한다.
* 클래스는 명사로 UpperCamelCase
* 함수는 lowerCamelCase
* 변수는 lowerCamelCase
* 상수는 UPPER_DELIMITOR_CASE
* 단어의 조합은 첫 단어는 목적에 맞는 품사(명사/동사/형용사)를, 이후로는 명사로 조합한다.

## JAVASCRIPT 작성 가이드
* 들여쓰기는 공백 두 칸으로 사용하며, 들여쓰기에 탭이나 탭/공백 혼용은 사용하지 않는다.

[1] :  https : //en.bem.info/methodology/key-concepts/
