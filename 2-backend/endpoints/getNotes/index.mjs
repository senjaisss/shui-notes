import { sendResponse } from '../../services/utils/response';
import { client } from '../../services/utils/db.mjs';
import { QueryCommand } from '@aws-sdk/client-dynamodb';


export const handler = async (event) => {
    try {
        const username = event.queryStringParameters?.username;

        if(!username) {
            return sendResponse(400, { success: false, message: 'missing queryparameters' })
        }

        const params = {
            TableName: "ShuiNotesTable",
            KeyConditionExpression: "pk = :username",
            ExpressionAttributeValues: {
                ":username": { S: username }
            }
        }

        const command = new QueryCommand(params);
        const data = await client.send(command);

        const notes = data.Items.map(item => ({
            id: item.id.S,
            username: item.username.S,
            text: item.text.S,
            createdAt: item.createdAt.S
        }));

        return sendResponse(200, {
            success: true,
            notes
        })
    } catch (error) {
        return sendResponse(500, {
            success: false,
            message: 'failed to fetch all notes',
            error: error.message
        })
    }
}