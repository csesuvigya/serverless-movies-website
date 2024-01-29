# MOVIE SEARCH WEB APPLICATION

## Overview

This is a Serverless simple web-based application that allows users to search for movies. The application reads data from a csv file 'data.csv' which is located on an S3 bucket. The same bucket has the 'index.html' and 'scripts.js' files which are being accessed through a lambda function.

## Table of Contents

- Directory Structure
- Setup
    - Setting up S3 bucket
    - Create a Dynamo DB table
    - Create and configure lambda function
    - Create an API gateway to invoke lambda function
    - Run The Application
- CSV File Format
- Usage

# DIRECTORY STRUCTURE (S3 bucket)

``` 
|-- suvi-temp                 #Name of the S3 bucket
|   |-- scripts.js            #Javascript file
|   |-- index.html            #Page containg a form for user interaction. 
``` 

# SETUP

## Setting up S3 bucket

- Create a new bucket and keep it public.
- Browse and upload the index.html and scripts.js files.
- Go to properties tab and setup 'Static website hosting' (can be found at the bottom of the properties tab)
- Go to 'permissions' tab and update the 'Bucket policy' with the following code

> {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::suvi-temp/*"
        }
    ]
}

## Create a Dynamo DB table
- Go to AWS console and search for 'dynamodb' service.
- Create a dynamodb table by entering name and partition key. (My db name is 'suvi-ddb-webapp' and partition key is 'Title')

## Create and configure lambda function

- Go to the AWS console and search for 'lambda' service.
- Click on 'Create function'.
- In the code section, paste the code from 'lambda.py' file.
- Create an Environment variable with name of your dynamodb table created in the previous step.
- Deploy the function and test. 

## Create an API gateway to invoke lambda function

- Got to the AWS console and search for 'API Gateways'.
- Create a 'HTTP API' type gateway.
- Now you have to integrate your API gateway with the lambda function created above. 
- Click on 'Add integrations' and select 'lambda', then search for your lamda function name.
- Give your API a name and then click next. Select the stage and click deploy.
- After the deplyment, this API gateway is now associated with your lambda function.



## Run The Application

- Go to the AWS lambda service and open your lambda function.
- Click on 'API Gateway'. You will find the endpoint link to access your website.

# CSV FILE FORMAT

The CSV file (data.csv) has the following columns:
- Title                 #title of the movie
- Type                  #Media type (in this case all are movies)
- Release Year          #release year of the movie
- Director/Author       #Director of that movie

Example CSV Data:
> The Matrix,Movie,1999,The Wachowskis


# USAGE

## Enter Search Criteria:
- Enter the search keywords in the search box on the page.

## Perform the Search:
- Click the "Search" button.

## View Results:
- The search results are displayed on the same page.

