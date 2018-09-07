class SPIN {
    
    constructor(input)
    {
        if (input)
        {
            this.set(input);
        }
    }
    
    set(input)
    {
        if (!/^([0-9]{6}|[0-9]{8})[\-\+]{0,1}[0-9]{4}$/.test(input))
        {
            console.error("Identity number must contain 10 or 12 digits, allowed characters are 0-9, '+' and '-'.");
            return;
        }
        
        this.input = input;
        this.parseNumeric();
        
        if (!this.valid())
        {
            console.warn(this.input + " is not a valid identity number");
        }
        return;
    }
    
    parseNumeric()
    {
        this.num = this.input.replace(/\D/g, "");
        if (this.num.length === 10)
        {
            this.addCentury();
        }
    }
    
    addCentury()
    {
        let t  = new Date(),
            c  = parseInt(t.getFullYear().toString().substr(0, 2), 10),
            y  = parseInt(t.getFullYear().toString().substr(2, 2), 10),
            m  = t.getMonth() + 1,
            d  = t.getDate(),
            pY = parseInt(this.num.substr(0, 2), 10),
            pM = parseInt(this.num.substr(2, 2), 10),
            pD = parseInt(this.num.substr(4, 2), 10),
            prefix = c - (((pY === y && pM >= m) && pD > d) || pY > y ? 1 : 0);
        
        prefix -= this.input.substr(-5, 1) === '+' ? 1 : 0;
        this.num = (prefix < 10 ? '0' : '') + prefix + this.num;
    }
    
    numeric()
    {
        return this.valid() ? this.num : null;
    }
    
    gender()
    {
        return this.valid() ? (
            this.num.substr(-2, 1) % 2 === 0 ? 'FEMALE' : 'MALE'
        ) : null;
    }
    
    age()
    {
        let now = new Date(),
            y = parseInt(this.num.substr(0, 4), 10),
            m = parseInt(this.num.substr(4, 2), 10),
            d = parseInt(this.num.substr(6, 2), 10),
            a;
            d -= d >= 61 ? 60 : 0;

        if (now.getFullYear() === y) {
            a = 0;
        } else if (y > now.getFullYear()) {
            a = y-now.getFullYear();
        } else if (now.getFullYear() >= y && m >= now.getMonth()+1 && d > now.getDate()) {
            a = now.getFullYear()-y-1;
        } else {
            a = now.getFullYear()-y;
        }
        
        return this.valid() ? a : null;
    }
    
    type()
    {
        return this.valid() && parseInt(this.num.substr(6, 2), 10) >= 61 ? 'SAMORD' : 'PERNUM';
    }
    
    valid()
    {
        if(!/^([0-9]{4}((0[13578]|1[02])([06][1-9]|[1278][0-9]|[39][0-1])|(0[469]|11)([06][1-9]|[1278][0-9]|[39]0)|02([06][1-9]|[17][0-9]|[28][0-8]))|([0-9]{2}([02468][48]|[13579][26]|[2468]0)|([02468][048]|[13579][26])00)02[28]9)(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})[0-9]$/.test(this.num))
        {
            return false;
        }

        let number = this.num.substr(-10), 
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
