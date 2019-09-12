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
    {"host": "gmail",      "tlds": ["com"]},
    {"host": "hotmail",    "tlds": ["com","se","dk","fr"]},
    {"host": "live",       "tlds": ["se","com","fr","dk"]},
    {"host": "outlook",    "tlds": ["com"]},
    {"host": "telia",      "tlds": ["com"]},
    {"host": "icloud",     "tlds": ["com"]},
    {"host": "yahoo",      "tlds": ["se","com","fr","dk"]},
    {"host": "me",         "tlds": ["com"]},
    {"host": "msn",        "tlds": ["com"]},
    {"host": "comhem",     "tlds": ["se"]},
    {"host": "bredband",   "tlds": ["net"]},
    {"host": "tele2",      "tlds": ["se"]},
    {"host": "spray",      "tlds": ["se"]},
    {"host": "kth",        "tlds": ["se"]},
    {"host": "bahnhof",    "tlds": ["se"]},
    {"host": "home",       "tlds": ["se"]},
    {"host": "mail",       "tlds": ["com","ru"]},
    {"host": "ymail",      "tlds": ["com"]},
    {"host": "swipnet",    "tlds": ["se"]},
    {"host": "bredband2",  "tlds": ["com"]},
    {"host": "ownit",      "tlds": ["nu"]},
    {"host": "rocketmail", "tlds": ["com"]},
    {"host": "protonmail", "tlds": ["com"]},
    {"host": "vgregion",   "tlds": ["se"]},
    {"host": "gmx",        "tlds": ["de","net","com"]},
    {"host": "volvocars",  "tlds": ["com"]},
    {"host": "volvo",      "tlds": ["com"]},
  ];
  
  let ld = function(s, t)
  {
    if (s === t) { return 0; }
    let n = s.length, m = t.length;
    if (n === 0 || m === 0) { return n + m; }
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
  
  // Primary lookup
  for (let i in commons)
  {
    let cs = commons[i];
    
    if (host === cs.host && cs.tlds.indexOf(tld) >= 0)
	{
      return true;
    }
	if (host === cs.host && cs.tlds.indexOf(tld) < 0)
	{
      return {
        suggestion: user + "@" + cs.host + "." + cs.tlds[0],
        user: user,
        host: cs.host,
        tld: cs.tlds[0],
        domain: cs.host + "." + cs.tlds[0],
        diff: 'tld'
      };
    }
  }
  
  // Secondary lookup
  let score = 999,
      bestMatch = null;
  
  for (let i in commons)
  {
    let cs = commons[i],
    ed = ld(host, cs.host);
    if (ed < 3 && ed < score) {
      bestMatch = cs;
      score = ed;
    }
  }
  
  if (bestMatch)
  {
    let suggestTLD = bestMatch.tlds.indexOf(tld) >= 0 ? tld : bestMatch.tlds[0];
    return {
      suggestion: user + "@" + bestMatch.host + "." + suggestTLD,
      user: user,
      host: bestMatch.host,
      tld: suggestTLD,
      domain: bestMatch.host + "." + suggestTLD,
      diff: suggestTLD === tld ? 'host' : 'domain'
    };
  }
  
  return true;
}