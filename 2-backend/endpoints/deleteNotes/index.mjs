import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../services/utils/db.mjs';
import { sendResponse } from '../../services/utils/response.js';

export const handler = async (event) => {
  try {
    const username = event.pathParameters?.username;
    const id = event.pathParameters?.id;

    if (!username || !id) {
      return sendResponse(400, { success: false, message: "Username and id are required" });
    }

    const params = {
      TableName: "ShuiNotesTable2",
      Key: {
        pk: { S: username },
        sk: { S: id }
      },
      ReturnValues: "ALL_OLD"
    };

    const command = new DeleteItemCommand(params);
    const data = await client.send(command);

    if (!data.Attributes) {
      return sendResponse(404, { success: false, message: "Note not found to delete" });
    }

    return sendResponse(200, { success: true, message: "Note deleted" });
  } catch (error) {
    return sendResponse(500, { success: false, message: "Failed to delete note", error: error.message });
  }
};

