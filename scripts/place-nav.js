'use strict';

// Prev/next neighbours of a place page (mesta/<slug>/), in the order the places
// are linked on the mesta/ list page. Each page counts once, at its first link.
hexo.extend.helper.register('place_nav', function(page) {
  const match = (page.path || '').match(/^mesta\/([^/]+)\/index\.html$/);
  if (!match) return null;

  const pages = this.site.pages;
  const list = pages.findOne({path: 'mesta/index.html'});
  if (!list) return null;

  const slugs = [];
  const linkRe = /\]\(\.\/([^)#/]+)\/?(?:#[^)]*)?\)/g;
  let link;
  while ((link = linkRe.exec(list.raw)) !== null) {
    if (!slugs.includes(link[1])) slugs.push(link[1]);
  }

  const places = slugs
    .map(slug => pages.findOne({path: `mesta/${slug}/index.html`}))
    .filter(Boolean);
  const index = places.findIndex(place => place.path === page.path);
  if (index === -1) return null;

  const n = places.length;
  return {
    prev: places[(index - 1 + n) % n],
    next: places[(index + 1) % n]
  };
});
