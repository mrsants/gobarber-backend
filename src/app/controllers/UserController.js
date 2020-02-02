import User from "../models/User";

// import * as Yup from 'yup';


class UserController {
  async store(req, res) {
    const reqUser = { where: { email: req.body.email } };
    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   email: Yup.string()
    //     .email()
    //     .required(),
    //   password: Yup.string()
    //     .min(6)
    //     .required(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res
    //     .status(401)
    //     .json({ error: 'Falha na validação dos dados fornecidos!' });
    // }

    const userExists = await User.findOne(reqUser);

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe!' });
    }
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }

  // async update(req, res) {
  //   const schema = Yup.object().shape({
  //     name: Yup.string(),
  //     email: Yup.string().email(),
  //     avatar_id: Yup.number(),
  //     oldPassword: Yup.string().min(6),
  //     password: Yup.string().when('oldPassword', (oldPassword, field) =>
  //       oldPassword ? field.required() : field
  //     ),
  //     confirmPassword: Yup.string().when('password', (password, field) =>
  //       password ? field.required().oneOf([Yup.ref('password')]) : field
  //     ),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res
  //       .status(400)
  //       .json({ error: 'Falha na validação dos dados fornecidos!' });
  //   }
  //   const { email, oldPassword } = req.body;

  //   const userOnDb = await User.findByPk(req.userID);

  //   if (email && email !== userOnDb.email) {
  //     const userExists = await User.findOne({ where: { email } });

  //     if (userExists) {
  //       return res.status(400).json({ error: 'Usuário já existe.' });
  //     }
  //   }

  //   if (oldPassword && !(await userOnDb.checkPassword(oldPassword))) {
  //     return res.status(400).json({ error: 'As senhas não conferem.' });
  //   }

  //   const { id, name, provider } = await userOnDb.update(req.body);
  //   return res.json({
  //     id,
  //     name,
  //     email,
  //     provider,
  //   });
  // }
}

export default new UserController();
