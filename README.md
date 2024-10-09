# Sponsor Image Extractor

This project is a simple web application that extracts and displays sponsor images from the [Millennium Sponsorships](https://mill-all.com/millennium-sponsorships/) page using Puppeteer for web scraping and React for the frontend.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features
- Fetches sponsor images from a specified URL.
- Displays the images in a responsive grid layout.
- Handles loading and error states gracefully.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Web Scraping:** Puppeteer
- **Styling:** Tailwind CSS

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for the server:
```bash
cd server
npm install
```
3. Install dependencies for the client:
```bash
cd ../client
npm install
```

Command to start server:
```
node server.js
```

Command to start React App:
```bash
npm run dev
```
## API
The server exposes an API endpoint to fetch sponsor images:

GET /api/sponsors
Fetches a list of sponsors with their images.
Sample Response
```
[
  {
    "id": 1,
    "name": "Sponsor 1",
    "imageUrl": "https://example.com/sponsor1.png"
  },
  {
    "id": 2,
    "name": "Sponsor 2",
    "imageUrl": "https://example.com/sponsor2.png"
  }
]
```