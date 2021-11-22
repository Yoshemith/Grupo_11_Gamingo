const sliderImg = document.querySelector('.slider');
const sliderButtons = document.querySelector('.slider_btn');
const numberOfImg = document.querySelector('.slider img').length;
let imageIndex = 1;
let translateX = 0;

sliderButtons.forEach(button=>{
    button.addEventListener('click', event=>{
        if (event.target.id === "previous"){
            if(imageIndex !==1){
                imageIndex --;
                translateX += 1312;
            }
        } else {
            if(imageIndex !== numberOfImg){
                imageIndex ++;
                translateX -= 1312;
            }

        }
        sliderImg.style.transform = `translateX(${translateX}px)`;

    });

});