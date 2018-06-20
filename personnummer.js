function personnummer(number) {
    if(!/^([0-9]{4}((0[13578]|1[02])(0[1-9]|[1-2][0-9]|3[0-1])|(0[469]|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}([02468][48]|[13579][26]|[2468]0)|([02468][048]|[13579][26])00)0229)(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})[0-9]$/.test(number)) {
        return false;
    }

    var number = number.substr(-10), length = 10, bit = 1, sum = 0, digit, weights = [0,2,4,6,8,1,3,5,7,9];
    while (length)
    {
        digit = parseInt(number.charAt(--length), 10);
        sum += (bit ^= 1) ? weights[digit] : digit;
    }
    return sum && sum % 10 === 0;
}
