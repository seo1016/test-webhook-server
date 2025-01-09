import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const ddbClient = new DynamoDBClient({ region: 'us-west-2', endpoint: 'http://localhost:8001' });

export async function addItem() {
  const params = {
    TableName: 'MyTable',
    Item: {
      ID: { S: '123' }
    },
  };

  try {
    const data = await ddbClient.send(new PutItemCommand(params));
    console.log('Item Added:', data);
  } catch (err) {
    console.error('Error adding item:', err);
  }
}
