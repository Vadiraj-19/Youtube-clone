

# YouTube Clone - MERN Stack Capstone Project

## Overview

This is a full-stack YouTube clone built using the MERN stack (MongoDB, Express, React, Node.js). The project simulates core functionalities of YouTube, allowing users to view, search, filter, and interact with videos, manage channels, and authenticate with JWT-based login. This project is designed to give hands-on experience in building real-world web applications with modern technologies.

---

## Features

### Frontend (React)

* **Home Page**

  * YouTube-style header with search bar and sign-in functionality.
  * Toggleable static sidebar via a hamburger menu.
  * Filter buttons to filter videos by category.
  * Grid display of video thumbnails, each showing:

    * Title
    * Thumbnail
    * Channel name
    * View count

* **User Authentication**

  * Register and login using username, email, and password.
  * JWT-based authentication for secure sessions.
  * Google form styled login/register page.
  * Displays logged-in user’s name in the header.

* **Search & Filter**

  * Search videos by title using the header search bar.
  * Filter videos based on categories with filter buttons.

* **Video Player Page**

  * Video playback.
  * Display video details: title, description, channel name.
  * Like and dislike buttons.
  * Comment section: add, edit, delete comments.

* **Channel Page**

  * Create a new channel (only for authenticated users).
  * List all videos uploaded to the channel.
  * Edit and delete videos owned by the user.

* **Responsive Design**

  * Fully responsive UI optimized for mobile, tablet, and desktop.

---

### Backend (Node.js, Express)

* RESTful API endpoints for:

  * User authentication (sign up, login) with JWT token.
  * Channel creation and data fetching.
  * Video management (fetch, update, delete).
  * Comment management (add, fetch, edit, delete).

* MongoDB for storing:

  * Users, videos, channels, comments.
  * File metadata such as video URLs and thumbnails.

---

## Technologies Used

* **Frontend:** React, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (MongoDB Atlas or local instance)
* **Authentication:** JSON Web Tokens (JWT)
* **Version Control:** Git

---

## Project Structure

```
root/
├── client/            # React frontend
├── server/            # Express backend
├── README.md          # This file
```

---

## Getting Started

### Prerequisites

* Node.js (v14+)
* npm or yarn
* MongoDB (Atlas or local)
* Git

---

### Installation & Running

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/youtube-clone-mern.git
cd youtube-clone-mern
```

2. **Backend setup:**

```bash
cd server
npm install
# Create a .env file and configure your MongoDB URI and JWT_SECRET
npm run dev  # Runs the server with nodemon
```

The backend server will run at `http://localhost:5000` by default.

3. **Frontend setup:**

Open a new terminal window/tab and run:

```bash
cd client
npm install
npm run dev
```

The React app will run at `http://localhost:3000` by default.

---

## Usage

* Open the app in your browser at `http://localhost:3000`.
* Use the hamburger menu to toggle the sidebar.
* Use the search bar to find videos by title.
* Use filter buttons to filter videos by category.
* Register or sign in to access user-specific features like creating channels and managing videos.
* Navigate to a video page to watch, like/dislike, and comment on videos.
* Visit your channel page to manage your videos.

---

## Sample Data

Example video data structure:

```json
{
  "videoId": "video01",
  "title": "Learn React in 30 Minutes",
  "thumbnailUrl": "https://example.com/thumbnails/react30min.png",
  "description": "A quick tutorial to get started with React.",
  "channelId": "channel01",
  "uploader": "user01",
  "views": 15200,
  "likes": 1023,
  "dislikes": 45,
  "uploadDate": "2024-09-20",
  "comments": [
    {
      "commentId": "comment01",
      "userId": "user02",
      "text": "Great video! Very helpful.",
      "timestamp": "2024-09-21T08:30:00Z"
    }
  ]
}
```

Example user data:

```json
{
  "userId": "user01",
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "hashedPassword123",
  "avatar": "https://example.com/avatar/johndoe.png",
  "channels": ["channel01"]
}
```

Example channel data:

```json
{
  "channelId": "channel01",
  "channelName": "Code with John",
  "owner": "user01",
  "description": "Coding tutorials and tech reviews by John Doe.",
  "channelBanner": "https://example.com/banners/john_banner.png",
  "subscribers": 5200,
  "videos": ["video01", "video02"]
}
```

---


## Demo Video

*Please refer to the demo video in the repository or linked in the project documentation.*

---

## Contributions

Feel free to fork the repository and contribute by submitting pull requests.

---

## License

This project is open-source and available under the MIT License.

---

