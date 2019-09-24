function nationalIdNumber(input)
{
  // First quick check (right number of chars)
  if (!/^([0-9]{6}|[0-9]{8})[\-\+]{0,1}[0-9]{4}$/.test(input))
  {
    return false;
  }
  
  // Make input numeric (remove all but integers)
  let num = input.replace(/\D/g, "");
  
  // Add century to birth year, if needed
  if (num.length === 10)
  {    
    let d  = new Date();
        nY = d.getFullYear();
        nM = d.getMonth() + 1;
        nD = d.getDate();
    
    let c  = parseInt(nY.toString().substr(0, 2), 10),
        y  = parseInt(nY.toString().substr(2, 2), 10),
        iY = parseInt(num.substr(0, 2), 10),
        iM = parseInt(num.substr(2, 2), 10),
        iD = parseInt(num.substr(4, 2), 10),
        p  = c - (((iY === y && iM >= nM) && iD > nD) || iY > y ? 1 : 0) - (input.substr(-5, 1) === '+' ? 1 : 0);
        
        num = (p < 10 ? '0' : '') + p + num;
  }
  
  // Secodary quick check (validated birth date)
  if(!/^([0-9]{4}((0[13578]|1[02])([06][1-9]|[1278][0-9]|[39][0-1])|(0[469]|11)([06][1-9]|[1278][0-9]|[39]0)|02([06][1-9]|[17][0-9]|[28][0-8]))|([0-9]{2}([02468][48]|[13579][26]|[2468]0)|([02468][048]|[13579][26])00)02[28]9)([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]|[0-9][1-9][0-9]{2}|[1-9][0-9]{3})$/.test(num))
  {
    return false;
  }

  // Calculate checksum
  let number = num.substr(-10), 
    weights = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
    length = 10, 
    bit = 1, 
    sum = 0, 
    digit;

  while (length)
  {
    digit = parseInt(number.charAt(--length), 10);
    sum += (bit ^= 1) ? weights[digit] : digit;
  }
  
  return sum && sum % 10 === 0 ? num : false;
}
