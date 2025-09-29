import { sendResponse } from '../../services/utils/response';
import { client } from '../../services/utils/db.mjs';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';

export const handler = async (event) => {
    try {
        const username = event.pathParameters?.username;
        const id = event.pathParameters?.id;
        const body = JSON.parse(event.body);

        if (!username || !id) {
            return sendResponse(400, { success: false, message: 'missing path parameters: username and id are required' });
        }

        if (!body.text) {
            return sendResponse(400, { success: false, message: 'text is required in body' });
        }

        const params = {
            TableName: "ShuiNotesTable",
            Key: {
                pk: { S: username },
                sk: { S: id }
            },
            UpdateExpression: "SET #text = :text",
            ExpressionAttributeNames: {
                "#text": "text"
            },
            ExpressionAttributeValues: {
                ":text": { S: body.text }
            },
            ReturnValues: "ALL_NEW"
        };

        const command = new UpdateItemCommand(params);
        const data = await client.send(command);

        const updatedNote = data.Attributes ? {
            id: data.Attributes.id?.S,
            username: data.Attributes.username?.S,
            text: data.Attributes.text?.S,
            createdAt: data.Attributes.createdAt?.S,
        } : null;

        return sendResponse(200, {
            success: true,
            message: 'Note updated',
            updatedNote
        });

    } catch (error) {
        return sendResponse(500, {
            success: false,
            message: 'Failed to update note',
            error: error.message
        });
    }
};
