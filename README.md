# 🚀 LeetScan API

![LeetScan API Banner](assets/image.png)

[![GitHub stars](https://img.shields.io/github/stars/chinxcode/leetScan-api.svg)](https://github.com/chinxcode/leetScan-api/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/chinxcode/leetScan-api.svg)](https://github.com/chinxcode/leetScan-api/network)
[![GitHub issues](https://img.shields.io/github/issues/chinxcode/leetScan-api.svg)](https://github.com/chinxcode/leetScan-api/issues)

> LeetScan API fetches and displays profile data from LeetCode, allowing developers to access key statistics and recent activities.

LeetScan API is a tool for fetching data from LeetCode user profiles. It provides developers and recruiters with detailed insights into a user's coding activity and contest performance. This API integrates easily with other systems and offers robust data access features.

## 🌟 Features

-   🔍 **Profile Data Retrieval**: Fetch LeetCode user profiles with detailed problem-solving statistics.
-   📊 **Contest and Submission Stats**: Access a user's contest rankings, total submissions, and recent activities.
-   🔒 **Rate Limiting**: Built-in rate limiting to handle multiple requests safely.
-   🔌 **Easy Integration**: RESTful API that can be integrated into any platform.

## 📚 API Documentation

### Get Developer Profile

```
GET /:username
```

Replace `:username` with the LeetCode username.

#### Response Example

```json
{
  "username": "codingwizard",
  "totalSolved": 100,
  "ranking": 5000,
  "easySolved": 50,
  "mediumSolved": 30,
  "hardSolved": 20,
  "profile": {
    "realName": "John Doe",
    "company": "Tech Corp",
    "location": "New York"
  },
  "recentSubmissions": [...],
  "contestRanking": {...}
}
```

## 🛠️ Technologies Used

-   **Node.js**
-   **Express.js**
-   **GraphQL** for fetching LeetCode data

## 🚀 Quick Start

Follow these steps to get started with LeetScan API:

1. Clone the repository:

    ```bash
    git clone https://github.com/chinxcode/leetScan-api.git
    ```

2. Install dependencies:

    ```bash
    cd leetScan-api
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

4. Make your first API call:
    ```bash
    curl http://localhost:8000/leetcode_username
    ```

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/chinxcode">Sachin Sharma</a>
</p>
