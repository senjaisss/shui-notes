import { sendResponse } from '../../services/utils/response';
import { client } from '../../services/utils/db.mjs';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { validateUpdateNote } from '../../services/middleware/validateUpdateNote';

export const handler = async (event) => {
  try {
    const username = event.pathParameters?.username;
    const id = event.pathParameters?.id;
    const body = JSON.parse(event.body);

    const validation = validateUpdateNote(body, username, id);
        if (!validation.valid) {
            return sendResponse(400, { success: false, message: validation.message })
        }

    const params = {
      TableName: "ShuiNotesTable2",
      Key: {
        pk: { S: username },
        sk: { S: id }
      },
      UpdateExpression: "SET #text = :text",
      ExpressionAttributeNames: { "#text": "text" },
      ExpressionAttributeValues: { ":text": { S: body.text } },
      ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)",
      ReturnValues: "ALL_NEW"
    };

    const command = new UpdateItemCommand(params);
    const data = await client.send(command);

    if (!data.Attributes) {
      return sendResponse(404, { success: false, message: "Note not found to update" });
    }

    return sendResponse(200, {
      success: true,
      message: "Note updated",
      updatedNote: {
        id,
        username,
        text: data.Attributes.text.S,
        createdAt: data.Attributes.createdAt.S
      }
    });
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return sendResponse(404, { success: false, message: "Note not found to update" });
    }
    return sendResponse(500, { success: false, message: "Failed to update note", error: error.message });
  }
};

