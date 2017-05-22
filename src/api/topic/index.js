import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Topic, { schema } from './model'

const router = new Router()
const { id, title, topicType, content, parent, subTopics } = schema.tree

/**
 * @api {post} /topics Create topic
 * @apiName CreateTopic
 * @apiGroup Topic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam id Topic's id.
 * @apiParam title Topic's title.
 * @apiParam topicType Topic's topicType.
 * @apiParam timeStamp Topic's timeStamp.
 * @apiParam content Topic's content.
 * @apiParam parent Topic's parent.
 * @apiParam subTopics Topic's subTopics.
 * @apiSuccess {Object} topic Topic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Topic not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ id, title, topicType, content, parent, subTopics }),
  create)

/**
 * @api {get} /topics Retrieve topics
 * @apiName RetrieveTopics
 * @apiGroup Topic
 * @apiUse listParams
 * @apiSuccess {Object[]} topics List of topics.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /topics/:id Retrieve topic
 * @apiName RetrieveTopic
 * @apiGroup Topic
 * @apiSuccess {Object} topic Topic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Topic not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /topics/:id Update topic
 * @apiName UpdateTopic
 * @apiGroup Topic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam id Topic's id.
 * @apiParam title Topic's title.
 * @apiParam topicType Topic's topicType.
 * @apiParam timeStamp Topic's timeStamp.
 * @apiParam content Topic's content.
 * @apiParam parent Topic's parent.
 * @apiParam subTopics Topic's subTopics.
 * @apiSuccess {Object} topic Topic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Topic not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ id, title, topicType, content, parent, subTopics }),
  update)

/**
 * @api {delete} /topics/:id Delete topic
 * @apiName DeleteTopic
 * @apiGroup Topic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Topic not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
