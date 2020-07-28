#!/bin/bash 

echo "==== npm install ===="
npm install 

echo "==== npm run build ===="
npm run build 

echo "==== rm -rf node_modules ===="
rm -rf node_modules 

echo "==== gcloud app deploy ===="
gcloud app deploy 