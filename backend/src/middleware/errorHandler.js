export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, error: "مسیر مورد نظر پیدا نشد." });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(
    `[error] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`,
    "\n ", err.stack || err.message || err
  );
  res.status(500).json({ success: false, error: "خطای داخلی سرور." });
}
