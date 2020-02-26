
import './index.css';
let geo = navigator.geolocation.watchPosition(position => (geo = position));
const refs = {
  form: document.querySelector('.form-panel'),
  userName: document.querySelector('#crName'),
  profileName: document.querySelector('#crPrName'),
  age: document.querySelector('#SpAge'),
  telephone: document.querySelector('#telephone'),
  password: document.querySelector('#password'),
  button: document.querySelector('#buttonCreate'),
  radio: document.querySelector('[type="radio"]'),
};
const collectData = function(e) {
  e.preventDefault();
  const age = refs.age.value;
  const telephone = refs.telephone.value;
  const password = refs.password.value;
  const userName = refs.userName.value;
  const profileName = refs.profileName.value;
  const radio = refs.radio.value;
  const dataFromForm = {
    age,
    phone_number: telephone,
    password: password,
    geo_location: geo,
    login: userName,
    profile_name: profileName,
    gender: radio,
  };
  console.log(dataFromForm);
  postData('https://venify.herokuapp.com/user/register', dataFromForm) // запрос на сервер
    .then(response => console.log(response)) // JSON-строка полученная после вызова response.json()
    .catch(error => console.error(error));

  return dataFromForm;
};
refs.form.addEventListener('submit', collectData);

function postData(url, data = {}) {
  // Значения по умолчанию обозначены знаком *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
  }).then(response => response.json()); // парсит JSON ответ в Javascript объект
}
