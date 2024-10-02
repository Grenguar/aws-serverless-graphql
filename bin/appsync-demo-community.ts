#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppsyncDemoCommunityStack } from "../lib/appsync-demo-community-stack";

const app = new cdk.App();
new AppsyncDemoCommunityStack(app, "AppsyncDemoCommunityStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || process.env.AWS_DEFAULT_REGION,
  },
});
