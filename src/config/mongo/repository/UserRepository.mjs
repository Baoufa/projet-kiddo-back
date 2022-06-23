import userModel from '../models/user.model.mjs';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const POPULATE_USER = 'signalments reactions comments';

export default class UserRepository {
  //===============================================
  // Récupération des données liées à l'utilisateur
  //===============================================
  async getAll() {
    return await userModel.find().populate(POPULATE_USER).exec();
  }

  async getById(id) {
    return await userModel.findOne({ _id: id }).populate(POPULATE_USER).exec();
  }

  async getByEmail(email) {
    return await userModel.findOne({ email }).populate(POPULATE_USER).exec();
  }

  //==========================================
  // Création et modification de l'utilisateur
  //==========================================
  async createUser(input, res) {
    let token = jwt.sign(input, process.env.JWT_TOKEN_SECRET);
    let email = input.email;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(input.password, salt);

    const cookie_options = {
      httpOnly: true,
    };
    res.cookie('authorization', 'Bearer ' + token, cookie_options);

    return await userModel.create({ token: token, email: email, password: hash });
  }

  async modifyUser(id, input) {
    return await userModel.findOneAndUpdate({ _id: id }, input, { new: true });
  }

  async removeUser(id) {
    return await userModel.findOneAndRemove(id);
  }
}
