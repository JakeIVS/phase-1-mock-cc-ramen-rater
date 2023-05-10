// Declare needed global variables
const menu = document.querySelector('#ramen-menu')
const ramenImage = document.querySelector('.detail-image');
const ramenName = document.querySelector('.name');
const restaurant = document.querySelector('.restaurant')
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')
const form = document.querySelector('#new-ramen')
// Creates a Delete Button
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.style = 'color: white;background-color: black;position: relative;left: -70px;bottom: 24px;'
deleteButton.addEventListener('mouseenter',()=>{
    deleteButton.style.backgroundColor = 'dimgrey'
})
deleteButton.addEventListener('mouseleave',()=>{
    deleteButton.style.backgroundColor = 'black'
})
document.querySelector('#ramen-detail').append(deleteButton)
document.querySelector('#ramen-detail').style.marginLeft = '70px'
// Creates an "Edit Comment" form
const editCommentForm = document.createElement('form');
editCommentForm.id = 'comment-editor'
const commentFormHeader = document.createElement('h4')
commentFormHeader.textContent = 'Edit Comment'
const commentBox = document.createElement('input');
commentBox.type = 'text';
commentBox.name = 'edited-comment';
commentBox.id = 'edited-comment';
commentBox.placeholder = 'New Comment Here'
const commentSubmit = document.createElement('input');
commentSubmit.type = 'submit'
commentSubmit.value = 'Submit'
editCommentForm.append(commentFormHeader);
editCommentForm.append(commentBox);
editCommentForm.append(commentSubmit);
form.before(editCommentForm);
// write your code here
function initialize(){
    fetch ('http://localhost:3000/ramens')
    .then(r=>r.json())
    .then((data)=>{
        data.forEach(ramen=>{
            makeMenuItem(ramen)
        })
        showRamen(data[0])
    })
}
function makeMenuItem(item){
    const image = document.createElement('img');
    image.src= item.image
    menu.appendChild(image);
    image.addEventListener('click', ()=>showRamen(item))
}
function showRamen(ramen){
    ramenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    newRamen = {
        name: form.querySelector('#new-name').value,
        restaurant: form.querySelector('#new-restaurant').value,
        image: form.querySelector('#new-image').value,
        rating: form.querySelector('#new-rating').value,
        comment: form.querySelector('#new-comment').value
    }
    makeMenuItem(newRamen)
    fetch('http://localhost:3000/ramens',{
        method:'POST',
        headers:{
            'content-type':'application/json',
            'accept':'application/json'
        },
        body: JSON.stringify({
            "name": newRamen.name,
            "restaurant": newRamen.restaurant,
            "image": newRamen.image,
            "rating": newRamen.rating,
            "comment": newRamen.comment
        })
    })
    showRamen(newRamen);
    form.reset();
})
//creates and formats a delete button
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
editCommentForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let editedComment = commentBox.value
    comment.textContent = editedComment;
    fetch('http://localhost:3000/ramens')
    .then(r=>r.json())
    .then(data=>data.forEach(ramen=>{
        if (ramen.name === ramenName.textContent) {
            fetch(`http://localhost:3000/ramens/${ramen.id}`,{
                method: 'PATCH',
                headers:{
                    'content-type':'application/json',
                    'accepts': 'application/json'
                },
                body: JSON.stringify({"comment": editedComment})
            })
        }
    }))
  editCommentForm.reset();
})
initialize();