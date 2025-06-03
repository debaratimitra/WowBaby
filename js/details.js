function singlePro() {
   const proData = JSON.parse(localStorage.getItem("singleProductDetails")) || {};

   if (!proData.name) {
     window.location.href = "shop.html"; // Redirect if no product data found
   }
   let element = "";
   let thumbs = "";
   let slider = "";
 
   proData?.slider?.forEach((image, i) => {
     thumbs += `<li class="${i === 0 ? 'active' : ''}">
                 <a href="javascript:void(0);">
                   <img src="images/${image}" alt="">
                 </a>
               </li>`;
   });
 
   proData?.sliderImage?.forEach((image, i) => {
     slider += `<div class="sliderPro">
                 <img src="images/${image}" alt="">
               </div>`;
   });
 
   element += `
     <div class="col-md-6 col-sm-12">
       <div class="detailsInner">
         <div class="">
           <ul class="slideThumb">${thumbs}</ul>
         </div>
         <div class="slideMain">${slider}</div>
       </div>
     </div>
     <div class="col-md-6 col-sm-12">
       <div class="productDescrip">
         <h2>${proData.name}</h2>
         <div class="proPrice">
           $${proData.price}
           <span class="crossPrice">$${proData.actualPrice}.00</span>
         </div>
         <h5>Description:</h5>
         <p>${proData.description}</p>
         <div class="bottomPro text-start">
           <div class="quantity">
             <button class="minus" aria-label="Decrease">−</button>
             <input type="number" class="input-box" value="1" min="1" max="10">
             <button class="plus" aria-label="Increase">+</button>
           </div>
           <div class="onlBtn">
             <div class="gloBalBtn" data-aos="fade-left" data-aos-duration="400">
              <a href="javascript:void(0);" onclick='addToCart(${JSON.stringify(proData)}, 1)'>ADD TO CART</a>
             </div>
             <div class="gloBalBtn" data-aos="fade-left" data-aos-duration="400">
               <a href="checkout.html" class="blackBg">CHECKOUT NOW</a>
             </div>
           </div>
         </div>
       </div>
     </div>
   `;
 
   $('#showDetails').html(element);
 
   // Store product data in memory
   $('#showDetails').data('product', proData);
 }
singlePro();

// Handle quantity +/-
$(document).on('click', '.plus', function () {
  const input = $(this).siblings('.input-box');
  let val = parseInt(input.val()) || 1;
  if (val < 10) input.val(val + 1);
});

$(document).on('click', '.minus', function () {
  const input = $(this).siblings('.input-box');
  let val = parseInt(input.val()) || 1;
  if (val > 1) input.val(val - 1);
});

 