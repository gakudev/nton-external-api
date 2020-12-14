const doubleQuery = async (req, res, service) => {
    const country = req.query.country
    const name = req.query.name
    let data
    try {
        data = await service.countryName(country, name)
        res.status(200)
        res.json(data)
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

module.exports = { doubleQuery }