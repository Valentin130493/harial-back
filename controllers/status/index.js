
const getAllStatus = async (req, res) =>{
    try{
        const status = ["Request Received", "Quote Generated", "Quote Accept", "Project in progress", "Project delivered", "Project Accept"]

        res.status(200).send(status)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Can't take status`
        })
    }
}

module.exports = {
    getAllStatus
}