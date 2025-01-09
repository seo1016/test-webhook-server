import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';

// DynamoDB Client 설정
const ddbClient = new DynamoDBClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:8001', // DynamoDB 로컬의 포트
});

// DynamoDB에 아이템 추가하는 함수
async function addItem() {
  const params = {
    TableName: 'Webhooks',
    Item: {
      id: { S: '123' },
      message: { S: 'Webhook Trigger Test' },
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
  await addItem(); // 데이터 삽입 요청

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Item added successfully',
    }),
  });
};
