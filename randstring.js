function randStr(len) {
  let pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefeghijklmnopqrstuvwxyz0123456789";
  let i, str = "";
  for (i = 0; i < len; i++) {
  	str += pool.charAt(Math.ceil(pool.length * Math.random()));
  }
  return str.split('').sort(() => {return 0.5-Math.random()}).join('');
}
