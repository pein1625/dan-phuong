// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });

  $(".menu-item-group > .menu-link, .menu-item-mega > .menu-link").on("click", function (e) {
    if ($(window).width() < 1200 || !mobileAndTabletCheck()) return;

    e.preventDefault();
  });
});

// navbar mobile toggle
$(function () {
  var $body = $("html, body");
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
  });
});

$(function () {
  var $moveTop = $(".btn-movetop");
  var $window = $(window);
  var $body = $("html");

  if (!$moveTop.length) return;

  $window.on("scroll", function () {
    if ($window.scrollTop() > 150) {
      $moveTop.addClass("show");

      return;
    }

    $moveTop.removeClass("show");
  });

  $moveTop.on("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  spaceSlider();
  newsSlider();
  sampleSyncSlider();
});

function spaceSlider() {
  if (!$('.space-thumb-slider').length) return;

  addSwiper('.space-thumb-slider', {
    loop: false,
    navigation: true,
    spaceBetween: 8,
    speed: 500,
    slidesPerView: 3,
    preventClicks: true,
    breakpoints: {
      576: {
        spaceBetween: 16
      },
      768: {
        spaceBetween: 16,
        slidesPerView: 4
      },
      992: {
        spaceBetween: 16,
        slidesPerView: 5
      },
      1200: {
        spaceBetween: 30,
        slidesPerView: 6
      }
    }
  });

  $('.js-space-thumb-slide').on('click', function (e) {
    e.preventDefault();

    const $el = $(this);

    console.log('asdfsdf');

    if ($el.hasClass('active')) return false;

    $el.siblings('.active').removeClass('active');
    $el.addClass('active');

    const url = $el.data('url');

    $('.js-space-frame').attr('src', url);
  });
}

function newsSlider() {
  addSwiper('.news-slider', {
    loop: true,
    navigation: true,
    spaceBetween: 0,
    speed: 500,
    slidesPerView: 1.5,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 4
      }
    }
  });
}

function sampleSyncSlider() {
  if (!$(".sample-slider, .sample-thumb-slider").length) {
    return;
  }

  var thumbSlider = addSwiper(".sample-thumb-slider", {
    navigation: true,
    slidesPerView: 4,
    freeMode: true,
    spaceBetween: 10,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
}

$(function () {
  if (!$(".preview-slider, .thumb-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper(".thumb-slider", {
    navigation: true,
    slidesPerView: 4,
    freeMode: true,
    spaceBetween: 10,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

const getUniqId = () => {
  const ts = `${new Date().getTime()}`.substring(3, 13);
  const map = [['0', 'a', 'b'], ['1', 'c', 'd'], ['2', 'e', 'f'], ['3', 'g', 'h'], ['4', 'i', 'j'], ['5', 'k', 'l'], ['6', 'm', 'n'], ['7', 'o', 'p'], ['8', 'q', 'r'], ['9', 's', 't']];
  let id = '';
  for (let i = 0; i < ts.length; i++) {
    const n = Number(ts.charAt(i));
    const arr = map[n];
    id += arr[Math.floor(Math.random() * arr.length)];
  }
  return id;
};

// search button toggle
$(function () {
  $(".search-btn").on("click", function (e) {
    e.stopPropagation();

    $(".search").slideToggle('fast');
    $(".search").find("input").focus();
  });

  $(".search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    if ($(window).width() >= 1200) {
      $(".search").slideUp('fast');
    }
  });

  $('.js-password-field').on('click', '.input-group-text', function (e) {
    e.preventDefault();

    const $btn = $(this);
    const $group = $btn.closest('.js-password-field');
    const $input = $group.find('.form-control');

    $group.toggleClass('show-password');

    if ($group.hasClass('show-password')) {
      $input.attr('type', 'text');
      $btn.empty().append(`<i class="fal fa-fw fa-eye-slash" />`);
    } else {
      $input.attr('type', 'password');
      $btn.empty().append(`<i class="fal fa-fw fa-eye" />`);
    }
  });

  createPostMenu();

  $('.js-daterangepicker').daterangepicker({
    timePicker: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: 'M/DD hh:mm A'
    }
  });
});

function createPostMenu() {
  const $content = $('.post__content');
  const $menu = $('.post__menu');

  if (!$content.length || !$menu.length) return;

  const menu = [];
  let subMenu = null;
  let counter = 0;

  $content.find('h2, h3, h4').each(function () {
    counter++;

    const headingClass = 'content-heading-' + counter;

    $(this).addClass(headingClass);

    const item = {
      text: $(this).text(),
      el: this,
      class: headingClass,
      children: []
    };

    switch (this.tagName.toLowerCase()) {
      case 'h2':
        subMenu = item.children;
        menu.push(item);
        break;
      case 'h3':
        if (subMenu) {
          subMenu.push(item);
        } else {
          menu.push(item);
        }
        break;
      case 'h4':
        if (subMenu) {
          subMenu.push(item);
        } else {
          menu.push(item);
        }
        break;
      default:
    }
  });

  $menu.removeClass('d-none');
  const $menuBody = $menu.find('.post__menu-content');

  menu.forEach((item, index) => {
    $menuBody.append(`
<div class="post__menu-item" data-target="${item.class}">${index + 1}, ${item.text}</div>
    `);

    item.children.forEach((subItem, subItemIndex) => {
      $menuBody.append(`
<div class="post__menu-sub-item" data-target="${subItem.class}">${index + 1}.${subItemIndex + 1}, ${subItem.text}</div>
      `);
    });
  });

  $menuBody.on('click', '.post__menu-item, .post__menu-sub-item', function () {
    const target = $(this).data('target');

    const $target = $('.' + target);

    if ($target.length) {
      $('html,body').animate({
        scrollTop: $target.offset().top - 64
      }, 'fast');
    }
  });
}