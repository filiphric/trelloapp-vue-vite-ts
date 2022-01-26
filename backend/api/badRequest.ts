export const badRequest = function(res, param) {
  return res.status(400).jsonp({
    error: `Bad request. You need to provide '${param}' in request body.`
  });
};