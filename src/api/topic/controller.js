import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Topic } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Topic.create({ ...body, user })
    .then((topic) => topic.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Topic.find(query, select, cursor)
    .populate('user')
    .then((topics) => topics.map((topic) => topic.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Topic.findById(params.id)
    .then(notFound(res))
    .then((topic) => topic ? topic.view() : null)
    .then(success(res))
    .catch(next)
/*export const show = ({ params }, res, next) =>
  Topic.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((topic) => topic ? topic.view() : null)
    .then(success(res))
    .catch(next)*/

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Topic.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((topic) => topic ? _.merge(topic, body).save() : null)
    .then((topic) => topic ? topic.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Topic.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((topic) => topic ? topic.remove() : null)
    .then(success(res, 204))
    .catch(next)
