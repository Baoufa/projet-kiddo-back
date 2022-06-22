import mongoose from 'mongoose';

import { default as check } from 'validator';
import * as constants from '../../../utils/constant.mjs';

export const OBJECT_ID_REF_USER = {
  type: mongoose.Schema.Types.ObjectId,
  ref: constants.COLLECTION_NAME.user,
};
export const OBJECT_ID_REF_EVENT = {
  type: mongoose.Schema.Types.ObjectId,
  ref: constants.COLLECTION_NAME.event,
};
export const OBJECT_ID_REF_ARTICLE = {
  type: mongoose.Schema.Types.ObjectId,
  ref: constants.COLLECTION_NAME.article,
};

export const OBJECT_ID_REF_CATEGORY = {
  type: mongoose.Schema.Types.ObjectId,
  ref: constants.COLLECTION_NAME.category,
};

export const OBJECT_ID_REF_RESTRICTION = {
  type: mongoose.Schema.Types.ObjectId,
  ref: constants.COLLECTION_NAME.restriction,
};

export const OBJECT_ID_REF_BADGE = {
  type: mongoose.Schema.Types.ObjectId,
  ref: constants.COLLECTION_NAME.badge,
};

export const OBJECT_ID_REF_COMMENT = {
  type: mongoose.Schema.Types.ObjectId,
  ref: constants.COLLECTION_NAME.comment,
};

export const SCHEMA_OPTIONS = (withTimestamp) => {
  return withTimestamp
    ? {
        versionKey: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      }
    : { versionKey: false };
};

export const REACTION = {
  type: { type: mongoose.Schema.Types.ObjectId, ref: constants.COLLECTION_NAME.reaction },
  sender_id: OBJECT_ID_REF_USER,
};

export const SIGNALMENT = {
  type: { type: mongoose.Schema.Types.ObjectId, ref: constants.COLLECTION_NAME.signalment },
  sender_id: OBJECT_ID_REF_USER,
  signaled_at: { type: Date, default: Date.now },
};

export const CONTENT_MEDIA = {
  banner_url: {
    type: String,
    validate: {
      validator: (value) => check.isURL(value),
      message: (props) => `${props.value} n'est pas une url valide!`,
    },
  },
  photo_url: [
    {
      type: String,
      validate: {
        validator: (value) => check.isURL(value),
        message: (props) => `${props.value} n'est pas une url valide!`,
      },
    },
  ],
  photo_main_url: {
    type: String,
    validate: {
      validator: (value) => check.isURL(value),
      message: (props) => `${props.value} n'est pas une url valide!`,
    },
  },
  video_url: {
    type: String,
    validate: {
      validator: (value) => check.isURL(value),
      message: (props) => `${props.value} n'est pas une url valide!`,
    },
  },
};

const toto = 'toto';
export default toto;
