
import boto3
import csv
import json
import datetime
import os

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE_NAME') 
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    bucket_name = 'suvi-temp'
    index_html_key = 'index.html'
    file_key = 'data.csv'
    
    search_query = event.get('queryStringParameters', {}).get('query', '').lower()

    s3 = boto3.client('s3')
    
    

    # If no search query, fetch index.html from S3
    if not search_query:
        try:
            response = s3.get_object(Bucket=bucket_name, Key=index_html_key)
            index_html_content = response['Body'].read().decode('utf-8')
            store_access_details(event)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'text/html'},
                'body': index_html_content
            }
        except Exception as e:
            print(f"Error fetching index.html: {e}")
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Internal Server Error'})
            }

    # If there is a search query, proceed with fetching and filtering movie data
    try:
        response = s3.get_object(Bucket=bucket_name, Key=file_key)
        data = response['Body'].read().decode('utf-8').splitlines()

        # Parse CSV data
        reader = csv.DictReader(data)
        movies = list(reader)

        # Filter movies based on search query
        filtered_movies = [movie for movie in movies if search_query in movie['Title'].lower()]

        return {
            'statusCode': 200,
            'body': json.dumps(filtered_movies)
        }
    except Exception as e:
        print(f"Error fetching data.csv: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'})
        }
        
def store_access_details(event):
    try:
        client_ip = event['requestContext']['identity']['sourceIp']
        current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        title = 'Website Access' 
        
        # Store access details in DynamoDB
        table.put_item(
            Item={
                'Title': title,
                'ClientIP': client_ip,
                'AccessTime': current_time
            }
        )
    except Exception as e:
        print(f"Error storing access details in DynamoDB: {e}")

