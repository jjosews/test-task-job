const currencyIcons = document.querySelectorAll('.pricing-item__price-currency span');
const priceValues = document.querySelectorAll('.pricing-item__price-num span');
const pricePeriods = document.querySelectorAll('.pricing-item__price-period');

// Добавляем обработчик событий для каждого валютного значка
currencyIcons.forEach(function (icon, index) {
  icon.addEventListener('click', function () {
    // Определяем следующую валюту
    const nextIndex = (index + 1) % currencyIcons.length;
    const nextCurrency = currencyIcons[nextIndex].dataset.currency;

    // Устанавливаем текущую валюту и цены для всех элементов
    currencyIcons.forEach(function (currencyIcon) {
      currencyIcon.classList.toggle('active', currencyIcon.dataset.currency === nextCurrency);
    });

    priceValues.forEach(function (priceValue) {
      priceValue.classList.toggle('active', priceValue.dataset.currency === nextCurrency);
    });
  });
});

// Добавляем обработчик событий для периода цены (месяц/день)
pricePeriods.forEach(function (period) {
  period.addEventListener('click', function () {
    const currentPeriod = period.textContent.trim();

    if (currentPeriod === '/Months') {
      pricePeriods.forEach(function (period) {
        period.textContent = '/Days';
      });
      // Обновляем цены на основе выбранного периода (дней)
      priceValues.forEach(function (priceValue) {
        const originalPrice = parseInt(priceValue.textContent);
        const newPrice = Math.round(originalPrice / 30);
        priceValue.textContent = newPrice;
      });
    } else if (currentPeriod === '/Days') {
      pricePeriods.forEach(function (period) {
        period.textContent = '/Months';
      });
      // Возвращаем цены обратно на основе месяца
      priceValues.forEach(function (priceValue) {
        const originalPrice = parseInt(priceValue.textContent);
        const newPrice = originalPrice * 30;
        priceValue.textContent = newPrice;
      });
    }
  });
});


// ----------------------------------------- //


const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header-menu');

if(headerBurger){
  headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger--active');
    headerMenu.classList.toggle('header-menu--visible');
  });
}


// ----------------------------------------- //


(function() {
  'use strict';
  const breakpoint = window.matchMedia('(min-width:769px)');
  let pricingSlider;
  const breakpointChecker = function() {
    if ( breakpoint.matches === true ) {
	  if ( pricingSlider !== undefined ) pricingSlider.destroy( true, true );
	  return;
      } else if ( breakpoint.matches === false ) {
        return enableSwiper();
      }
  };
  const enableSwiper = function() {
    pricingSlider = new Swiper ('.pricing-slider', {
      loop: false,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      spaceBetween: 16,
    });
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
})();