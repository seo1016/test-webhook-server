import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';

const ddbClient = new DynamoDBClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:8001',
});

async function addItem() {
  const params = {
    TableName: 'MyTable',
    Item: {
      ID: { S: '123' }
    },
  };

  try {
    await ddbClient.send(new PutItemCommand(params));
    console.log('Item Added');
  } catch (err) {
    console.error('Error adding item:', err);
  }
}

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  await addItem();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Item added successfully',
    }),
  });
};
