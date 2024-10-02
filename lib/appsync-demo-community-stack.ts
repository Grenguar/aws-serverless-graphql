import * as cdk from "aws-cdk-lib";
import {
  DynamoDbDataSource,
  MappingTemplate,
  PrimaryKey,
  Values,
  Code,
  FunctionRuntime,
} from "aws-cdk-lib/aws-appsync";
import { EventBus } from "aws-cdk-lib/aws-events";
import {
  Role,
  ServicePrincipal,
  PolicyDocument,
  PolicyStatement,
  Effect,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import path = require("path");

export class AppsyncDemoCommunityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const booksDb = new cdk.aws_dynamodb.TableV2(this, `Books-Table`, {
      partitionKey: {
        name: "id",
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
      tableName: `books-table-demo`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const eventBus = new EventBus(this, "DemoEventBus", {
      eventBusName: "demo-community-bus",
    });

    const api = new cdk.aws_appsync.GraphqlApi(this, "Api", {
      name: "demo",
      definition: cdk.aws_appsync.Definition.fromFile(
        path.join(__dirname, "../schema/books.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: cdk.aws_appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    const dynamoDbDataSource = new DynamoDbDataSource(
      this,
      `dynamoDbDataSource`,
      {
        api: api, // the AppSync GraphqlApi
        table: booksDb, // the DynamoDB Table
        serviceRole: new Role(this, "DynamoDbAppSyncServiceRole", {
          assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
          inlinePolicies: {
            name: new PolicyDocument({
              statements: [
                new PolicyStatement({
                  effect: Effect.ALLOW,
                  actions: [
                    "dynamodb:DeleteItem",
                    "dynamodb:GetItem",
                    "dynamodb:PutItem",
                    "dynamodb:Query",
                    "dynamodb:UpdateItem",
                    "dynamodb:Scan",
                  ],
                  resources: [booksDb.tableArn + "/*"],
                }),
              ],
            }),
          },
        }),
      }
    );

    const eventBridgeDataSource = api.addEventBridgeDataSource(
      "EventBridgeDataSource",
      eventBus
    );

    dynamoDbDataSource.createResolver("QueryGetDemosResolver", {
      typeName: "Query",
      fieldName: "listBooks",
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    });

    dynamoDbDataSource.createResolver("MutationAddDemoResolver", {
      typeName: "Mutation",
      fieldName: "addBook",
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition("id").auto(),
        Values.projecting("input")
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });

    dynamoDbDataSource.createResolver("MutationUpdateBookResolver", {
      typeName: "Mutation",
      fieldName: "updateBook",
      code: Code.fromAsset(path.join(__dirname, "../resolvers/updateBook.js")),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    dynamoDbDataSource.createResolver("MutationDeleteBookResolver", {
      typeName: "Mutation",
      fieldName: "deleteBook",
      code: Code.fromAsset(path.join(__dirname, "../resolvers/deleteBook.js")),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    dynamoDbDataSource.createResolver("MutationGetBookResolver", {
      typeName: "Query",
      fieldName: "getBook",
      code: Code.fromAsset(path.join(__dirname, "../resolvers/getBook.js")),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    eventBridgeDataSource.createResolver("MutationRegisterCustomerResolver", {
      typeName: "Mutation",
      fieldName: "registerCustomer",
      code: Code.fromAsset(
        path.join(__dirname, "../resolvers/registerCustomer.js")
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });
  }
}
