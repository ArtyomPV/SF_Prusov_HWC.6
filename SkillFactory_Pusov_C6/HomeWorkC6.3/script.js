
const button = document.querySelector('.btn');
const icon = document.querySelectorAll('.icon')

// button.addEventListener('click', doSmth);
button.addEventListener('click', () =>{
  console.log("Pressed")
icon[0].classList.toggle('active');
icon[1].classList.toggle('active');
}); 
