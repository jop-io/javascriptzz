function slugify(text) {
	return text.toLowerCase().replace(/[àáäåèéëöøüñßæ]/gi, x => {
    let trans = {
      'à':'a',
      'á':'a',
      'ä':'a',
      'å':'a',
      'è':'e',
      'é':'e',
      'ë':'e',
      'ö':'o',
      'ø':'o',
      'ü':'u',
      'ñ':'n',
      'ß':'ss',
      'æ':'ae'
    };
    return trans[x];
  })
  .replace(/[^a-z0-9_\- ]/g, ' ')
  .replace(/\s{1,}/g, '-')
  .replace(/\-{1,}/g, '-')
}
