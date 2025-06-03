function singlePro() {
    let proData = JSON.parse(localStorage.getItem("details")) || [];
  
    let element = "";
  
    proData.forEach(product => {
      element += `
      <div class="col-md-6 col-sm-12">
      <div class="detailsInner">
         <div class="">
            <ul class="slideThumb">
               <li class="active">
                  <a href="javascript:void(0);">
                     <img src="images/thumb1.png" alt="">
                  </a>
               </li>
               <li>
                  <a href="javascript:void(0);">
                     <img src="images/thumb2.png" alt="">
                  </a>
               </li>
               <li>
                  <a href="javascript:void(0);">
                     <img src="images/thumb3.png" alt="">
                  </a>
               </li>
               <li>
                  <a href="javascript:void(0);">
                     <img src="images/thumb4.png" alt="">
                  </a>
               </li>
               <li>
                  <a href="javascript:void(0);">
                     <img src="images/thumb5.png" alt="">
                  </a>
               </li>
               <li>
                  <a href="javascript:void(0);">
                     <img src="images/thumb1.png" alt="">
                  </a>
               </li>
            </ul>
         </div>
         <div class="slideMain">
            <div class="sliderPro">
               <img src="images/mainSlide1.png" alt="">
            </div>
            <div class="sliderPro">
               <img src="images/mainSlide1.png" alt="">
            </div>
            <div class="sliderPro">
               <img src="images/mainSlide1.png" alt="">
            </div>
            <div class="sliderPro">
               <img src="images/mainSlide1.png" alt="">
            </div>
            <div class="sliderPro">
               <img src="images/mainSlide1.png" alt="">
            </div>
            <div class="sliderPro">
               <img src="images/mainSlide1.png" alt="">
            </div>
         </div>
      </div>
   </div>
   <div class="col-md-6 col-sm-12">
      <div class="productDescrip">
         <h2>M'PRINCESS Sleeveless Floral Ruffle Detailed - Red</h2>
         <div class="proPrice">
            $27.00
            <span class="crossPrice">$32.00</span>
         </div>
         <h5>Description:</h5>
         <p>This is a beautiful red sleeveless party dress for girls, featuring a tulle skirt with ruffled layers at the hem and a fitted bodice adorned with sparkling embellishments and a central rosette design.</p>
         <h5>Age:</h5>
         <ul class="sizeList">
            <li>
               <a href="javascript:void(0);">0-5M</a>
            </li>
            <li>
               <a href="javascript:void(0);">6-12M</a>
            </li>
            <li>
               <a href="javascript:void(0);">1-3Y</a>
            </li>
            <li>
               <a href="javascript:void(0);">4-6Y</a>
            </li>
            <li>
               <a href="javascript:void(0);">7-10Y</a>
            </li>
            <li>
               <a href="javascript:void(0);">10-15Y</a>
            </li>
         </ul>
         <div class="bottomPro text-start">
            <div class="quantity">
              <button class="minus" aria-label="Decrease">−</button>
              <input type="number" class="input-box" value="1" min="1" max="10">
              <button class="plus" aria-label="Increase">+</button>
            </div>
            <div class="onlBtn">
               <div class="gloBalBtn" data-aos="fade-left" data-aos-duration="400">
                  <a href="javascript:void(0);">ADD TO CART</a>
               </div>
               <div class="gloBalBtn" data-aos="fade-left" data-aos-duration="400">
                  <a href="checkout.html" class="blackBg">CHECKOUT NOW</a>
               </div>
            </div>
         </div>
      </div>
   </div>
      `;
    });
  
    $('#showDetails').html(element);
  }
  