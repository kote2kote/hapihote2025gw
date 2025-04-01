'use strict';

!(function(_w, _d) {
  /**
   * 検索ナビ
   */
  const searchNavList = _d.getElementsByClassName('searchNav_list_primary_outer')[0];
  const searchNavListSecondary = _d.getElementsByClassName('searchNav_list_secondly')[0];

  if (searchNavList && searchNavListSecondary) {
    const navHeight = searchNavList.clientHeight;
    let rect = searchNavListSecondary.getBoundingClientRect();
    _w.addEventListener('scroll', function() {
      rect = searchNavListSecondary.getBoundingClientRect();

      if (rect.top < 0) {
        searchNavList.classList.add('js-fixed');
        searchNavListSecondary.style.marginTop = navHeight - 10 + "px";
      } else {
        searchNavList.classList.remove('js-fixed');
        searchNavListSecondary.style.marginTop = "0px";
      }
    });
  }

  /**
   * ハンバーガーメニュー
   */
  const wrap = _d.getElementsByClassName('wrap')[0];
  const overlay = _d.getElementsByClassName('js-overlay')[0];
  let currentScroll = 0;

  /* 
    overlay.addEventListener('click', hamburger);
    _d.getElementById('hamburger').addEventListener('click', hamburger);
    const btn_close = _d.querySelectorAll('.hamburger_menu_list > .menu_closed > span');
    [].slice.call(btn_close).forEach(function(item) {
      item.addEventListener('click', hamburger);
    });
  */

  function hamburger() {
    let scroll = _w.pageYOffset;
    wrap.classList.toggle('js-menuOn');
    if (wrap.classList.contains('js-menuOn')) {
      // 背景スクロール有効化
      currentScroll = scroll;
      wrap.style.transform = 'translateY(-' + currentScroll + 'px)';
    } else {
      // 背景スクロールストップ
      wrap.style.transform = '';
      scrollTo(0, currentScroll);
    }
  }

  /**
   * ハンバーガーメニューのアコーディオン
   */
  const btnAccordionToggleButtons = _d.querySelectorAll('.js-accordion a');
  [].slice.call(btnAccordionToggleButtons).forEach(function(item) {
    item.addEventListener('click', toggleAccordion);
  });

  function toggleAccordion(e) {
    e.preventDefault();
    this.parentNode.parentNode.classList.toggle('closed');
    this.parentNode.parentNode.classList.toggle('opened');
  }

  /**
   * エリアから探す
   */
  const areaSearch = _d.getElementsByClassName('areaSearchWrap')[0];
  let list, prev, current;
  if (areaSearch) {
    list = _d.getElementsByClassName('areaSearch')[0];
    prev = _d.querySelectorAll('.areaSearch_return > a');
    // areaSearch.style.height = list.clientHeight + "px";

    const btns = _d.querySelectorAll('[data-target-area]');
    [].slice.call(btns).forEach(function(btn) {
      btn.addEventListener('click', showChild);
    });
    [].slice.call(prev).forEach(function(btn) {
      btn.addEventListener('click', hideChild);
    });
  }
  function showChild() {
    const target = _d.querySelector('[data-area-id="' + this.dataset.targetArea + '"]');
    target.classList.add('show');
    list.classList.add('out');
    // areaSearch.style.height = target.clientHeight + "px";
    current = target;
  }
  function hideChild() {
    if (current) {
      current.classList.remove('show');
      list.classList.remove('out');
      // areaSearch.style.height = list.clientHeight + "px";
      current = null;
    }
  }
}(window, document));

/**
 * 地域指定
 */
!(function(_w, _d) {

  const chkAllPc = _d.getElementById('national-pc'); // PC 全国チェックボックス
  const chkAllSp = _d.getElementById('national-sp'); // SP 全国チェックボックス
  const spAreaChkBtns = _d.querySelectorAll('h3.chk > [type=checkbox]'); // SP 地域チェックボックス
  const clearAll = _d.getElementsByClassName('js-clearAll');
  const clearAllArea = _d.getElementsByClassName('js-clearAll_area');
  const chkBtns = _d.querySelectorAll('.chk > [type=checkbox]'); // 全国ボタン、エリアボタン、クリアボタンも含んでいます
  const spAreaBtn = _d.querySelectorAll('.areaSearch_list.__address a'); // SPの地域選択ボタン

  if (!chkAllPc) return;

  // 全国ボタン
  if (chkAllPc) chkAllPc.addEventListener('change', checkAll);
  if (chkAllSp) chkAllSp.addEventListener('change', checkAll);

  // 地域ボタン（スマホのみ）
  [].slice.call(spAreaChkBtns).forEach(function(btn) {
    btn.addEventListener('change', areaCheckAll);
  });


  // クリアボタン
  [].slice.call(clearAll).forEach(function(btn) {
    btn.addEventListener('click', checkAll);
  });
  [].slice.call(clearAllArea).forEach(function(btn) {
    btn.addEventListener('click', areaCheckAll);
  });

  // 全チェックボックス
  [].slice.call(chkBtns).forEach(function(chk) {
    chk.addEventListener('change', checkArea);
  });


  // PC / SP 全チェック切り替え
  function checkAll(e) {
    let isChecked;
    if (e.target.classList.contains('js-clearAll')) {
      e.preventDefault();
      isChecked = false;
    } else {
      isChecked = e.target.checked;
    }
    [].slice.call(chkBtns).forEach(function(btn) {
      btn.checked = isChecked;
    });
    if (isChecked) {
      // SPの地域選択画面の地域のチェックを入れる
      [].slice.call(spAreaBtn).forEach(function(btn) {
        btn.classList.add('js-checked');
      });
    } else {
      // SPの地域選択画面の地域のチェックをはずす
      [].slice.call(spAreaBtn).forEach(function(btn) {
        btn.classList.remove('js-checked');
      });
    }
    // ボタンセット調整
    setBtnSet();
  }

  // エリアごと全チェック切り替え
  function areaCheckAll(e) {
    let isChecked, parent = closest(e.target, 'areaSearch_detail');
    if (e.target.classList.contains('js-clearAll_area')) {
      e.preventDefault();
      isChecked = false;
      // 地域選択のチェックをはずす
      _d.querySelector('[data-target-area=' + parent.dataset.areaId + ']').classList.remove('js-checked');
    } else {
      isChecked = e.target.checked;
    }
    if (parent) {
      let chk = parent.querySelectorAll('[type=checkbox]');
      [].slice.call(chk).forEach(function(btn) {
        btn.checked = isChecked;
      });
    }
  }

  // changeされたチェックボックスの地域のチェックを変更
  function checkArea(e) {
    let parent = closest(e.target, 'js-areaUnit');
    if (!parent) parent = closest(e.target, 'areaSearch_detail');
    // ボタンセットの表示調整
    setBtnSet(e);

    // 全国、クリア、エリアボタンなら無視
    if (
      e.target.id === 'national-pc' ||
      e.target.id === 'national-sp' ||
      e.target.classList.contains('js-clearAll') ||
      e.target.classList.contains('js-clearAll_area') ||
      !parent
    ) {
      return;
    }

    let checked = e.target.checked;
    let areaChk = parent.querySelectorAll('li.chk > [type=checkbox]');
    let area = _d.querySelector('[data-target-area=' + parent.dataset.areaId + ']');
    let parentAreaChk = parent.querySelector('h3 > [type=checkbox]');
    if (checked) {
      // チェックされたなら、同じエリアのチェックボックスのチェック状態を確認し、すべてチェックになるならエリアのチェックを入れる
      let flg = true;
      [].slice.call(areaChk).forEach(function(chk) {
        if (!chk.checked) {
          flg = false;
        }
      });
      if (flg) {
        if (parentAreaChk) parentAreaChk.checked = true;
      }
      // チェックされたなら、SPの地域選択画面の地域のチェックを入れる
      if (area) area.classList.add('js-checked');
    } else {
      // チェックが外されたならエリアのチェックを外す
      if (parentAreaChk) parentAreaChk.checked = false;

      // チェックが外されたなら、同じエリアのチェックボックスのチェック状態を確認し、すべてチェックがはずれたなら、SPの地域選択画面の地域のチェックを外す
      let flg = true;
      [].slice.call(areaChk).forEach(function(chk) {
        if (chk.checked) {
          flg = false;
        }
      });
      if (flg) {
        if (area) area.classList.remove('js-checked');
      }
    }
  }

  let isFixed = true;
  const single_pc = _d.querySelector('.areaSearch_list_btn_outer.-pc > .js-single');
  const multi_pc = _d.querySelector('.areaSearch_list_btn_outer.-pc > .js-multi');
  const single_sparea = _d.querySelector('.areaSearch.inbox .js-single');
  const multi_sparea = _d.querySelector('.areaSearch.inbox .js-multi');
  const single = _d.querySelector('.areaSearch_list_btn_outer > .js-single');
  // 一つだけチェックがあれば、js-singleを表示（.show を追加）
  // 二つ以上チェックがあれば、js-multiを表示（.show を追加）
  function setBtnSet(e) {
    /** *****************
     * PCおよびSPの地域選択画面
     */
    let chks = _d.querySelectorAll('.areaSearch_list.__city [type=checkbox]');
    let cnt_pc = 0;
    [].slice.call(chks).forEach(function(chk) {
      if (chk.checked) cnt_pc++;
    });
    if (single_pc) {
      single_pc.classList.remove('show');
      single_pc.classList.remove('js-fixed');
    }
    if (multi_pc) {
      multi_pc.classList.remove('show');
      multi_pc.classList.remove('js-fixed');
    }
    if (single_sparea) single_sparea.classList.remove('show');
    if (multi_sparea) multi_sparea.classList.remove('show');
    if (single) {
      single.classList.remove('show');
      single.classList.remove('js-fixed');
    }

    if (cnt_pc === 1) {
      if (single_pc) {
        single_pc.classList.add('show');
      } else {
        single.classList.add('show');
      }
      if (isFixed) {
        if (single_pc) {
          single_pc.classList.add('js-fixed');
        } else {
          single.classList.add('js-fixed');
        }
      }
      if (single_sparea) single_sparea.classList.add('show');
    } else if (cnt_pc > 1) {
      if (multi_pc) {
        multi_pc.classList.add('show');
        if (isFixed) multi_pc.classList.add('js-fixed');
        multi_sparea.classList.add('show');
      } else {
        single.classList.add('show');
        single.classList.add('js-fixed');
      }
    }


    /** *****************
     * SP
     */
    // 基本PCと同じ挙動だけど地域に一つもチェックが無い場合のみボタンを非表示とする
    const areas = _d.querySelectorAll('[data-area-id]');
    [].slice.call(areas).forEach(function(area) {
      const araChks = area.querySelectorAll('.areaSearch_list.__city [type=checkbox]');
      let cnt = 0;
      [].slice.call(araChks).forEach(function(chk) {
        if (chk.checked) cnt++;
      });
      const single_area = area.getElementsByClassName('js-single')[0];
      const multi_area = area.getElementsByClassName('js-multi')[0];
      single_area.classList.remove('show');
      multi_area.classList.remove('show');
      if (cnt > 0) {
        if (cnt_pc === 1) {
          single_area.classList.add('show');
        } else if (cnt_pc > 1) {
          multi_area.classList.add('show');
        }
      }
    });
  }

  let singleHeight, basePos, winHeight;
  if (single_pc) {
    single_pc.classList.add('show'); // 位置取得のため一時表示
    singleHeight = single_pc.offsetHeight;
    basePos = single_pc.getBoundingClientRect().top + _w.pageYOffset + singleHeight;
    single_pc.classList.remove('show'); // 位置取得のため一時表示
    winHeight = _d.querySelector('html').clientHeight; // HTML要素のclientHeightは特例でViewportの高さをとる（横スクロールバーを含まない）
  } else {
    if (single) {
      single.classList.add('show'); // 位置取得のため一時表示
      singleHeight = single.offsetHeight;
      basePos = single.getBoundingClientRect().top + _w.pageYOffset + singleHeight;
      single.classList.remove('show'); // 位置取得のため一時表示
      winHeight = _d.querySelector('html').clientHeight; // HTML要素のclientHeightは特例でViewportの高さをとる（横スクロールバーを含まない）
    }
  }

  function checkFixed(e) {
    // 画面下部に表示した時、positon:relative 状態の位置よりも上部に表示されることになるのであれば、画面下部固定とする

    if (_w.pageYOffset >= basePos - winHeight) {
      isFixed = false;
    } else {
      isFixed = true;
    }

    if (single_pc) {
      if (isFixed) {
        single_pc.classList.add('js-fixed');
        multi_pc.classList.add('js-fixed');
      } else {
        single_pc.classList.remove('js-fixed');
        multi_pc.classList.remove('js-fixed');
      }
    } else {
      if (single) {
        if (isFixed) {
          single.classList.add('js-fixed');
        } else {
          single.classList.remove('js-fixed');
        }
      }
    }
  }

  _w.addEventListener('scroll', checkFixed);
  checkFixed();

  _w.addEventListener('resize', function() {
    winHeight = _w.innerHeight;
  });

}(window, document));


/**
 * 地域指定2
 */
!(function(_w, _d) {

  const clearAllBtn = _d.getElementsByClassName('js-clearAll')[0];
  const chkBtns = _d.querySelectorAll('.chk > [type=checkbox]');
  const single = _d.querySelector('.areaSearch_list_btn_outer > .js-single');

  if (!single) return;

  // クリアボタン
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAll);
  };
  // 全チェックボックス
  [].slice.call(chkBtns).forEach(function(chk) {
    chk.addEventListener('change', setBtnSet);
  });

  // 全チェックoff
  function clearAll(e) {
    e.preventDefault();
    [].slice.call(chkBtns).forEach(function(btn) {
      btn.checked = false;
    });
    // ボタンセット調整
    setBtnSet();
  }

  let isFixed = true;

  // 一つ以上チェックがあれば、js-singleを表示（.show を追加）
  function setBtnSet(e) {
    /** *****************
     * PCおよびSPの地域選択画面
     */
    let chks = _d.querySelectorAll('.areaSearch_list.__city [type=checkbox]');
    let cnt_pc = 0;
    [].slice.call(chks).forEach(function(chk) {
      if (chk.checked) cnt_pc++;
    });
    if (single) {
      single.classList.remove('show');
      single.classList.remove('js-fixed');
    }

    if (cnt_pc > 0) {
      single.classList.add('show');
      if (isFixed) single.classList.add('js-fixed');
    }
  }

  let singleHeight, basePos, winHeight;

  function checkFixed(e) {
    // 画面下部に表示した時、positon:relative 状態の位置よりも上部に表示されることになるのであれば、画面下部固定とする

    if (_w.pageYOffset >= basePos - winHeight) {
      isFixed = false;
    } else {
      isFixed = true;
    }
    setBtnSet();
  }

  function resetData() {
    if (single) {
      single.classList.add('show'); // 位置取得のため一時表示
      singleHeight = single.offsetHeight;
      basePos = single.getBoundingClientRect().top + _w.pageYOffset + singleHeight;
      single.classList.remove('show'); // 位置取得のため一時表示
      winHeight = _d.querySelector('html').clientHeight; // HTML要素のclientHeightは特例でViewportの高さをとる（横スクロールバーを含まない）
    }
  }

  _w.addEventListener('scroll', checkFixed);
  resetData();
  checkFixed();

  _w.addEventListener('resize', function() {
    winHeight = _w.innerHeight;
    resetData();
    checkFixed();
  });

}(window, document));




!(function(_w, _d) {

  /**
   * KVスライダー
   */
  const wrapper = _d.getElementsByClassName('js-kvslide')[0];
  const _head = _d.getElementsByTagName('head')[0];
  let images, size = 0;

  if (wrapper) {
    images = wrapper.querySelectorAll('li');
    [].slice.call(images).forEach(function(image) {
      size += image.clientWidth;
    });
    setKeyFrame(size);

    _w.addEventListener('resize', setKvSliderSize);
    setKvSliderSize();
  }

  function setKvSliderSize() {
    if (_w.matchMedia('screen and (max-width:767px)').matches) {
      wrapper.style.width = 'auto';
      wrapper.style.animation = null;
    } else {
      let veiwportWidth = _w.innerWidth;
      // 複製
      if (size > 0) {
        do {
          size += cloneImage();
        } while (veiwportWidth * 2 - size > 0)
      }
      wrapper.style.width = size + 'px';
      wrapper.style.animation = 'scroll 20s linear infinite';
    }
  }
  function cloneImage () {
    let size = 0;
    // 設置された画像を複製
    [].slice.call(images).forEach(function(image) {
      const clone = image.cloneNode(true);
      clone.classList = image.classList;
      clone.classList.add('-pc'); // PCのみで表示
      clone.classList.add('clone'); // Clone
      wrapper.appendChild(clone);
      size += image.clientWidth;
    });
    return size;
  }
  function setKeyFrame(baseSize) {
    let style = document.createElement('style');
    let keyFrames = "@keyframes scroll { 100% { transform: translateX(-" + baseSize + "px); }}";
    style.innerHTML = keyFrames;
    _head.appendChild(style);
  }

  /**
   * PC用エリアグロナビ-その他の検索ドロップダウン
   */
  const btnOthers = _d.getElementsByClassName('othersSearch')[0];
  if (btnOthers) {
    btnOthers.addEventListener('click', function(e) {
      // e.preventDefault();
      btnOthers.classList.toggle('show');
    });
  }

  /**
   * PC用エリア検索
   */
  const tabs = _d.querySelectorAll('.categoryList > li:not(.requirement)');
  const areas = _d.querySelector('.areaSearchBox_map_inbox');
  let currentArea = 'address';

  if (areas) {
    [].slice.call(tabs).forEach(function(tab) {
      tab.addEventListener('click', setArea);
    });
  }

  function setArea(e) {
    e.preventDefault();
    // 状態リセット
    [].slice.call(tabs).forEach(function(tab) {
      tab.classList.remove('js-on');
    });
    areas.classList.remove('--' + currentArea);

    // 選択されたタブに応じた表示に切り替え
    const selectedArea = this.classList[0];
    this.classList.add('js-on');
    areas.classList.add('--' + selectedArea);
    currentArea = selectedArea;
  }

  /**
   * PC カレンダーボタントグル
   */
  const calButton = _d.querySelectorAll('.calendar td');
  if (calButton) {
    [].slice.call(calButton).forEach(function(btn) {
      btn.addEventListener('click', function() {
        btn.classList.toggle('selected');
      });
    });
  }

}(window, document));


/**
 * GPSTAB
 */
!(function(_w, _d) {
  const wrap = _d.getElementsByClassName('gpsWrapper')[0];
  const gpstab = _d.getElementsByClassName('gpstab')[0];
  let btns;

  if (gpstab) {
    btns = _d.querySelectorAll('.gpstab > li > a');
    [].slice.call(btns).forEach(function(btn) {
      btn.addEventListener('click', changeTab);
    });
  }

  function changeTab(e) {
    e.preventDefault();
    [].slice.call(btns).forEach(function(btn) {
      btn.parentNode.classList.remove('js-on');
    });
    e.target.parentNode.classList.add('js-on');
    if (e.target.parentNode.classList.contains('gpstab_map')) {
      wrap.classList.add('js-show-map');
      wrap.classList.remove('js-show-list');
    } else {
      wrap.classList.add('js-show-list');
      wrap.classList.remove('js-show-map');
    }
  }

}(window, document));



/**
 *  Util
 */
// self 要素から targetClassName のクラスを持つ親を捜査
// 対象が無ければ undefined を返す
function closest(self, targetClassName) {
  let flg = false;
  let element;
  let _self = self;
  while (!flg) {
      let parent = _self.parentNode;
      if (parent.classList.contains(targetClassName)) {
          element = parent;
          flg = true;
      } else {
          // body までさかのぼったら終了
          if (parent.nodeName == 'BODY') {
              flg = true;
          }
          _self = parent;
      }
  }
  return element;
}


/**
 * deital TAB
 */
!(function(_w, _d) {
  const wrap = _d.getElementsByClassName('hoteldetail')[0];
  const gpstab = _d.getElementsByClassName('hoteldetail_selectlist')[0];
  let btns;

  if (gpstab) {
    btns = _d.querySelectorAll('.hoteldetail_selectlist > li > a');
    [].slice.call(btns).forEach(function(btn) {
      btn.addEventListener('click', changeTab);
    });
  }

  function changeTab(e) {
    e.preventDefault();
    [].slice.call(btns).forEach(function(btn) {
      btn.parentNode.classList.remove('current');
    });
    e.target.parentNode.classList.add('current');
    if (e.target.parentNode.classList.contains('tile')) {
      wrap.classList.add('js-show-tile');
      wrap.classList.remove('js-show-list');
    } else {
      wrap.classList.add('js-show-list');
      wrap.classList.remove('js-show-tile');
    }
  }

}(window, document));

/**
 * 部屋写真
 */
!(function(document) {
  let targetImage = document.querySelector('.hoteldetail_picture_img > img'),
      targetRoomName = document.getElementsByClassName('hoteldetail_picture_roomname')[0],
      thumbs = document.querySelectorAll('.hoteldetail_picture_thumb a');

  [].slice.call(thumbs).forEach(function(btn) {
    btn.addEventListener('click', changeImage);
  });

  function changeImage(e) {
    e.preventDefault();
    let img = e.currentTarget.dataset.imgpath,
        roomno = e.currentTarget.dataset.roomno;

    [].slice.call(thumbs).forEach(function(btn) {
      btn.classList.remove('js-on');
    });
    e.currentTarget.classList.add('js-on');
    targetImage.src = img;
    targetRoomName.innerText = roomno;
  }

}(document));

/**
 * アコーディオン
 */
const menu = document.querySelectorAll(".js-menu");

function toggle() {
  const content = this.nextElementSibling;
  this.classList.toggle("is-active");
  content.classList.toggle("is-open");
}

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", toggle);
}


/**
 * fixedナビゲーションの固定切り替え
 */
 /*!(function(_w, _d) {

  const targetElements = _d.getElementsByClassName('js-sticky');
  const mainLeftStyle = _d.querySelector('.main_btm_left').style;
  let navs = [], winHeight;

  if (targetElements.length > 0) {

    [].slice.call(targetElements).forEach(function(elm) {
      navs.push(new nav(elm));
    });

    winHeight = _d.querySelector('html').clientHeight; // HTML要素のclientHeightは特例でViewportの高さをとる（横スクロールバーを含まない）

    _w.addEventListener('scroll', _check);
    _check();

    _w.addEventListener('resize', function() {
      winHeight = _w.innerHeight;
      mainLeftStyle.paddingTop = null;

      [].slice.call(navs).forEach(function(nav) {
        // 位置取得のために表示リセット
        nav.element.classList.remove('js-fixed');
        nav.navHeight = nav.element.offsetHeight;
        nav.basePos = nav.element.getBoundingClientRect().top + _w.pageYOffset + nav.navHeight;
        checkFixed(nav);
      });
    });
  }

  function nav(nav) {
    let style = _w.getComputedStyle(nav),
        navHeight = nav.offsetHeight,
        pcsp;
    if (nav.classList.contains('-pc')) {
      pcsp = 'pc';
    } else if (nav.classList.contains('-sp')) {
      pcsp = 'sp';
    }
    return {
      element: nav,
      navHeight: navHeight,
      margin: parseInt(style.marginTop.replace('px', ''), 10) + parseInt(style.marginBottom.replace('px', ''), 10),
      basePos: nav.getBoundingClientRect().top + _w.pageYOffset + navHeight,
      isFixed: true,
      pcsp: pcsp
    }
  }

  function _check() {
    [].slice.call(navs).forEach(function(nav) {
      checkFixed(nav);
    });
  }

  function checkFixed(nav) {

    if (_w.pageYOffset + nav.navHeight >= nav.basePos) {
      nav.isFixed = true;
    } else {
      nav.isFixed = false;
    }
    if (nav.pcsp === undefined ||
          nav.pcsp === 'pc' && _w.matchMedia('screen and (min-width:768px)').matches ||
            nav.pcsp === 'sp' && _w.matchMedia('screen and (max-width:767px)').matches) {
      if (nav.isFixed) {
        nav.element.classList.add('js-fixed');
        mainLeftStyle.paddingTop = nav.navHeight + nav.margin + "px";
      } else {
        nav.element.classList.remove('js-fixed');
        mainLeftStyle.paddingTop = null;
      }
    }

  }


}(window, document));*/