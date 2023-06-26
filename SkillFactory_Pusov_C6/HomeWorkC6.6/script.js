const wsUri = " wss://echo-ws-service.herokuapp.com";

const buttonMessage = document.querySelector(".btn__message"),
    buttonGeolocation = document.querySelector(".btn__geolocation"),
    formInput = document.querySelector(".form__input"),
    chatMessage = document.querySelector(".chat__message");

function printToChat(message, position = 'flex-end') {
    let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
            </p>
        `;
    chatMessage.innerHTML += element;
    // wrapperChat.scrollTop = wrapperChat.scrollHeight;
}
//Объект соединения
let websocket = new WebSocket(wsUri);
websocket.onopen = function (evt) {
    console.log("CONNECTED");
};
websocket.onmessage = function (evt) {
    printToChat(`ответ сервера: ${evt.data}`, 'flex-start');
};
websocket.onerror = function (evt) {
    printToChat(`server: ${evt.data}`, 'flex-start');
};

//отправка сообщения
buttonMessage.addEventListener('click', () => {
    let message = formInput.value;
    websocket.send(message);
    printToChat(`Вы: ${message}`);
    formInput.value = ''

});


//гео-локация.
// Функция,  об ошибке
const error = () => {
    let textErr0r = 'Невозможно получить ваше местоположение';
    printToChat(textErr0r);
};

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    printToChat(`<a  href='${geoLink}' target='_blank'>Ваша геолокация</a>`);
};

buttonGeolocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

//удаляем сообщения
serverMessages.addEventListener('click', () => {
    formInput.innerHTML = " ";
});