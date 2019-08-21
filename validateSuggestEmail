function validateSuggestEmail(email)
{
	let match = email
  		.toString()
      .toLowerCase()
      .match(/^([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)@([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)\.([a-zA-Z0-9]{2,})$/);
	
	if (!match) {
		return false;
	}
  
	let user = match[1],
			host = match[3],
			tld  = match[5];
  
	let commons = [
		{ "host": "gmail",     "tlds": ["com"]       },
		{ "host": "yahoo",     "tlds": ["com", "se"] },
		{ "host": "hotmail",   "tlds": ["com", "se"] },
		{ "host": "telia",     "tlds": ["com"]       },
		{ "host": "icloud",    "tlds": ["com"]       },
		{ "host": "live",      "tlds": ["com", "se"] },
		{ "host": "outlook",   "tlds": ["com"]       },
		{ "host": "tele2",     "tlds": ["com"]       },
		{ "host": "bahnhof",   "tlds": ["se"]        },
		{ "host": "bredband",  "tlds": ["net"]       },
		{ "host": "bredband2", "tlds": ["com"]       },
		{ "host": "comhem",    "tlds": ["se"]        },
		{ "host": "home",      "tlds": ["se"]        },
		{ "host": "me",        "tlds": ["com"]       },
		{ "host": "msn",       "tlds": ["com"]       },
		{ "host": "spray",     "tlds": ["se"]        },
	];
  
  let ld = function(s, t) {
    if (s === t) {
      return 0;
    }
    let n = s.length, m = t.length;
    if (n === 0 || m === 0) {
      return n + m;
    }
    let x = 0, y, a, b, c, d, e, g, h, e1, e2, e3, e4;
    let p = new Uint16Array(n), u = new Uint32Array(n);
    for (y = 0; y < n;) {
      u[y] = s.charCodeAt(y);
      p[y] = ++y;
    }
    for (; (x + 3) < m; x += 4) {
      e1 = t.charCodeAt(x);
      e2 = t.charCodeAt(x + 1);
      e3 = t.charCodeAt(x + 2);
      e4 = t.charCodeAt(x + 3);
      c = x;
      b = x + 1;
      d = x + 2;
      g = x + 3;
      h = x + 4;
      for (y = 0; y < n; y++) {
        a = p[y];
        c = (a < c || b < c ? (a > b ? b + 1 : a + 1) : (e1 !== u[y] ? c + 1 : c));
        b = (c < b || d < b ? (c > d ? d + 1 : c + 1) : (e2 !== u[y] ? b + 1 : b));
        d = (b < d || g < d ? (b > g ? g + 1 : b + 1) : (e3 !== u[y] ? d + 1 : d));
        g = (d < g || h < g ? (d > h ? h + 1 : d + 1) : (e4 !== u[y] ? g + 1 : g));
        p[y] = h = g;
        g = d;
        d = b;
        b = c;
        c = a;
      }
    }
    for (; x < m;) {
      e = t.charCodeAt(x);
      c = x;
      d = ++x;
      for (y = 0; y < n; y++) {
        a = p[y];
        d = (a < c || d < c ? (a > d ? d + 1 : a + 1) : (e !== u[y] ? c + 1 : c));
        p[y] = d;
        c = a;
      }
      h = d;
    }
    return h;
  };
	
	for (let i in commons)
  {
  	let c = commons[i];
    
    // hostname is correct, TLD is correct
    if (host === c.host && c.tlds.indexOf(tld) >= 0) {
    	return true;
    }
    
    // hostname is correct, but TLD is wrong
  	if (host === c.host && c.tlds.indexOf(tld) < 0) {
    	return user + "@" + host + "." + c.tlds[0];
    }
    
    // levenstien comparsion on hostname
    if (ld(host, c.host) < 3) {
    	return user + "@" + c.host + "." + (c.tlds.indexOf(tld) >= 0 ? tld : c.tlds[0]);
    }
  }
	
	return true;
}
