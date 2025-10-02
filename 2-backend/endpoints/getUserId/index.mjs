import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from '../../services/utils/db.mjs';
import { sendResponse } from '../../services/utils/response.js';

export const handler = async (event) => {
    try {
        const id = event.pathParameters?.id;
        if (!id) {
            return sendResponse(400, { success: false, message: "Missing id" });
        }

        const params = {
            TableName: "ShuiNotesTable2",
            IndexName: "IdIndex",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": { S: id }
            }
        };

        const command = new QueryCommand(params);
        const data = await client.send(command);

        if (!data.Items || data.Items.length === 0) {
            return sendResponse(404, { success: false, message: "Note not found" });
        }

        const item = data.Items[0];

        const note = {
            id: item.id.S,
            username: item.pk.S,
            text: item.text?.S || '',
            createdAt: item.createdAt?.S || ''
        }

        return sendResponse(200, {
            success: true,
            note
        });

    } catch (error) {
        return sendResponse(500, {
            success: false,
            message: "Failed to fetch note",
            error: error.message
        });
    }
};