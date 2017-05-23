import mongoose, { Schema } from 'mongoose'

const topicSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  imageUrl: {
    type: String
  },
  topicType: {
    type: String
  },
  subTopics: {
    type: String
  }
}, {
  timestamps: true
})

topicSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      message: this.message,
      imageUrl: this.imageUrl,
      topicType: this.topicType,
      subTopics: this.subTopics,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Topic', topicSchema)

export const schema = model.schema
export default model
