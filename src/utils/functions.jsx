export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.statusText}`);
};

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};


export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  updatedCookie += ';samesite=lax';
  document.cookie = updatedCookie;
};

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
};

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

// функция для создания адекватной даты в ленте заказов
function dropHMS(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);
};

export function showMessageDateTime(dateTime) {
  let today = new Date(),
    yesterday = new Date(),
    twoDaysAgo = new Date(),
    roomLastMessageDate = new Date(dateTime);

  yesterday.setDate(today.getDate() - 1);
  twoDaysAgo.setDate(today.getDate() - 2);

  dropHMS(today);
  dropHMS(yesterday);
  dropHMS(twoDaysAgo);
  dropHMS(roomLastMessageDate);

  const dateMins = ('0'+ dateTime.getMinutes()).slice(-2);
  const timeZone = dateTime.getTimezoneOffset()/60 < 0 ? `i-GMT+${-dateTime.getTimezoneOffset()/60}` : `i-GMT-${-dateTime.getTimezoneOffset()/60}`;
  const monthName = months[dateTime.getMonth()];

  if (dateTime) {
    if (today.getTime() === roomLastMessageDate.getTime()) {
      return `Сегодня, ${dateTime.getHours()}:${dateMins} ${timeZone}`
    } else if (yesterday.getTime() === roomLastMessageDate.getTime()) {
      return `Вчера, ${dateTime.getHours()}:${dateMins} ${timeZone}`
    } else if (twoDaysAgo.getTime() === roomLastMessageDate.getTime()) {
      return `2 дня назад, ${dateTime.getHours()}:${dateMins} ${timeZone}`
  } else {
      return `${dateTime.getDate()} ${monthName} ${dateTime.getFullYear()}, ${dateTime.getHours()}:${dateMins} ${timeZone}`;
    }
  };
};