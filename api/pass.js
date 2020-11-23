module.exports = (req, res) => {
    res.json({
        pass : process.env.pass
    })
}