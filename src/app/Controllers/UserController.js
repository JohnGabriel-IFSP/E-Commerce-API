const connection = require("../../config/Connection");

const responseModel = {
    success: false,
    data:[],
    error: []
}

module.exports = {
    async CadastrarCliente(req, res){
        const response = {...responseModel}

        const {username, password } = req.body;

        const [, affecRows] = await connection.query(`
            INSERT INTO clientes VALUES {DEFAULT, '${username}', '${password}', NOW(), NOW()}
        `)

        response.success = affecRows > 0

        return res.json(response)
    },

    async LoginCliente(req, res){
        const response = {...responseModel}

        const {username, password } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM clientes WHERE username='${username}' AND password='${password}'
        `)

        console.log(data)

        return res.json(response)
    }
}