import jwt from 'jsonwebtoken';
import User from '../models/User';


class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais Inválidas'],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['Senha invalida'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      res.json({ token });
    } catch (e) {
      res.status(401).json({
        errors: ['Erro inesperado'],
      });
    }
  }
}

export default new TokenController();
