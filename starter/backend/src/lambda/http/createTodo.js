import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { createTodo } from '../../businessLogic/todos.mjs'

const httpEventLogger = createLogger('http')

export async function handler(event) {
  httpEventLogger.info(`Now processing createTodo event: ${event}`)

  const newTodo = JSON.parse(event.body)

  const userId = getUserId(event)

  const item = await createTodo(newTodo, userId)

  httpEventLogger.info(`Finished processing createTodo event. Todo created: ${event}`)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item
    })
  }
}