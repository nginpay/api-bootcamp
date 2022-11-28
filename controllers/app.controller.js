exports.hello = (req, res) => {
    res.status(200).json({msg: 'Hello world'})
}