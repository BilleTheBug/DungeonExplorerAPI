import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Assmama } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Assmama.create({ ...body, user })
    .then((assmama) => assmama.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Assmama.find(query, select, cursor)
    .populate('user')
    .then((assmamas) => assmamas.map((assmama) => assmama.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Assmama.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((assmama) => assmama ? assmama.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Assmama.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((assmama) => assmama ? _.merge(assmama, body).save() : null)
    .then((assmama) => assmama ? assmama.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Assmama.findById(params.id)
    .then(notFound(res))
    .then((assmama) => assmama ? assmama.remove() : null)
    .then(success(res, 204))
    .catch(next)
