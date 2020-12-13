const duplicateChannel = async (req, res, service) => {
    let data
    try {
        data = await service.duplicateName()
        res.status(200)
        res.json(data)
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

module.exports = { duplicateChannel }