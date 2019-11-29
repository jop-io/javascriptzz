function levenshtein(s, t) {
  if (s === t) {
    return 0;
  }
  var n = s.length, m = t.length;
  if (n === 0 || m === 0) {
    return n + m;
  }
  var x = 0, y, a, b, c, d, e, g, h, e1, e2, e3, e4;
  var p = new Uint16Array(n), u = new Uint32Array(n);
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
}
