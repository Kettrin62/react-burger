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
  updatedCookie += ';max-age=31556926';
  document.cookie = updatedCookie;
};

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
};

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
  dropHMS(roomLastMessageDate );

  if (dateTime) {
    if (today.getTime() === roomLastMessageDate.getTime()) {
      return 'Сегодня'
    } else if (yesterday.getTime() === roomLastMessageDate.getTime()) {
      return 'Вчера'
    } else if (twoDaysAgo.getTime() === roomLastMessageDate.getTime()) {
      return '2 дня назад'
  } else {
      return roomLastMessageDate;
    }
  };
};