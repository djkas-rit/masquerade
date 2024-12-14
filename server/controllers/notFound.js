const notFound = (req, res) => res.status(404).render('notFound', { url: req.originalUrl });

module.exports = notFound;