'use strict';

// Turn linked #thumbnail images into captioned tiles: the link gets the image's
// alt text as data-caption (shown on hover via CSS) and the duplicate title is dropped.
hexo.extend.filter.register('after_post_render', data => {
  data.content = data.content.replace(
    /<a ([^>]*)>(<img [^>]*#thumbnail[^>]*>)<\/a>/g,
    (match, attrs, img) => {
      const alt = (img.match(/\salt="([^"]*)"/) || [])[1];
      if (!alt) return match;
      img = img.replace(/\stitle="[^"]*"/, '');
      return `<a class="thumb" data-caption="${alt}" ${attrs}>${img}</a>`;
    }
  );
  return data;
});
