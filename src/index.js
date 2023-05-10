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
const form = document.querySelector('#new-ramen')
function showRamen(ramen){
    ramenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let newName = form.querySelector('#new-name').value;
    let newRestaurant = form.querySelector('#new-restaurant').value;
    let newImage = form.querySelector('#new-image').value;
    let newRating = form.querySelector('#new-rating').value;
    let newComment = form.querySelector('#new-comment').value;
    const image = document.createElement('img');
    image.src = newImage;
    menu.appendChild(image);
    ramenImage.src = newImage;
    ramenName.textContent = newName;
    restaurant.textContent = newRestaurant
    rating.textContent = newRating;
    comment.textContent = newComment;
    fetch('http://localhost:3000/ramens',{
        method:'POST',
        headers:{
            'content-type':'application/json',
            'accept':'application/json'
        },
        body: JSON.stringify({
            "name": newName,
            "restaurant": newRestaurant,
            "image": newImage,
            "rating": newRating,
            "comment": newComment
        })
    })
    form.reset();
})
//creates and formats a delete button
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.style = 'color: white;background-color: black;position: relative;left: -70px;bottom: 24px;'
document.querySelector('#ramen-detail').append(deleteButton)
deleteButton.addEventListener('click', ()=>deleteItem())
function deleteItem(){
    fetch('http://localhost:3000/ramens')
    .then(r=>r.json())
    .then(data=>data.forEach(ramen=>{
        if (ramen.name === ramenName.textContent) {
            fetch(`http://localhost:3000/ramens/${ramen.id}`,{
                method: 'DELETE',
                headers:{
                    'content-type':'application/json',
                    'accepts': 'application/json'
                }
            })
            .then(location.reload())
        }
    }))
}
initialize();