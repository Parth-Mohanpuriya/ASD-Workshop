const cache = {};
const TTL = 60 * 1000;

function getCacheKey(req) {
  if (req.params.id) {
    return 'products:' + req.params.id;
  }
  return 'products';
}

function invalidateCache(keys) {
  keys.forEach(function (key) {
    delete cache[key];
  });
}

function cacheMiddleware(req, res, next) {
  const key = getCacheKey(req);
  const entry = cache[key];

  if (entry) {
    const age = Date.now() - entry.createdAt;
    if (age < TTL) {
      res.set('X-Cache', 'HIT');
      return res.json(entry.data);
    } else {
      delete cache[key];
    }
  }

  res.set('X-Cache', 'MISS');

  const originalJson = res.json.bind(res);
  res.json = function (data) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache[key] = {
        data: data,
        createdAt: Date.now()
      };
    }
    return originalJson(data);
  };

  next();
}

module.exports = {
  cacheMiddleware,
  invalidateCache
};
