import mongoose, { Schema } from 'mongoose'

const assmamaSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  ass: {
    type: String
  },
  tits: {
    type: String
  },
  balls: {
    type: String
  },
  steel: {
    type: String
  }
}, {
  timestamps: true
})

assmamaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      ass: this.ass,
      tits: this.tits,
      balls: this.balls,
      steel: this.steel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Assmama', assmamaSchema)

export const schema = model.schema
export default model
