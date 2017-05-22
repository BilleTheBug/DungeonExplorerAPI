import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Assmama, { schema } from './model'

const router = new Router()
const { ass, tits, balls, steel } = schema.tree

/**
 * @api {post} /assmamas Create assmama
 * @apiName CreateAssmama
 * @apiGroup Assmama
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam ass Assmama's ass.
 * @apiParam tits Assmama's tits.
 * @apiParam balls Assmama's balls.
 * @apiParam steel Assmama's steel.
 * @apiSuccess {Object} assmama Assmama's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assmama not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ ass, tits, balls, steel }),
  create)

/**
 * @api {get} /assmamas Retrieve assmamas
 * @apiName RetrieveAssmamas
 * @apiGroup Assmama
 * @apiUse listParams
 * @apiSuccess {Object[]} assmamas List of assmamas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /assmamas/:id Retrieve assmama
 * @apiName RetrieveAssmama
 * @apiGroup Assmama
 * @apiSuccess {Object} assmama Assmama's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assmama not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /assmamas/:id Update assmama
 * @apiName UpdateAssmama
 * @apiGroup Assmama
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam ass Assmama's ass.
 * @apiParam tits Assmama's tits.
 * @apiParam balls Assmama's balls.
 * @apiParam steel Assmama's steel.
 * @apiSuccess {Object} assmama Assmama's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assmama not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ ass, tits, balls, steel }),
  update)

/**
 * @api {delete} /assmamas/:id Delete assmama
 * @apiName DeleteAssmama
 * @apiGroup Assmama
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Assmama not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
