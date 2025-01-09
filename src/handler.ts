import { DynamoDBStreamEvent } from 'aws-lambda';

export const handler = async (event: DynamoDBStreamEvent) => {
    event.Records.forEach(record => {
        if (record.eventName === 'INSERT') {
            console.log('hello new info!');
        }
    });
};