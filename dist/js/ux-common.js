$(() => {
  console.log("ux-common.js loaded");

  // elems.
  const breakpoint = 1280;
  const html = document.querySelector("html");
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const gnb = document.querySelector(".gnb");
  const gnbLink1 = document.querySelectorAll(".gnb__menu>li");
  const gnbLink2 = document.querySelectorAll(".gnb__menu>li>a");
  const btnOpenGnb = document.querySelector(".btn__menu__open");
  const btnHideGnb = document.querySelector(".btn__menu__close");
  const btnShowSearch = document.querySelector(".btn__search");
  const btnHideSearch = document.querySelector(".search__btn__close");
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar__btn__toggle");
  const sidebarTop = document.querySelector(".sidebar__btn.top");
  const footer = document.querySelector(".footer");
  const memberPcLink = document.querySelector(".btn__desktop.btn__mypage");

  window.addEventListener("load", init);
  window.addEventListener("resize", checkWidth);
  gnb.addEventListener("mouseleave", hideGnb);
  btnOpenGnb.addEventListener("click", showGnbMo);
  btnHideGnb.addEventListener("click", hideGnbMo);
  btnShowSearch.addEventListener("click", showSearch);
  btnHideSearch.addEventListener("click", hideSearch);

  for (let i = 0; i < gnbLink1.length; i++) {
    gnbLink1[i].addEventListener("mouseover", showGnb);
    gnbLink1[i].addEventListener("mouseleave", removeGnbActive);
  }
  for (let i = 0; i < gnbLink2.length; i++) {
    gnbLink2[i].addEventListener("click", showGnbSecondary);
  }

  // functions.
  function init() {
    checkWidth();
    html.classList.add(checkUA());
  }

  function checkWidth() {
    const windowWidth = window.innerWidth;

    if (windowWidth > breakpoint) {
      html.classList.add("desktop");
      html.classList.remove("mobile");
    } else {
      html.classList.remove("desktop");
      html.classList.add("mobile");
    };
  }

  function checkUA() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("windows") > -1) {
      return "windows";
    } else if (userAgent.indexOf("android") > -1) {
      return "android";
    } else if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
      return "ios";
    } else if (userAgent.indexOf("macintosh") > -1 || userAgent.indexOf("mac os") > -1) {
      return navigator.maxTouchPoints > 1 ? "ios" : "macos";
    } else {
      return "other";
    };
  }

  function showGnb(e) {
    gnb.classList.add("gnb--active");
    e.currentTarget.classList.add("active");
  }

  function showGnbMo() {
    body.style.overflow = "hidden";
    header.classList.add("header--active");
  }

  function showGnbSecondary(e) {
    const active = "mo--active";
    const secondary = e.target.parentElement;
    const hasClass = secondary.classList.contains(active);

    for (let i = 0; i < gnbLink1.length; i++) {
      gnbLink1[i].classList.remove(active);
    }
    if (hasClass === false) {
      secondary.classList.add(active);
    }
  }

  function showSearch() {
    const windowWidth = window.innerWidth;

    header.classList.add("header--search");
    if (windowWidth <= breakpoint) {
      body.style.overflow = "hidden";
    }
  }

  function removeGnbActive(e) {
    e.currentTarget.classList.remove("active");
  }

  function hideGnb() {
    gnb.classList.remove("gnb--active");
  }

  function hideGnbMo() {
    body.removeAttribute("style");
    header.classList.remove("header--active");
  }

  function hideSearch() {
    body.removeAttribute("style");
    header.classList.remove("header--search");
  }

  // pc login tooltip
  memberPcLink.addEventListener("click", e => {
    e.preventDefault();

    const elem = document.querySelector(".header .member");
    const active = "member--visible";
    const outsideClick = e => {
      if (!elem.contains(e.target) && !memberPcLink.contains(e.target)) {
        $(elem).removeClass(active);
        body.removeEventListener("click", outsideClick);
      };
    };

    if (elem.classList.contains(active)) {
      elem.classList.remove(active);
      body.removeEventListener("click", outsideClick);
    } else {
      elem.classList.add(active);
      body.addEventListener("click", outsideClick);
    }
  });

  // footer - family site on desktop
  document.querySelector(".footer__family__link__trigger").addEventListener("click", e => {
    const link = e.target.closest(".footer__family__link");
    const active = "footer__family__link--active";
    const outsideClick = e => {
      console.log(!link.contains(e.target))
      if (!link.contains(e.target)) {
        $(link).removeClass(active);
        body.removeEventListener("click", outsideClick);
      };
    };

    if (link.classList.contains(active)) {
      link.classList.remove(active);
    } else {
      link.classList.add(active);
      body.addEventListener("click", outsideClick);
    };
  });

  // sort
  const itemsort = $(".itemsort");

  if (itemsort.length) {
    itemsort.each(function(){
      const _this = $(this);
      const activeClass = "itemsort--open";
      const sortButton = _this.find(".itemsort__button");
      const sortSelected = _this.find(".itemsort__button__selected");
      const sortDrawer = _this.find(".itemsort__drawer");
      const sortList = _this.find(".itemsort__item");
      const sortLink = _this.find(".itemsort__item__link");

      sortButton.click(() => {
        if (_this.hasClass(activeClass)) {
          _this.removeClass(activeClass)
          $("body").off("click", outerClick);
        } else {
          _this.addClass(activeClass);
          $("body").on("click", outerClick);
        }
      });
      sortLink.click(function(e) {
        e.preventDefault();

        const parent = $(this).parent(sortList);
        const activeClass2 = "itemsort__item--active";
        
        sortList.removeClass(activeClass2);
        parent.addClass(activeClass2);
        sortSelected.text($(this).text());
        _this.removeClass(activeClass);
        // do sort items!
      });
      function outerClick(e) {
        if (!$(e.target).closest(_this).length && !$(e.target).is(_this)) {
          _this.removeClass(activeClass);
          $("body").off("click", outerClick);
        };
      }
    });
  }  
  
  // floating menu
  let prevScrollY = window.scrollY;

  const scrollAction = () => {
    let winHeight = window.innerHeight;
    let start = 300;
    let end = footer.offsetTop - winHeight + sidebar.offsetHeight + parseInt(getComputedStyle(sidebar).right) * 2;

    if (prevScrollY !== window.scrollY) {
      if (prevScrollY > window.scrollY) {
        // scroll up
        if (prevScrollY !== 0) {
          header.classList.add("header--fixed");
        } else {
          header.classList.remove("header--fixed");
        };
      } else {
        // scroll down
        header.classList.remove("header--fixed");
      }
      
      prevScrollY = window.scrollY;
      // sidebar
      prevScrollY >= start ? sidebar.classList.add("sidebar--visible") : sidebar.classList.remove("sidebar--visible");
      prevScrollY >= end ? sidebar.classList.add("sidebar--reachend") : sidebar.classList.remove("sidebar--reachend");
    };

  };

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--active");
  });
  sidebarTop.addEventListener("click", () => {
    let speed = 200;
    let maxSpeed = 700;
    let scrollY = window.scrollY;

    if (scrollY > 1000) {
      scrollY > 5000 ? speed = maxSpeed : speed + scrollY * 0.1;
    };
    $("html, body").stop().animate({scrollTop: 0}, speed, "swing", () => {
      sidebar.classList.remove("sidebar--active");
    });
  });

  if (window.innerHeight >= document.body.offsetHeight) {
    sidebar.classList.add("sidebar--visible");
    observer.observe(body, observerConfig);
  } else {
    window.addEventListener('scroll', toFit(scrollAction, {}), {passive: true});
  };

  // tab on/off
  const tabUiClick = () => {
    let $tabBox = $('.tab_ui');
    for(let tabNum = 0; tabNum < $tabBox.length ; tabNum++){ // tab_ui 개별 제어
      tabFunc($tabBox[tabNum]);
    }
    function tabFunc(tab){
      let _scrollView = 1;
      if($(tab).hasClass("scroll")){ // 스크롤 타입
        let $tabWrapper = $(tab).find('>ul'),
            _arrowAdd ='<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>';
        _scrollView = $(tab).data("scroll-view");
        $(tab).addClass("swiper-container");
        $(tab).append(_arrowAdd);
        $tabWrapper.addClass("swiper-wrapper");
        $tabWrapper.find('>li').addClass("swiper-slide");
        let tabSwiper = new Swiper('.tab_ui.scroll',{
          slidesPerView: _scrollView,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        tabSwiper.update();
      }
      $(tab).find('.tabs .btn').on("click", function(){
        let $thisTab = $(this).closest('li'),
            _tabIndex = $thisTab.index(),
            $tabInfo = $(tab).next().find('.tab_ui_inner').eq(_tabIndex);
        if($thisTab.hasClass("on") == false){
          $thisTab.addClass("on").siblings().removeClass("on");
          $tabInfo.addClass("view").siblings().removeClass("view");
        }
        return false;
      });
    }
  }
  // 아코디언 
  const accordionUiList = (e) =>{
    let $thisAcc = $('.acc_ui_zone');
    for(let accNum = 0; accNum < $thisAcc.length ; accNum++){ // acc_ui_zone 개별 제어
      accFunc($thisAcc[accNum]);
    }
    function accFunc(acc){
      let $accItem = $(acc).find('.acc_item'),
          _openType = $(acc).data("acc-open");

      function iniOnOffChk(){ // 초기 on 체크 된 메뉴 오픈
        for(let accSize = 0; accSize < $accItem.length ; accSize++){
          let $accThisNum = $accItem.eq(accSize);
          if($accThisNum.hasClass("on")){
            $accThisNum.find('.acc_inner').show();
          }else{
            $accThisNum.find('.acc_inner').hide().removeAttr("style");
          }
        }
      }
      iniOnOffChk();
      $(acc).find('.acc_btn').on("click", function(){
        let $accItem = $(this).closest('.acc_item'),
            $accInner = $accItem.find('.acc_inner'),
            $items = $accItem.siblings();

        if($(acc).find(".acc_inner:animated").length < 1){ // 열고 닫고 여러번 중독 안되게 하기 위함.
          if($accItem.hasClass("on")){
            $accItem.removeClass("on");
            $(this).find('.acc_arrow').text("상세 보기");
            $accInner.slideUp(200);
          }else{
            if(_openType == "single"){ // single
              $items.removeClass("on");
              $items.find('.acc_arrow').text("상세 보기");
              $items.find('.acc_inner').hide();
            }
            $accItem.addClass("on");
            $(this).find('.acc_arrow').text("선택됨/상세 닫기");
            $accInner.slideDown(300);
          }
        }
        return false;
      });
    }
  }
  // selectbox  
  const selectUiBox = (e) => {
    let $selectBox = $('.select_ui_zone');
    for(let _selectNum = 0; _selectNum < $selectBox.length ; _selectNum++){ // select 개별 제어
      selectFunc($selectBox[_selectNum]);
    }
    function selectFunc(select){
      $(select).find('.selected_btn').on("click",function(){
        let $thisSelect = $(this).closest('.select_ui_zone'),
            $selectList = $thisSelect.find('.select_inner');
        if($thisSelect.hasClass("disabled")) { // 클릭 막기
          _thisEvent.preventDefault
          return false;
        }
        if($thisSelect.find(".select_inner:animated").length < 1){ // 열고 닫고 여러번 중독 안되게 하기 위함.
          if($thisSelect.hasClass("open")){
            $thisSelect.removeClass("open");
            $selectList.slideUp(200);
            $(this).html($(this).data("default-text"));
          }else{
            $thisSelect.addClass("open").siblings().removeClass("open");
            $thisSelect.siblings().find('.select_inner').hide();
            $selectList.slideDown(200);
          }
          optSelect($thisSelect);     
          selectClosed($thisSelect); // 다른 영역 클릭 시 닫기
        }
        return false;
      });
      function optSelect(_list){ // option 클릭
        let $openBtn = $(_list).find('.selected_btn');
            $thisOpt = $(_list).find('.opt_list');
        $thisOpt.off().on("click", function(_thisEvent){
          let _optClone = $(this).html();
          if($(this).hasClass("disabled")){ // 품절 제품 막기
            _thisEvent.preventDefault
            return false;
          }
          $openBtn.html(_optClone);
          $(_list).removeClass("open");
          $(_list).find('.select_inner').slideUp(200);
          return false;
        });
      }

      // 해당 select 외에 다른 영역 클릭 시 닫기
      function selectClosed($zone){
        $(document).off().on('click', function(event) {
          let $selectChk = $(event.target).closest('.select_ui_zone');
          if($selectChk.length == 0){
            $zone.removeClass("open");
            $zone.find('.select_inner').slideUp(200);
          }
        });
      }
    }
  }
  // checkbox 전체 선택
  const checkAll = () => {
    $(".check_all").each(function() {
      const _this = $(this);
      const check_name = _this.attr("name");
      const check_cart_item = $("input[name='"+check_name+"']");
      const not_all = check_cart_item.not(_this);

      check_cart_item.on("change", function(e) {
        if ($(e.target).hasClass("check_all")) {
          _this.prop("checked") ? not_all.prop("checked", true) : not_all.prop("checked", false);
        } else {
          not_all.filter(":checked").length === not_all.length ? _this.prop("checked", true) : _this.prop("checked", false);
        }
      })
    })
  }
  // count 수량
  function prdCount(e){ // 제품 수량 체크
    let $countBox = $('.count_ui_box');
      for(let _countNum = 0; _countNum < $countBox.length ; _countNum++){ // countbox 개별 제어
        countFunc($countBox[_countNum]);
      }
    function countFunc(countWrap){
      $(countWrap).find('button').on("click",function(){
        let $thisWrap = $(this).parent(),
            $inputCount = $thisWrap.find('.count'),
            _count = $inputCount.val();
    
        if($(this).hasClass("minus")){ // 감소
          _count--;
          countChk(_count);
        }else{ // 증가
          _count++;
          countChk(_count);
        }
        function countChk(){
          if(_count < 1){ _count = 1;
          }else if(_count >= 100 ){ // 수량 증가 제한
            _count = 99
          }
        }
        $inputCount.val(_count);
        return false;
      });
    }
  }
  function labelClick(){ // 체크박스 라디오 박스 리스트 목록 - label 클릭
    let $labelBox = $('.label_click');

    for(let _labelBoxNum = 0; _labelBoxNum < $labelBox.length ; _labelBoxNum++){ // countbox 개별 제어
      labelChkFunc($labelBox[_labelBoxNum]);
    }
    function labelChkFunc(label){
      $(label).on("click", function(e){
        let $inputChk = $(this).find('input');
        if($inputChk.attr("type") == "checkbox"){//checkbox
          $inputChk.prop("checked") ? $inputChk.prop("checked", false) : $inputChk.prop("checked", true);
        }else{// radio
          $inputChk.prop("checked", true);
        }
      });
    }
  }

  labelClick();      // 리스트 label 클릭 관련
  tabUiClick();      // 탭 
  accordionUiList(); // 아코디언
  selectUiBox();     // select
  prdCount();        // countBox 수량
  if ($(".check_all").length) {
    checkAll()
  };
});

// requestAnimationFrame
function toFit(cb, {dismissCondition = () => false, triggerCondition = () => true}) {
  if (!cb) {
    throw Error('Invalid required arguments')
  };

  let tick = false;

  return function() {
    if (tick) {
      return;
    };
    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      };
      if (triggerCondition()) {
        tick = false;
        return cb();
      };
    });
  };
}

// MutationObserver
let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    // console.log(mutation);
  });
});

let observerConfig = {
  attributes: true,
  childList: true,
  characterData: true,
};

// 공통 팝업 type : 딤드 클릭시 닫기, 높이 조절 : 컨텐츠 스크롤 바 생성
function popupCommon(thisPop, thisSelect){ 
  let $popWrap = $('.'+thisPop),
      $closeBtn = $popWrap.find('.closed'),
      _windowH = $(window).outerHeight(),
      _popBaseH = $popWrap.outerHeight(true),
      $contScroll = $popWrap.find('.pop_cont_scroll'),
      _contScrollH = 0;

  $popWrap.before("<div class='layer_mask'></div>");
  $('.layer_mask, .'+thisPop).fadeIn(200);
  $(".layer_mask, ."+thisPop).attr("tabIndex",0);
  $popWrap.focus();
  $("body,html").css({"overflow":"hidden"});
  
  if(_popBaseH > _windowH-160 && $contScroll.length > 0){ // scroll이 필요한 팝업 체크
    _contScrollH = $contScroll.outerHeight(true);
    popScrollChk();
    $(window).on("resize",popScrollChk);
  }
  function popScrollChk(){ // 팝업에 스크롤 컨텐츠 높이 지정.
    let _wChkH = $(window).outerHeight()-160,
        _fixH = Math.abs(_popBaseH-_contScrollH),
        _changH = 0;
    _changH = Math.abs(_wChkH-_fixH);
    if(_changH < 250){
      _changH = 250;
    }
    $popWrap.find('.pop_cont').addClass("scrollH");
    $contScroll.css("height", _changH);
  }

  // tab버튼을 누른 경우: 포커스가 내부에서만 보이기
  $popWrap.append('<a href="#" class="lastFocus"></a>').find('.lastFocus').on("focus",function  () {
    setTimeout(function  () {
      $popWrap.focus();
    }, 10);
  });
  $('.layer_mask').on("focus", function () { //shift+tab 버튼을 누른 경우: 포커스가 내부에서만 보이기
    setTimeout(function  () {
      $closeBtn.focus();
    }, 10);
  });
  $closeBtn.on("click", function  () { // 닫기
    $('.layer_mask, .'+thisPop).fadeOut(200, function  () {
      $('.layer_mask, .lastFocus').remove();
      $popWrap.removeAttr("tabIndex");
      $('body,html').css({"overflow":"visible"});
    });
    $(thisSelect).focus();
    $('.'+thisPop + ' .lastFocus, .layer_mask').off("focus");
    $(window).off("resize",popScrollChk);
    return false;
  });
  $(document).on("click",".layer_mask", function  () {
    $closeBtn.trigger("click");
  });
} // e: popupCommon