import * as uuid from 'uuid'
import {TodosAccess} from "../dataLayer/todosAccess.mjs";
import {createLogger} from "../utils/logger.mjs";

const logger = createLogger('businessLogic')

const todosAccess = new TodosAccess();

/**
 * Find by user id
 * @param userId the user id
 * @returns all todos for the user
 */
export async function findByUserId(userId) {
  logger.info(`findByUserId ${userId}`)
  return todosAccess.findAllByUserId(userId);
}

/**
 * Create the todo
 * @param createTodoRequest the todo request
 * @param userId the user id
 */
export async function createTodo(createTodoRequest, userId) {
  const todoId = uuid.v4()
  logger.info(`createTodo ${userId} todoId ${todoId}`)

  return await todosAccess.create({
    todoId, userId, createdAt: new Date().toISOString(), done: false, ...createTodoRequest
  });
}

/**
 * Update the todo
 * @param userId the user id
 * @param todoId the todo id
 * @param updateTodoRequest the update todo request
 */
export async function updateTodo(userId, todoId, updateTodoRequest) {
  logger.info(`updateTodo ${userId} todoId ${todoId} request ${updateTodoRequest}`)
  return await todosAccess.update(userId, todoId, {...updateTodoRequest});
}

/**
 * Detete the todo
 * @param userId the user id
 * @param todoId the todo id
 */
export async function deleteTodo(userId, todoId) {
  logger.info(`createTodo ${userId} todoId ${todoId}`)
  return await todosAccess.delete(userId, todoId);
}

/**
 * Set Attactment Url
 * @param userId the user id
 * @param todoId the todo id
 * @param image the image
 * @param attachmentUrl the attachment url
 */
export async function setAttachmentUrl(userId, todoId, image, attachmentUrl) {
  logger.info(`setAttachmentUrl ${userId} todoId ${todoId} attachmentUrl ${attachmentUrl}`)
  return await todosAccess.setAttachmentUrl(userId, todoId, image, attachmentUrl);
}
