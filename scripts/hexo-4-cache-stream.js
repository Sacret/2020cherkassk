'use strict';

// Hexo 4's CacheStream clears its buffer when modern Node automatically
// destroys a completed stream. Restore the standard stream implementation so
// `hexo generate` can write the buffered route contents instead of empty files.
const { Transform } = require('stream');
const { CacheStream } = require('hexo-util');

CacheStream.prototype.destroy = Transform.prototype.destroy;
