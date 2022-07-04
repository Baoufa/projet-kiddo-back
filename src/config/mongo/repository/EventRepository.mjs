import eventModel from '../models/event.model.mjs';

const POPULATE_EVENT =
  'main_owner co_owners group_participants.user_id categories restrictions signalments.type signalments.sender_id reactions.type reactions.sender_id comments';

export default class EventRepository {
  // Récupération des données liées à l'évènement
  async getEvents(
    first = 12,
    offset = 0,
    filterKey = null,
    filter = null,
    geoloc = null,
    maxDist = null
  ) {
    return await eventModel
      .find({ [filterKey]: filter })
      .skip(parseInt(offset))
      .limit(parseInt(first))
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getCountByComplexSearch() {
    return 'toto';
  }

  async getEventsByComplexSearch(
    first,
    offset,
    filterKey,
    filter,
    searchInput,
    lng,
    lat,
    maxDistMeters,
    minChildAge,
    maxChildAge,
    isPriced,
    restrictionsArray
  ) {
    return await eventModel
      .find({
        [filterKey]: filter,
        'content.title': { $regex: `.*${searchInput}.*` },
        'content.subtitle': { $regex: `.*${searchInput}.*` },
        'content.description': { $regex: `.*${searchInput}.*` },
        'content.highlighted_message.title': { $regex: `.*${searchInput}.*` },
        'content.highlighted_message.message': { $regex: `.*${searchInput}.*` },
      })
      .skip(offset)
      .limit(first)
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getMatch() {
    return await eventModel.aggregate([
      {
        $match: {
          categories: ObjectId('62bda67384cf824356e890e0'),
        },
      },
    ]);
  }

  async getAllbyIds(idsArray) {
    return await eventModel
      .find({ _id: { $in: idsArray } })
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getAllByFilter(filter, array) {
    return await eventModel
      .find({ [filter]: { $in: array } })
      .populate(POPULATE_EVENT)
      .exec();
  }

  async getEventById(eventId) {
    return await eventModel.findOne(eventId).populate(POPULATE_EVENT).exec();
  }

  // Création et modification de l'évènement
  async createEvent(eventInput, fields) {
    return await eventModel.create(eventInput);
  }

  async modifyEvent(eventId, eventInput, fields) {
    return await eventModel
      .findOneAndUpdate(eventId, eventInput, { new: true })
      .populate(POPULATE_EVENT)
      .exec();
  }

  async removeEvent(eventId) {
    return await eventModel.findOneAndRemove(eventId);
  }

  async removeEvents(idsArray) {
    return await eventModel.deleteMany({ _id: { $in: idsArray } });
  }
}
