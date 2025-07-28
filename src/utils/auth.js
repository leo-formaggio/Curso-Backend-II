export function requireRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next()
    }
    res.status(403).json({ status: 'error', message: 'Acesso negado' })
  }
}