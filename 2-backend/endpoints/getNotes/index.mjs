import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../services/utils/db.mjs';
import { sendResponse } from '../../services/utils/response.js';

export const handler = async () => {
    try {
        const params = { TableName: 'ShuiNotesTable' };
        const command = new ScanCommand(params);
        const data = await client.send(command);

        const notes = (data.Items || []).map(item => ({
            id: item.id?.S || '',
            username: item.username?.S || '',
            text: item.text?.S || '',
            createdAt: item.createdAt?.S || '',
        }));

        return sendResponse(200, { success: true, notes });
    } catch (error) {
        return sendResponse(500, { success: false, message: 'Failed to fetch all notes', error: error.message });
    }
};