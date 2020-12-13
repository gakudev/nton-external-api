const singleQuery = async (req, res, service) => {
    const category = req.query.category
    const country = req.query.country
    const name = req.query.name
    let data
    try {
        if (category) { data = await service.category(category) } 
        else if (country) { data = await service.country(country) }
        else if (name) { data = await service.name(name) }
        else { data = await service.all() }
        res.status(200)
        res.json(data)
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

module.exports = { singleQuery }