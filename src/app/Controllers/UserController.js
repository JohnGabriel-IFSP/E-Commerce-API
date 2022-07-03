const connection = require('../../config/ConnectionSql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const responseModel = {
    sucess: false,
    data:[],
    error: []
}

module.exports = {
    async CadastarCliente(req,res){
        const response = {...responseModel}

        const {username, password: Npassword, userfirstname, usersecondname, email, } = req.body;

        if(!username || !Npassword) return res.json({status: "error", error: 'Por favor coloque um email e senha'})
        else{
            connection.query(`SELECT INTO username FROM users WHERE username = ${username}`, async (err, result) => {
                if(err) throw err;
                if(result) return res.json({ status: 'error', error: 'usuário ja registrado'})
                else{
                    const password = await bcrypt.hash(Npassword, 8);
                    const [, affectRows] = await connection.query(`
                        INSERT INTO users VALUES (DEFAULT, '${username}', '${password}', '${userfirstname}', '${usersecondname}', '${email}', NOW(), NOW())`,
                        async (error, results) =>{
                            if(error) throw error;
                            return res.json({status: 'success', success: 'Cadastro realizado com sucesso'})
                        }
                    );
                    response.sucess = affectRows > 0 ? true : false;
                }
            })
        }
        
        return res.json(response);
        
    },

    async LoginClient(req, res){
        const response = {...responseModel}

        const { username, password } = req.body; 
        if(!username || !password) return res.json({status: "error", error: 'Por favor coloque um email e senha'})
        else{
            const [,data] = await connection.query(`
            SELECT * FROM users WHERE username = '${username}' AND password= '${password}'`,
            async (Err, Result) => {
                if(Err) throw Err;
                if(!Result || !await bcrypt.compare(password, Result.password)) return res.json({status: "error", error: 'Email ou senha incorretos'})
                else{
                    const token = jwt.sign({id: Result.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES, httpOnly: true })
                    const cookieOptions = {
                        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    }
                    res.cookie('usuarioCadastrado', token, cookieOptions);
                    return res.json({status: 'success', success: "Usuário Logado"})
                }
            })
            response.sucess = data ? true : false;
        }
        console.log(data)

        return res.json(response)
    }
}