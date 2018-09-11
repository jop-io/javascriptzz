function CNUM(num) {
	var n = num.replace(/\D/g, "").substr(-9);
  return /^7[02369][0-9]{7}$/.test(n) ? "0"+n : false;
}
