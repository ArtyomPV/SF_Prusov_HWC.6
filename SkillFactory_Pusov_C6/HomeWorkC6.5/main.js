const btn = document.querySelector('.js-btn');

const message = () => {
	alert(`width: ${window.screen.width}\nheight: ${ window.screen.height}`)
}

btn.addEventListener('click', message);