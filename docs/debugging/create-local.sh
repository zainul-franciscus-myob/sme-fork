#!/bin/bash

set -euxo pipefail
myob-auth k -e europa-preprod

STS_BFF_CLIENT_SECRET=$(kubectl get secrets sme-web-bff-segment-api-key -o json -n sme | jq -r '.data["segment-api-key"]' | base64 -D)
AUTHENTICATION_BFF_CLIENT_SECRET=$(kubectl get secrets sme-web-bff-auth-client-secret -o json -n sme | jq -r '.data["auth-client-secret"]' | base64 -D)
CONTENTFUL_ACCESS_TOKEN=$(kubectl get secrets sme-web-bff-contentful-secrets -o json -n sme | jq -r '.data["contentful-access-token"]' | base64 -D)
CONTENTFUL_SPACE_ID=$(kubectl get secrets sme-web-bff-contentful-secrets -o json -n sme | jq -r '.data["contentful-space-id"]' | base64 -D)

cat .env.dev > .env.local

echo "AUTHENTICATION_BFF_CLIENT_SECRET=$AUTHENTICATION_BFF_CLIENT_SECRET" >> .env.local
echo "STS_BFF_CLIENT_SECRET=$STS_BFF_CLIENT_SECRET" >> .env.local
echo "CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN" >> .env.local
echo "CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID" >> .env.local
echo "AUTHENTICATION_TYPE=authentication" >> .env.local
echo "EXTRACTOR_TYPE=HttpExtractor" >> .env.local
echo "CONTENTFUL_TYPE=Http" >> .env.local
echo "GATEWAY_BASE_URL=http://localhost:5500" >> .env.local

cp ./src/featureTogglesConfig/config.dev.js ./src/featureTogglesConfig/config.local.js
cp ./src/extractor/cors/allowed-origins.dev.js ./src/extractor/cors/allowed-origins.local.js