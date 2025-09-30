import { sendResponse } from '../../services/utils/response';
import { client } from '../../services/utils/db.mjs';
import { QueryCommand } from '@aws-sdk/client-dynamodb';

export const handler = async (event) => {
  try {
    const username = event.pathParameters?.username;
    if (!username) {
      return sendResponse(400, { success: false, message: "Missing username" });
    }

    const params = {
      TableName: "ShuiNotesTable2",
      KeyConditionExpression: "pk = :username",
      ExpressionAttributeValues: { ":username": { S: username } }
    };

    const command = new QueryCommand(params);
    const data = await client.send(command);

    const notes = (data.Items || []).map(item => ({
      id: item.sk.S,
      username: item.pk.S,
      text: item.text?.S || '',
      createdAt: item.createdAt?.S || ''
    }));

    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return sendResponse(200, {
      success: true,
      notes
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "failed to fetch notes",
      error: error.message
    });
  }
};
