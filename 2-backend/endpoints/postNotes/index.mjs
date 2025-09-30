import { v4 as uuidv4 } from 'uuid';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../services/utils/db.mjs';
import { sendResponse } from '../../services/utils/response.js';
import { validateNote } from '../../services/middleware/validateNote.js';

export const handler = async (event) => {
    console.log("Event body:", event.body);
    try {
        const note = JSON.parse(event.body);

        const validationResult = validateNote(note);
        if (!validationResult.valid) {
            return sendResponse(400, { success: false, message: validationResult.message });
        }

        const id_unsorted = uuidv4();
        const id = id_unsorted.slice(0, 5);
        const createdAt = new Date().toISOString();

        const command = new PutItemCommand({
            TableName: "ShuiNotesTable",
            Item: {
                pk: { S: note.username },
                sk: { S: createdAt },
                id: { S: id },
                username: { S: note.username },
                text: { S: note.text },
                createdAt: { S: createdAt }
            }
        })

        await client.send(command);

        return sendResponse(201, {
            success: true,
            message: 'Note posted!',
            noteId: id,
            username: note.username,
            createdAt
        });

    } catch (error) {
        return sendResponse(500, {
            success: false,
            message: 'Failed to post note',
            error: error.message
        });
    }
}