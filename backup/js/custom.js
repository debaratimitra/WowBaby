// DOM-Ready wrapper for native JS
document.addEventListener("DOMContentLoaded", function () {

  // === jQuery: Toggle Header Menus ===
  $(".menuClick").click(function () {
    $("body").toggleClass("showM");
  });
  $(".overlayBody").click(function () {
    $("body").removeClass("showM showBar");
  });
  $(".barClick").click(function () {
    $("body").toggleClass("showBar");
  });

  // === Slick Sliders ===
  if ($('.sliderInner').length) {
    $('.sliderInner').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  if ($('.slideMain').length && $('.slideThumb').length) {
    $('.slideMain').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.slideThumb'
    });

    $('.slideThumb').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.slideMain',
      dots: false,
      arrows: false,
      vertical: true,
      focusOnSelect: true
    });
  }

  // === AOS Init ===
  AOS.init({ once: true });

  // === Range Sliders ===
  function formatValue(value, type) {
    if (type === 'age') {
      return value < 24 ? `${value} Months` : `${Math.floor(value / 12)} Years`;
    } else if (type === 'price') {
      return value >= 100 ? `$${value} Above` : `$${value}`;
    }
    return value;
  }

  function setupSlider(slider) {
    const minRange = slider.querySelector('.min-range');
    const maxRange = slider.querySelector('.max-range');
    const minLabel = slider.querySelector('.min-label');
    const maxLabel = slider.querySelector('.max-label');
    const track = slider.querySelector('.track-fill');
    const type = slider.dataset.type || 'age';

    function updateTrack() {
      const min = parseInt(minRange.value);
      const max = parseInt(maxRange.value);
      const range = parseInt(minRange.max) - parseInt(minRange.min);

      const percentMin = ((min - minRange.min) / range) * 100;
      const percentMax = ((max - minRange.min) / range) * 100;

      track.style.left = percentMin + '%';
      track.style.width = (percentMax - percentMin) + '%';

      minLabel.textContent = formatValue(min, type);
      maxLabel.textContent = formatValue(max, type);
    }

    minRange.addEventListener('input', () => {
      if (+minRange.value > +maxRange.value) minRange.value = maxRange.value;
      updateTrack();
    });

    maxRange.addEventListener('input', () => {
      if (+maxRange.value < +minRange.value) maxRange.value = minRange.value;
      updateTrack();
    });

    updateTrack();
  }

  document.querySelectorAll('[data-slider]').forEach(setupSlider);

  // === Color Option Active Toggle ===
  document.querySelectorAll('.colorOp li').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.colorOp li').forEach(li => li.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // === Login and Signup Toggle ===
  $(".loginUp").click(function () {
    $(".loginBox").addClass("active");
    $(".signUp").hide();
  });

  $(".signUpB").click(function () {
    $(".loginBox").removeClass("active");
    $(".signUp").show();
  });

  // === Accordion ===
  $(".accordionWrp").on("click", ".heading", function () {
    $(this).toggleClass("active").next().slideToggle();
    $(".contents").not($(this).next()).slideUp(300);
    $(this).siblings().removeClass("active");
  });

  // === Quantity Box ===
  const quantityContainer = document.querySelector(".quantity");
  if (quantityContainer) {
    const minusBtn = quantityContainer.querySelector(".minus");
    const plusBtn = quantityContainer.querySelector(".plus");
    const inputBox = quantityContainer.querySelector(".input-box");

    function updateButtonStates() {
      const value = parseInt(inputBox.value);
      minusBtn.disabled = value <= 1;
      plusBtn.disabled = value >= parseInt(inputBox.max);
    }

    function handleQuantityChange() {
      let value = parseInt(inputBox.value);
      value = isNaN(value) ? 1 : value;
      console.log("Quantity changed:", value);
    }

    function decreaseValue() {
      let value = parseInt(inputBox.value);
      value = isNaN(value) ? 1 : Math.max(value - 1, 1);
      inputBox.value = value;
      updateButtonStates();
      handleQuantityChange();
    }

    function increaseValue() {
      let value = parseInt(inputBox.value);
      value = isNaN(value) ? 1 : Math.min(value + 1, parseInt(inputBox.max));
      inputBox.value = value;
      updateButtonStates();
      handleQuantityChange();
    }

    quantityContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("minus")) decreaseValue();
      else if (event.target.classList.contains("plus")) increaseValue();
    });

    inputBox.addEventListener("input", handleQuantityChange);
    updateButtonStates();
  }

  // === AJAX Fetch JSON ===

  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log("JSON Loaded Successfully");
      console.log(data);
      data.forEach(product => {
        console.log(`${product.name} - $${product.price} - $${product.type}`);
      });
    })
    .catch(error => {
      console.error("Failed to load JSON:", error);
    });

});
