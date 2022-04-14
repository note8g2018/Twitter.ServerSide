

const testPrivate = async (req, res)=>{
    res.status(200).json({
        success: true,
        data: "You got access to private data baby loooooool in this route",
    });
}


module.exports = testPrivate;