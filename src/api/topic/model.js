import mongoose, { Schema } from 'mongoose'

const topicTypes = ['News', 'General', 'Support']

const topicSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  topicType: {
    type: String,
    enum: topicTypes,
    default: 'General',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  parent: {
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
      topicType: this.topicType,
      timeStamp: this.timeStamp,
      content: this.content,
      parent: this.parent,
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
