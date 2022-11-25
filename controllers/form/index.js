const formData = async (req, res) => {
    try {
        res.status(200).json(req.body)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Сталася дурня'
        })
    }
}

module.exports = {
    formData
}