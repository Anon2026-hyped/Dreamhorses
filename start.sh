#!/bin/bash

# Exit on any error
set -e

# Install dependencies
npm install

# Build the project
npm run build

# Serve the built app
npm run start