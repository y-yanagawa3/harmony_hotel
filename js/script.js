 

// ====================
// 共通
// ====================

document.addEventListener('DOMContentLoaded', () => {
  toggleHumMenu()
  toggleReserveMenu()
  scrollFade()
});

window.addEventListener('scroll', () => {
  scrollFade();
});

// ====================
// fade
// ====================

const header = document.querySelector('.header');

function scrollFade() {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;

  if (!header) return;

  if (scrollTop > viewportHeight) {
    header.classList.add('is-show');
  } else {
    header.classList.remove('is-show');
  }
}

const fadeElements = document.querySelectorAll('.js-fade');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

fadeElements.forEach((element) => {
  observer.observe(element);
});

// ====================
// toggle
// ====================

function toggleHumMenu() {
  const humMenu = document.querySelector('.hum');
  const headerNav = document.querySelector('.header-nav');
  const globalNav = document.querySelector('.global-nav');
  const weddingHeader = document.querySelector('.wedding-header');
  const weddingNav = document.querySelector('.wedding-nav');

  if (!humMenu) return;

  humMenu.addEventListener('click', () => {

    humMenu.classList.toggle('is-active');

    if (headerNav) {
      headerNav.classList.toggle('is-open');
    }
    if (globalNav) {
      globalNav.classList.toggle('is-show');
    }
    if (weddingHeader) {
      weddingHeader.classList.toggle('is-open');
    }
    if (weddingNav) {
      weddingNav.classList.toggle('is-open');
    }

    document.body.classList.toggle('is-menu-open');
  });

  // ナビをクリックしたらメニューを閉じる
  const navLinks = document.querySelectorAll('.header-nav a, .global-nav a, .wedding-nav a');

  navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
      humMenu.classList.remove('is-active');
      if (headerNav) {
        headerNav.classList.remove('is-open');
      }
      if (globalNav) {
        globalNav.classList.remove('is-show');
      }
      if (weddingHeader) {
        weddingHeader.classList.remove('is-open');
      }
      if (weddingNav) {
        weddingNav.classList.remove('is-open');
      }
      document.body.classList.remove('is-menu-open');
    });
  });
}


function toggleReserveMenu() {
  const reservationButtons = document.querySelectorAll('.reservation-button__inner');
  const reservation = document.querySelector('#reservation');
  const closeTargets = document.querySelectorAll('.reservation-modal__close, .reservation-modal__overlay');

  if (!reservation) return;

  reservationButtons.forEach((reservationButton) => {
    reservationButton.addEventListener('click', () => {
      reservation.classList.toggle('is-show');
    });
  });

  closeTargets.forEach((closeTarget) => {
    closeTarget.addEventListener('click', () => {
      reservation.classList.remove('is-show');
    });
  });
}

// ====================
// reservation-modal
// ====================

const tabs = document.querySelectorAll('.reservation-modal__tab');
const panels = document.querySelectorAll('.reservation-modal__panel');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => {
      item.classList.remove('is-active');
    });
    panels.forEach(panel => {
      panel.classList.remove('is-active');
    });
    tab.classList.add('is-active');
    panels[index].classList.add('is-active');
  });
});

// ====================
// restaurant
// ====================

const restaurantTabs = document.querySelectorAll('.restaurant__tab');
const restaurantContents = document.querySelectorAll('.restaurant__content');

restaurantTabs.forEach((restaurantTab, index) => {
  restaurantTab.addEventListener('click', () => {
    restaurantTabs.forEach(item => {
      item.classList.remove('is-active');
    });
    restaurantContents.forEach(restaurantContent => {
      restaurantContent.classList.remove('is-active');
    });
    restaurantTab.classList.add('is-active');
    restaurantContents[index].classList.add('is-active');
  });
});

const topSlider = document.querySelector('.slider-top');

if (topSlider) {
  $('.slider').slick();
  $(".slider-top")
    // 最初のスライドに"add-animation"のclassを付ける(data-slick-index="0"が最初のスライドを指す)
    .on("init", function () {
      $('.slick-slide[data-slick-index="0"]').addClass("add-animation");
    })
    // 通常のオプション
    .slick({
      autoplay: true, // 自動再生ON
      fade: true, // フェードON
      arrows: false, // 矢印OFF
      speed: 2000, // スライド、フェードアニメーションの速度2000ミリ秒
      autoplaySpeed: 4000, // 自動再生速度4000ミリ秒
      pauseOnFocus: false, // フォーカスで一時停止OFF
      pauseOnHover: false, // マウスホバーで一時停止OFF
      accessibility: false,
    })
    .on({
      // スライドが移動する前に発生するイベント
      beforeChange: function (event, slick, currentSlide, nextSlide) {
        // 表示されているスライドに"add-animation"のclassをつける
        $(".slick-slide", this).eq(nextSlide).addClass("add-animation");
        // あとで"add-animation"のclassを消すための"remove-animation"classを付ける
        $(".slick-slide", this).eq(currentSlide).addClass("remove-animation");
      },
      // スライドが移動した後に発生するイベント
      afterChange: function () {
        // 表示していないスライドはアニメーションのclassを外す
        $(".remove-animation", this).removeClass(
          "remove-animation add-animation"
        );
      },
    });

}


// ====================
// stay-modal
// ====================

const facilityModal = document.querySelector('#facility-modal');

if (facilityModal) {

  fetch('./json/facilities.json')
    .then((response) => response.json())
    .then((facilities) => {

      // ① facilityButtonsを取得
      const facilityButtons = document.querySelectorAll('.facility-card__button');
      // ② facilityModalを取得
      const facilityModal = document.querySelector('#facility-modal');
      // ③ closeButtonを取得
      const closeButton = document.querySelector('.facility-modal__close');
      // ④ モーダルのタイトルを取得
      const facilityTitle = facilityModal.querySelector('.facility-modal__title');
      // ⑤ モーダルのリストを取得
      const facilityList = facilityModal.querySelector('.facility-modal__list');

      // ⑥ facilityButtonsをforEach
      facilityButtons.forEach((facilityButton) => {
        facilityButton.addEventListener('click', () => {
          console.log(window.scrollY);
          // ⑦ クリックされたらfacilityIdを取得
          const facilityId = facilityButton.parentElement.dataset.facility;
          // ⑧ JSONからfind()で該当するfacilityを取得
          const facility = facilities.find((facility) => {
            return facility.id === facilityId;
          });

          // ⑨ タイトルを表示
          facilityTitle.textContent = facility.title;
          // ⑩ 前回のリストを削除
          facilityList.textContent = '';
          // ⑪ itemsを1つずつ取り出す
          facility.items.forEach((item) => {
            // liを作る
            const listItem = document.createElement('li');
            // 「・」のspanを作る
            const bullet = document.createElement('span');
            bullet.classList.add('facility-modal__bullet');
            bullet.textContent = '・';
            // 項目の文字を作る
            const itemText = document.createTextNode(item);
            // liに「・」を追加
            listItem.appendChild(bullet);
            // liに項目の文字を追加
            listItem.appendChild(itemText);
            // ulにliを追加
            facilityList.appendChild(listItem);
          });

          // モーダルを開く
          facilityModal.showModal();
        });
      });
      // closeButtonでモーダルを閉じる
      closeButton.addEventListener('click', () => {
        facilityModal.close();
      });

    });

}

// ====================
// swiper
// ====================

// --------------------
// wedding
// --------------------
const mvSlider = document.querySelector('.mv-hero__slider');

if (mvSlider) {
  const swiper = new Swiper(mvSlider, {
    loop: true,
    effect: 'fade',
    speed: 2000,
    autoplay: {
      delay: 4000,
      pauseOnMouseEnter: false
    },
  });
}

// --------------------
// stay
// --------------------
const roomsSliders = document.querySelectorAll('.rooms__slider');

roomsSliders.forEach((roomsSlider) => {

  const pagination = roomsSlider.querySelector('.rooms__pagination')
  const slides = roomsSlider.querySelectorAll('.rooms__slide img');

  const swiper = new Swiper(roomsSlider, {
    loop: false,
    effect: 'slide',
    speed: 1000,

    pagination: {
      el: pagination,
      clickable: true,

      renderBullet: function (index, className) {

        const images = slides[index];

        return `
          <button class="${className} rooms__pagination-item" type="button">
            <img src="${images.src}" alt="">
          </button>
        `;
      }

    }
  })

});

// ====================
// wedding-modal
// ====================

const galleryItems = document.querySelectorAll('.photo-gallery__item');
const galleryModal = document.querySelector('.photo-gallery__modal');

if (galleryModal) {

  const galleryModalImg = galleryModal.querySelector('img');
  const galleryModalClose = galleryModal.querySelector('.photo-gallery__modal-close');

  galleryItems.forEach((galleryItem) => {
    galleryItem.addEventListener('click', () => {

      const image = galleryItem.querySelector('img');

      galleryModalImg.src = image.src;
      galleryModalImg.alt = image.alt;

      galleryModal.showModal();
    });
  });

  galleryModalClose.addEventListener('click', () => {
    galleryModal.close();
  });
}

const contactModal = document.querySelector('.contact-modal');
const reservationButtonWedding = document.querySelector('.reservation-button--wedding');

if (contactModal) {
  const contactModalClose = contactModal.querySelector('.contact-modal__close');

  reservationButtonWedding.addEventListener('click', () => {
    contactModal.showModal();
  });

  contactModalClose.addEventListener('click', () => {
    contactModal.close();
  });

}