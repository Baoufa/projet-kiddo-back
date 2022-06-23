import commentModel from '../models/comment.model.mjs';

export default class CommentRepository {
  //===============================================
  // Récupération des données liées à l'utilisateur
  //===============================================
  async getAll() {
    return await commentModel.find();
  }

  async getAllbyIds(idsArray) {
    return await userModel.find({ _id: { $in: idsArray } });
  }

  async getById(id) {
    return await commentModel.findOne(id);
  }

  //==========================================
  // Création et modification de l'utilisateur
  //==========================================
  async createComment(input) {
    return await commentModel.create(input);
  }

  async modifyComment(id, input) {
    return await commentModel.findOneAndUpdate(id, input, { new: true });
  }

  async removeComment(id) {
    return await commentModel.findOneAndRemove(id);
  }

  async removeComments(idsArray) {
    // EN CONSTRUCTION A VERIFIER LA STRUCTURE DES ARGUMENTS DE IDSARRAY
    return await commentModel.deleteMany({ _id: { $in: idsArray } });
  }
}
