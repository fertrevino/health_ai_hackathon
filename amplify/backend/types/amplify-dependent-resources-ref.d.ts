export type AmplifyDependentResourcesAttributes = {
    "function": {
        "healthaihackathonad09d9fa": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "auth": {
        "healthaihackathon": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "patientsGroupRole": "string",
            "doctorsGroupRole": "string"
        }
    },
    "api": {
        "comprehendMedical": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}