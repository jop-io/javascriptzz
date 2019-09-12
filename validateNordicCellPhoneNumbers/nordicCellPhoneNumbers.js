function nordicCellPhoneNumber(number, format) {
  let n = number.replace(/[^0-9\+]/g, '');
  let f = {
    NatNum: null, // 0701223344
    NatFor: null, // 070-122 33 44
    IntFor: null, // +46 70 122 33 44
    IntNum: null, // 0046701223344
    E164:   null  // +46701223344
  };
  
  // Mobiltelefonnummer SVERIGE
  if (/^(0|(00|\+)46[0]?)7[02369][0-9]{7}$/.test(n)) {
    f.NatNum = n.replace(/^(0|(00|\+)46[0]?)([0-9]{9})$/, function(x,a,b,c){ return "0" + c; });
    f.NatFor = n.replace(/^(0|(00|\+)46[0]?)([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})$/, function(x,a,b,c,d,e,f){ return "0"+c+"-"+d+" "+e+" "+f; });
    f.IntFor = n.replace(/^(0|(00|\+)46[0]?)([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})$/, function(x,a,b,c,d,e,f){ return "+46 "+c+" "+d+" "+e+" "+f; });
    f.IntNum = n.replace(/^(0|(00|\+)46[0]?)([0-9]{9})$/, function(x,a,b,c){ return "0046"+c; });
    f.E164   = n.replace(/^(0|(00|\+)46[0]?)([0-9]{9})$/, function(x,a,b,c){ return "+46"+c; });
    return f[format] ? f[format] : f.E164;
  }
  
  // Mobiltelefonnummer FINLAND + ÅLAND
  if (/^(0|(00|\+)358[0]?)(457[0-9]{7}|4[0-9]{8}|50[0-9]{7})$/.test(n)) {
    f.NatNum = n.replace(/^(0|(00|\+)358[0]?)([0-9]{9,10})$/, function(x,a,b,c){ return "0"+c; });
    f.NatFor = n.replace(/^(0|(00|\+)358[0]?)([0-9]{2})([0-9]{7,8})$/, function(x,a,b,c,d){ return "0"+c+" "+d; });
    f.IntFor = n.replace(/^(0|(00|\+)358[0]?)([0-9]{2})([0-9]{7,8})$/, function(x,a,b,c,d){ return "+358 "+c+" "+d; });
    f.IntNum = n.replace(/^(0|(00|\+)358[0]?)([0-9]{9,10})$/, function(x,a,b,c){ return "00358"+c; });
    f.E164   = n.replace(/^(0|(00|\+)358[0]?)([0-9]{9,10})$/, function(x,a,b,c){ return "+358"+c; });
    return f[format] ? f[format] : f.E164;
  }
  
  // Mobiltelefonnummer NORGE + SVALBARD
  if (/^(\+47|0047)?(4[0-9]{7}|9[0-9][0-8][0-9]{5})$/.test(n)) {
    f.NatNum = n.replace(/(\+47|0047)?([0-9]{8})/, function(x,a,b){ return b; });
    f.NatFor = n.replace(/(\+47|0047)?([0-9]{3})([0-9]{2})([0-9]{3})/, function(x,a,b,c,d){ return b+" "+c+" "+d; });
    f.IntFor = n.replace(/(\+47|0047)?([0-9]{3})([0-9]{2})([0-9]{3})/, function(x,a,b,c,d){ return "+47 "+b+" "+c+" "+d; });
    f.IntNum = n.replace(/(\+47|0047)?([0-9]{8})/, function(x,a,b){ return "0047"+b; });
    f.E164   = n.replace(/(\+47|0047)?([0-9]{8})/, function(x,a,b){ return "+47"+b; });
    return f[format] ? f[format] : f.E164;
  }
  
  // Mobiltelefonnummer DANMARK
  if (/^(\+45|0045)?(2[0-9]{7}|((3[01]|4[012]|5[0123]|6[01]|71|81|9[123])[0-9]{6}))$/.test(n)) {
    f.NatNum = n.replace(/(\+45|0045)?([0-9]{8})/, function(x,a,b){ return b; });
    f.NatFor = n.replace(/(\+45|0045)?([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/, function(x,a,b,c,d,e){ return b+" "+c+" "+d+" "+e; });
    f.IntFor = n.replace(/(\+45|0045)?([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/, function(x,a,b,c,d,e){ return "+45 "+b+" "+c+" "+d+" "+e; });
    f.IntNum = n.replace(/(\+45|0045)?([0-9]{8})/, function(x,a,b){ return "0045"+b; });
    f.E164   = n.replace(/(\+45|0045)?([0-9]{8})/, function(x,a,b){ return "+45"+b; });
    return f[format] ? f[format] : f.E164;
  }
  
  return false;
}