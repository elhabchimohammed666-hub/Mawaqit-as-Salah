export function notFound(_req, res) {
  res.status(404).json({ ok: false, message: 'Route introuvable' });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || err.response?.status || 500;
  const message =
    err.response?.data?.data ||
    err.response?.data?.status ||
    err.message ||
    'Erreur serveur';

  res.status(status).json({
    ok: false,
    message: typeof message === 'string' ? message : 'Erreur serveur',
  });
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
