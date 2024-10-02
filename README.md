# ⚡️ Serverless GraphQL with AppSync and Resolvers

This project shows how to build a GraphQL application without the need for traditional Lambda functions.  
More information can be found in [my blog post about AppSync](https://www.soroka.tech/blog/graphql-serverless-appsync).

It uses **AppSync**, **DynamoDB**, and **EventBridge**.

## 📋 How to perform operations on datasources:
- 🛠️ **CDK templates**
- ⚙️ **AppSync JavaScript Resolvers**

## 📁 Structure:
- `lib/appsync-demo-community-stack.ts` - 🏗️ CDK code for the application
- `resolvers` - 📜 JS resolvers for the operations
- `schema/books.graphql` - 🗂️ GraphQL schema for the project
- `graphql_queries.md` - 💡 Examples of queries

## 🛠️ Useful commands:
- `npx cdk bootstrap` - 🚀 Prepare your AWS account for CDK applications by region
- `npm run build` - 🔨 Compile TypeScript to JS
- `npx cdk deploy` - 📦 Deploy the stack to your default AWS account/region
- `npx cdk synth` - 📝 Emit the synthesized CloudFormation template

## 🌐 Follow me:
- [My LinkedIn profile](https://bit.ly/soroka-linkedin) ✨
