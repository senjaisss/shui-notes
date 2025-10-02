import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from '../../services/utils/db.mjs';
import { sendResponse } from '../../services/utils/response.js';

export const handler = async (event) => {
    try {
        const username = event.pathParameters?.username;
        const id = event.pathParameters?.id;
        if (!username || !id) {
            return sendResponse(400, { success: false, message: "Missing username or id" });
        }

        const params = {
            TableName: "ShuiNotesTable2",
            Key: {
                pk: { S: username },
                sk: { S: id },
            }
        };

        const command = new GetItemCommand(params);
        const data = await client.send(command);

        if (!data.Item) {
            return sendResponse(404, { success: false, message: "Note not found" });
        }

        const note = {
            id: data.Item.sk.S,
            username: data.Item.pk.S,
            text: data.Item.text?.S || '',
            createdAt: data.Item.createdAt?.S || ''
        };

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