const baseUrl = async ( _, res, service) => {
    try {
        let data = await service.base()
        res.status(200)
        res.json(data)
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

module.exports = {baseUrl}