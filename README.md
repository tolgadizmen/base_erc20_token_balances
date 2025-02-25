# Base ERC20 Token Balances

This project fetches my personal wallet's ERC20 token balances by using Dune Echo endpoint.

## Overview

A simple web application that displays ERC20 token balances from the Base blockchain, using Dune Analytics' Echo API endpoint.

## Implementation Steps

1. Set up a Vercel project with a private GitHub repository
2. Created a serverless API endpoint that securely uses your API key
3. Fixed the data structure handling to properly extract the balances array
4. Successfully displayed your Base chain token balances in a table

## Features

- Displays token names and symbols
- Shows token balances with proper decimal formatting
- Includes USD values for each token
- Shows chain information
- Securely handles API keys through environment variables

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Vercel Serverless Functions
- API: Dune Analytics Echo API
- Deployment: Vercel

## Environment Variables

Required environment variable in Vercel:
- `test_to_dune_echo`: Your Dune Analytics API key

## Project Structure 

your-project/
├── api/
│ └── dune-data.js
├── index.html
└── styles.css

## Live Demo

https://test-github-project.vercel.app/ 