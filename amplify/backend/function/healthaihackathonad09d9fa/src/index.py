import json
import boto3

def handler(event, context):
  print('received event:')
  print(event)

  client = boto3.client(service_name='comprehendmedical', region_name='eu-west-1')
  result = client.detect_entities(Text= 'cerealx 84 mg daily')
  entities = result['Entities']
  print(f"entities {entities}")
  for entity in entities:
      print('Entity', entity)

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(entities)
  }
