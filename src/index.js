// write your code here
function initialize(){
    fetch ('http://localhost:3000/ramens')
    .then(r=>r.json())
    .then((data)=>{
        data.forEach(ramen=>{
            const image = document.createElement('img');
            image.src= ramen.image
            menu.appendChild(image);
            image.addEventListener('click', ()=>showRamen(ramen))
        })
        showRamen(data[0])
    })
}
const menu = document.querySelector('#ramen-menu')
const ramenImage = document.querySelector('.detail-image');
const ramenName = document.querySelector('.name');
const restaurant = document.querySelector('.restaurant')
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')
function showRamen(ramen){
    debugger
    ramenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
}
initialize();