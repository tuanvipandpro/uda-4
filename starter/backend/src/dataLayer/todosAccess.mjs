import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core';
import { createLogger } from '../utils/logger.mjs'


const logger = createLogger('dataLayer')

export class TodosAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE
  ) {
    this.todosTable = todosTable;
    this.dynamoDbClient = DynamoDBDocument.from(documentClient);
  }

  /**
   * Find by user id
   * @param userId the user id
   * @returns all todos for the user
   */
  async findAllByUserId(userId) {
    logger.info(`Getting all for user ${userId}`);

    const params = {
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await this.dynamoDbClient.query(params);
    return result.Items;
  }

  /**
   * Create the todo
   * @param createTodoRequest the todo request
   * @param userId the user id
   */
  async create(createTodoRequest){
    logger.info(`Create ${createTodoRequest}`);

    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: createTodoRequest,
    });

    return {...createTodoRequest}
  }

  /**
   * Update the todo
   * @param userId the user id
   * @param todoId the todo id
   * @param updateTodoRequest the update todo request
   */
  async update(userId, todoId, updateTodoRequest = {}) {
    logger.info(`Updating ${todoId} with ${updateTodoRequest}`)
    const { name, dueDate, done } = updateTodoRequest
    const params = {
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
      },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': name,
        ':dueDate': dueDate,
        ':done': done,
      },
      ReturnValues: 'UPDATED_NEW'
    };

    await this.dynamoDbClient.update(params);
  }

  /**
   * Detete the todo
   * @param userId the user id
   * @param todoId the todo id
   */
  async delete(userId, todoId) {
    logger.info(`Delete: ${todoId} user: ${userId}`);
    await this.dynamoDbClient.delete({
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
      }
    });
  }

  /**
   * Set attactment url
   * @param userId the user id
   * @param todoId the todo id
   * @param image the image
   * @param attachmentUrl the attachment url
   */
  async setAttachmentUrl(userId, todoId, image, attachmentUrl) {
    logger.info(`Set attachmentUrl ${todoId} ${attachmentUrl}`)
    const params = {
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
      },
      UpdateExpression: 'set image = :image, attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl,
        ':image': image,
      },
      ReturnValues: 'UPDATED_NEW'
    };

    await this.dynamoDbClient.update(params);
  }
}