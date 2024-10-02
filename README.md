# Serverless GraphQL with AppSync and Resolvers

This project shows how to build GraphQL application without a need for traditional Lambda functions.
More information you could read in [my blog post about AppSync](https://www.soroka.tech/blog/graphql-serverless-appsync).

It is using AppSync, DynamoDB and EventBridge.

How one could do operations on datasources:
- CDK templates
- AppSync JavaScript Resolvers

## Structure
- `lib/appsync-demo-community-stack.ts` - has the CDK code for the application
- `resolvers` - this folder contains the JS resolvers for the operations
- `schema/books.graphql` - GraphQL schema for the project
- `graphql_queries.md` - examples of queries

## Useful commands
* `npx cdk bootstrap` this the command to prepare your AWS account to the CDK applications by region
* `npm run build`   compile typescript to js
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk synth`   emits the synthesized CloudFormation template

## Follow me on LinkedIn
- [My profile](https://bit.ly/soroka-linkedin)
