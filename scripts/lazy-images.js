'use strict';

// Let the browser defer loading content images until they approach the viewport.
hexo.extend.filter.register('after_post_render', data => {
  data.content = data.content.replace(/<img(?![^>]*\sloading=)/g, '<img loading="lazy"');
  return data;
});
