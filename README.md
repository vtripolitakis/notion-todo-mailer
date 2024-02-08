# Notion ToDo Emailer

## Evangelos Tripolitakis - v.tripolitakis@_NOSPAM_trp.gr
### Latest change: 08/02/2024

Notion ToDo Emailer is an application designed to sen my daily to-do lists from Notion to a specified email address.
It aims to provide a convenient way to keep track of tasks directly from your inbox.

## Features

- Fetch tasks from a Notion database.
- Generate a human-readable email body with the daily to-do list.
- Send an email to a predefined recipient with the day's tasks.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a basic understanding of JavaScript and Node.js.
- You have Node.js 16+ and npm/yarn installed on your local machine.

## Installation

To install the project and its dev dependencies for Notion ToDo Emailer, follow these steps:

```shell
git clone https://github.com/vtripolitakis/notion-todo-mailer
cd notion-todo-emailer
npm install
```

## Running with Docker

### Build the image
```shell
docker build -t notion-todo-mailer .
```

### Run it
Make sure you've populated properly the .env file
```shell
docker run --env-file ./.env notion-todo-mailer
```


## Configuration
You need to have a Notion Database on your workspace. This example works with ToDo lists. For other types feel free to change the code in the function `createMailData` in `utils/createMailBody.js`

Create a .env file in the root of your project and update it with your email credentials and Notion API key:
```
NOTION_API_KEY=
NOTION_API_VERSION=
NOTION_DATABASE_ID=
SMTP_HOST=
SMTP_USER_NAME=
SMTP_PASSWORD=
SMTP_PORT=
SMTP_SECURE=
MAIL_FROM_HUMAN_READABLE_NAME=
FROM_EMAIL_ADDRESS=
TO_EMAIL_ADDRESS=
```

## Contributing
Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Contact
If you want to contact me you can reach me at `v.tripolitakis@_NOSPAM_trp.gr`.

## Acknowledgments
Thanks to Notion for the API.

Anyone whose code was used.
