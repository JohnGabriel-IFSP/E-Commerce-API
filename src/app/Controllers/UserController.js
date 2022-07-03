const connection = require('../../config/ConnectionSql');

const responseModel = {
    sucess: false,
    data:[],
    error: []
}

module.exports = {
    async CadastarCliente(req,res){
        const response = {...responseModel}

        const {username, password, userfirstname, usersecondname, email, } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO users VALUES (DEFAULT, '${username}', '${password}', '${userfirstname}', '${usersecondname}', '${email}', NOW(), NOW())`
        );

        response.sucess = affectRows > 0 ? true : false;

        return res.json(response);
        
    },

    async LoginClient(req, res){
        const response = {...responseModel}

        const { username, password } = req.body;

        const [,data] = await connection.query(`
            SELECT * FROM users WHERE username = '${username}' AND password= '${password}'
        `)

        response.sucess = data ? true : false;

        console.log(data)

        return res.json(response)
    }
}