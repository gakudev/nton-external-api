const doubleQuery = async (req, res, service) => {
    const category = req.query.category
    const country = req.query.country
    let data
    try {
        data = await service.countryCategory(country, category)
        res.status(200)
        res.json(data)
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

module.exports = { doubleQuery }