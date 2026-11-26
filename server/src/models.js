import mongoose from 'mongoose'
import { isUuid } from '../../shared/swipeContract.js'

export function createModels(connection) {
  const profileSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    age: { type: Number, required: true, min: 18, max: 120 },
    bio: { type: String, required: true, trim: true, maxlength: 240 },
  }, { versionKey: false })
  const swipeSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, validate: isUuid },
    requestId: { type: String, required: true, validate: isUuid },
    profileId: { type: String, required: true },
    direction: { type: String, required: true, enum: ['left', 'right', 'up'] },
  }, { timestamps: true, versionKey: false })
  swipeSchema.index({ sessionId: 1, requestId: 1 }, { unique: true })
  swipeSchema.index({ sessionId: 1, profileId: 1 }, { unique: true })
  return {
    Profile: connection.models.Profile ?? connection.model('Profile', profileSchema),
    Swipe: connection.models.Swipe ?? connection.model('Swipe', swipeSchema),
  }
}

export async function seedProfiles(Profile) {
  const profiles = [
    { _id: 'an', name: 'An', age: 24, bio: 'A fictional book lover who enjoys quiet cafes and weekend walks.' },
    { _id: 'binh', name: 'Binh', age: 26, bio: 'A fictional home cook who likes live music and trying new recipes.' },
    { _id: 'chi', name: 'Chi', age: 25, bio: 'A fictional photographer who enjoys cycling and early mornings.' },
  ]
  await Profile.bulkWrite(profiles.map((profile) => ({ updateOne: { filter: { _id: profile._id }, update: { $setOnInsert: profile }, upsert: true } })))
}
