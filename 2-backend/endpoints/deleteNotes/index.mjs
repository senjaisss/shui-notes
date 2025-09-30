import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../services/utils/db.mjs';
import { sendResponse } from '../../services/utils/response.js';

export const handler = async (event) => {
    try {
        const username = event.pathParameters?.username;
        const id = event.pathParameters?.id;

        const params = {
            TableName: "ShuiNotesTable",
            Key: {
                pk: { S: username },
                sk: { S: id }
            }
        };

        const command = new DeleteItemCommand(params);
        await client.send(command);

        return sendResponse(200, {
            success: true,
            message: 'Note deleted'
        });

    } catch (error) {
        return sendResponse(500, {
            success: false,
            message: 'Failed to delete note',
            error: error.message
        });
    }
};
