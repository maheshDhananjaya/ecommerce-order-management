module.exports = (err, req, res, next) => {
  console.error(err.stack || err);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
};
