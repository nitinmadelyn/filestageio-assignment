module.exports.requestLogger = function (req, res, next) {
  res.once("finish", () => {
    const log = [req.method, req.path];
    if (req.body && Object.keys(req.body).length > 0) {
      log.push(JSON.stringify(req.body));
    }
    log.push("->", res.statusCode);
    console.log(log.join(" "));
  });
  next();
};

/* function to calculate position of todo */
module.exports.calculatePosition = function (posA, posB) {
  return parseFloat((posB - posA) / 2 + posA);
};
