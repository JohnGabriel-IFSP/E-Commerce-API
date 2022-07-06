const connection = require("../../config/ConnectionSql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const responseModel = {
  success: false,
  data: [],
  error: [],
};

module.exports = {
  async CadastarCliente(req, res) {
    const {
      username,
      password: Npassword,
      userfirstname,
      usersecondname,
      email,
    } = req.body;
    if (!username || !Npassword)
      return res.json({
        status: "error",
        error: "Por favor coloque um usuário e senha",
      });
    else {
      const checaCadastro = await connection.query(
        `SELECT username FROM users WHERE username = '${username}'`
      );
      if (checaCadastro == username)
        return res.json({ status: "error", error: "usuário ja registrado" });
      else {
        const password = await bcrypt.hash(Npassword, 8);
        const [, affectRows] = await connection.query(`
                        INSERT INTO users VALUES (DEFAULT, '${username}', '${password}', '${userfirstname}', '${usersecondname}', '${email}', NOW(), NOW())`);
        if (affectRows > 0)
          return res.json({
            status: "success",
            success: "Cadastro realizado com sucesso",
          });
      }
    }
  },

  async LoginClient(req, res) {
    const response = { ...responseModel };

    const { username, password } = req.body;
    if (!username || !password)
      return res.json({
        status: "error",
        error: "Por favor coloque um email e senha",
      });
    else {
      const [data] = await connection.query(
        `SELECT * FROM users WHERE username = '${username}'`
      );
      if (!data[0] || !(await bcrypt.compare(password, data[0].password)))
        return res.json({
          status: "error",
          error: "Email ou senha incorretos",
        });
      else {
        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES,
        });
        const cookieOptions = {
          expiresIn: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
        };
        res.cookie("usuarioCadastrado", token, cookieOptions);

        return res.json({
          status: "success",
          success: "Usuário Logado",
          token,
        });
      }
    }
  },

  async InfoClient(req, res) {
    const username = req.params.username;

    const [data] = await connection.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    if (!data)
      return res
        .status(404)
        .json({ erro: "true", message: "falha ao carregar usuário" });
    return res.status(200).json(data);
  },
};
