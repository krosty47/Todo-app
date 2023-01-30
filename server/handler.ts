import * as moment from "moment";
import uuid from "uuid";
import { DynamoDB as dynamodbTypes } from "aws-sdk";

import { dynamodb } from "./dynamodb/config";
import {
  CreateTodoDto,
  IGenericActionResponse,
  RemoveTodo,
  UpdateTodoDto,
} from "./types";
import { TodoErrorMessage } from "./utils/error-messages";

export const todos = async (
  _event,
  _context
): Promise<IGenericActionResponse> => {
  try {
    const params: dynamodbTypes.ScanInput = {
      TableName: "todosTable",
    };

    const data = await dynamodb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        data.Items.map(
          ({
            id: { S: id },
            createdAt: { S: createdAt },
            title: { S: title },
            description: { S: description },
            done: { BOOL: done },
          }) => ({
            id,
            createdAt,
            title,
            description,
            done,
          })
        ),
        null,
        2
      ),
    };
  } catch (e) {
    console.log(TodoErrorMessage.GET_TODOS);
    console.log("error", e);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};

export const add = async (
  _event,
  _context
): Promise<IGenericActionResponse> => {
  try {
    const { body } = _event;
    const todo: CreateTodoDto = JSON.parse(body);
    const id = uuid();
    const currentTime = moment().toISOString();

    var params: dynamodbTypes.PutItemInput = {
      TableName: "todosTable",
      Item: {
        id: { S: id },
        createdAt: { S: currentTime },
        title: { S: todo.title },
        description: { S: todo.description },
        done: { BOOL: false },
      },
    };

    const response = await dynamodb.putItem(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          success: response,
          item: {
            id,
            createdAt: currentTime,
            title: todo.title,
            description: todo.description,
            done: false,
          },
        },
        null,
        2
      ),
    };
  } catch (e) {
    console.log(TodoErrorMessage.POST_TODO);
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};

export const update = async (
  _event,
  _context
): Promise<IGenericActionResponse> => {
  try {
    const { body } = _event;
    const todo: UpdateTodoDto = JSON.parse(body);
    var params: dynamodbTypes.UpdateItemInput = {
      TableName: "todosTable",
      Key: {
        id: {
          S: todo.id,
        },
      },
      UpdateExpression: `SET #done = :done`,
      ExpressionAttributeNames: {
        "#done": "done",
      },
      ReturnValues: "ALL_OLD",
      ExpressionAttributeValues: {
        ":done": { BOOL: todo.done },
      },
    };

    const response = await dynamodb.updateItem(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          success: todo.done,
          item: {
            id: response?.Attributes.id.S,
            createdAt: response?.Attributes.createdAt.S,
            title: response?.Attributes.title.S,
            description: response?.Attributes.description.S,
            done: todo.done,
          },
        },
        null,
        2
      ),
    };
  } catch (e) {
    console.log(TodoErrorMessage.PUT_TODO);
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};

export const remove = async (
  _event,
  _context
): Promise<IGenericActionResponse> => {
  try {
    const { body } = _event;
    const todo: RemoveTodo = JSON.parse(body);

    var params: dynamodbTypes.DeleteItemInput = {
      Key: { id: { S: todo.id } },
      TableName: "todosTable",
    };

    const response = await dynamodb.deleteItem(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: response, id: todo.id }, null, 2),
    };
  } catch (e) {
    console.log(TodoErrorMessage.DELETE_TODO);
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};
