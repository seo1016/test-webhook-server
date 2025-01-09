"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client_dynamodb_2 = require("@aws-sdk/client-dynamodb");
// DynamoDB Client 설정
const ddbClient = new client_dynamodb_1.DynamoDBClient({
    region: 'us-west-2',
    endpoint: 'http://localhost:8001', // DynamoDB 로컬의 포트
});
// DynamoDB에 아이템 추가하는 함수
function addItem() {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: 'Webhooks',
            Item: {
                id: { S: '123' },
                message: { S: 'Webhook Trigger Test' },
            },
        };
        try {
            yield ddbClient.send(new client_dynamodb_2.PutItemCommand(params));
            console.log('Item Added');
        }
        catch (err) {
            console.error('Error adding item:', err);
        }
    });
}
const handler = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    yield addItem(); // 데이터 삽입 요청
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Item added successfully',
        }),
    });
});
exports.handler = handler;
