import * as cloudformation from 'aws-cdk-lib/aws-cloudformation';
import * as cdk from 'aws-cdk-lib';

export class HellodevStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cfnStackSet = new cloudformation.CfnStackSet(this, 'MyCfnStackSet', {
      permissionModel: 'SELF_MANAGED',
      stackSetName: 'samplestacckset',
    
      // the properties below are optional
      administrationRoleArn: 'arn:aws:iam::209185650497:role/AWSCloudFormationStackSetAdministrationRole',
      description: 'description',
      stackInstancesGroup: [{
        deploymentTargets: {
          accounts: ['128680359488'],
        },
        regions: ['us-east-1'],
      }],
      templateBody: `{
        "Parameters" : {
          "VPCCidr" : {
            "Type" : "String",
            "Default" : "10.0.0.0/16",
            "Description" : "Enter the CIDR block for the VPC. Default is 10.0.0.0/16."
          }
        },
        "Resources" : {
          "myVpc": {
            "Type" : "AWS::EC2::VPC",
            "Properties" : {
              "CidrBlock" : { "Ref" : "VPCCidr" },
              "Tags" : [
                {"Key": "Name", "Value": "Primary_CF_VPC"}
              ]
            }
          }
        }
      }
      `,
    });

  }
}
