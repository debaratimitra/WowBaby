
// header menu

$(".menuClick").click(function(){
  $("body").toggleClass("showM")
});
$(".overlayBody").click(function(){
  $("body").removeClass("showM")
});

// barClick

$(".barClick").click(function(){
  $("body").toggleClass("showBar")
});
$(".overlayBody").click(function(){
  $("body").removeClass("showBar")
});

// slider

$('.sliderInner').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll:2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow:1,
            slidesToScroll:1
          }
        }
    ]
      });
///

///product slider

$('.slideMain').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows:false,
  asNavFor: '.slideThumb'
});
$('.slideThumb').slick({
  slidesToShow:5,
  slidesToScroll: 1,
  asNavFor: '.slideMain',
  dots: false,
  arrows:false,
  vertical:true,
  focusOnSelect: true
});

  ///AOS

  AOS.init({
    once: true, 
  });

  /////for range slider

  function formatValue(value, type) {
     if (type === 'age') {
       if (value < 24) return `${value} Months`;
       return `${Math.floor(value / 12)} Years`;
     } else if (type === 'price') {
       if (value >= 100) return `$${value} Above`;
       return `$${value}`;
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
       if (+minRange.value > +maxRange.value) {
         minRange.value = maxRange.value;
       }
       updateTrack();
     });
   
     maxRange.addEventListener('input', () => {
       if (+maxRange.value < +minRange.value) {
         maxRange.value = minRange.value;
       }
       updateTrack();
     });
   
     updateTrack();
   }
   
   // Initialize all sliders on page load
   document.querySelectorAll('[data-slider]').forEach(setupSlider);

////add active class
const listItems = document.querySelectorAll('.colorOp li');

listItems.forEach(item => {
  item.addEventListener('click', function () {
    // Remove active class from all list items
    listItems.forEach(li => li.classList.remove('active'));
    // Add active class to the clicked item
    this.classList.add('active');
  });
});

/////

$(".loginUp").click(function(){
  $(".loginBox").addClass("active");
  $(".signUp").css("display", "none");
});

$(".signUpB").click(function(){
  $(".loginBox").removeClass("active");
  $(".signUp").css("display", "block");
});

////accordian///

$(document).ready(function(){
   $(".accordionWrp").on("click", ".heading", function() {

   $(this).toggleClass("active").next().slideToggle();

   $(".contents").not($(this).next()).slideUp(300);
                
   $(this).siblings().removeClass("active");
   });
  });
  
  ///quantity

  (function () {
  const quantityContainer = document.querySelector(".quantity");
  const minusBtn = quantityContainer.querySelector(".minus");
  const plusBtn = quantityContainer.querySelector(".plus");
  const inputBox = quantityContainer.querySelector(".input-box");

  updateButtonStates();

  quantityContainer.addEventListener("click", handleButtonClick);
  inputBox.addEventListener("input", handleQuantityChange);

  function updateButtonStates() {
    const value = parseInt(inputBox.value);
    minusBtn.disabled = value <= 1;
    plusBtn.disabled = value >= parseInt(inputBox.max);
  }

  function handleButtonClick(event) {
    if (event.target.classList.contains("minus")) {
      decreaseValue();
    } else if (event.target.classList.contains("plus")) {
      increaseValue();
    }
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

  function handleQuantityChange() {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 1 : value;

    // Execute your code here based on the updated quantity value
    console.log("Quantity changed:", value);
  }
})();

////ajax call

fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log("✅ JSON Loaded Successfully");
      console.log(data); // Full data output
      data.forEach(product => {
        console.log(`${product.name} - $${product.price}`);
      });
    })
    .catch(error => {
      console.error("❌ Failed to load JSON:", error);
    });