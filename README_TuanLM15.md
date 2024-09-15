# README for UDA-4 Application

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Welcome to the UDA-4 application! This document provides guidelines for accessing and using the app.

This app use client is React and backend is AWS serverless.

This app use Serverless Framework to deploy BE and auth0 to authenticate.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) (version 14 or higher).
- You have a [Git](https://git-scm.com/) client installed.
- You have access to the internet.

## Installation
To install the UDA-4 application, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/tuanvipandpro/uda-4
    ```
2. Navigate to the project directory:
    ```sh
    cd uda-4/starter/client
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
To start the application, run the following command:
```sh
npm run start
```
Open your browser and navigate to `http://localhost:3000` to access the app.

This client will access with BE from AWS serverless
HOST: https://1kdgm91eyk.execute-api.us-east-1.amazonaws.com/dev

## Contributing
To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
