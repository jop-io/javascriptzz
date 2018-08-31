class Personnummer {
    
    constructor(pnr)
    {
        if (pnr)
        {
            this.validate(pnr);            
        }
    }
    
    validate(pnr)
    {
        // Inledande kontroll av att personnumret innehåller rätt antal tecken
        // och rätt tecken. Tillåta tecken är 0-9 samt "-" och "+".
        if (!/^([0-9]{6}|[0-9]{8})[\-\+]{0,1}[0-9]{4}$/.test(pnr))
        {
            return false;
        }
        
        this.pnr = pnr;
        this.parseNumeric();
        
        return this.controlCheck() ? this.numeric : false;
    }
    
    parseNumeric()
    {
        this.numeric = this.pnr.replace(/\D/g, "");
        
        // Personnumret består av 10 siffror samt innehåller ett plustecken.
        // Födelseåret inföll därför för mer än 100 år sedan och måste prefixas 
        // med ett korrekt århundrade (förra eller förrförra).
        if (/^[0-9]{6}\+[0-9]{4}$/.test(this.pnr))
        {
            this.addCentury(true);
        }
        // Personnumret består av 10 siffror. Födelseåret inföll för mindre än
        // 100 år sedan och behöver därför prefixas med ett korrekt århundrade 
        // (nuvarande eller förra).
        else if (this.numeric.length === 10)
        {
            this.addCentury(false);
        }
    }
    
    addCentury(plusCentury)
    {
        let t  = new Date();
        let c  = parseInt(t.getFullYear().toString().substr(0, 2), 10);
        let y  = parseInt(t.getFullYear().toString().substr(2, 2), 10);
        let m  = t.getMonth() + 1;
        let d  = t.getDate();
        let pY = parseInt(this.numeric.substr(0, 2), 10);
        let pM = parseInt(this.numeric.substr(2, 2), 10);
        let pD = parseInt(this.numeric.substr(4, 2), 10);
        let prefix = c - (((pY === y && pM >= m) && pD > d) || pY > y ? 1 : 0);
        
        prefix -= plusCentury ? 1 : 0;
        this.numeric = (prefix < 10 ? '0' : '') + prefix + this.numeric;
    }
    
    controlCheck()
    {
        // Regexpen kontrollerar att ett numeriskt 12-siffrigt personnummer 
        // innehåller giltigt år, månad, dag samt ett löpnummer (de fyra sista 
        // siffrorna). Kontrollen tar höjd för födelsedatum under skottår. 
        if(!/^([0-9]{4}((0[13578]|1[02])(0[1-9]|[1-2][0-9]|3[0-1])|(0[469]|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}([02468][48]|[13579][26]|[2468]0)|([02468][048]|[13579][26])00)0229)(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})[0-9]$/.test(this.numeric)) {
            return false;
        }

        let number = this.numeric.substr(-10), 
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
        
        return sum && sum % 10 === 0;
    }
};
