# QuakeLog Parser

## Overview

The QuakeLog Parser is a Node.js application that parses logs generated by a Quake 3 Arena server. It uses Express to provide a web interface to view the parsed data. The application runs a server that listens on `http://localhost:3000/data`.

## Features

- Parses Quake 3 Arena log files.
- Groups game data by each match.
- Collects and reports kill data for each player.
- Provides a ranking of players based on kills.
- Generates a report of deaths grouped by death cause.

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/quake-log-parser.git
   cd quake-log-parser
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```

## Running the Application

To start the application, you can use the following npm scripts:

### Development mode:

```sh
npm run dev
```

### Production mode:

```sh
npm start
```

## Accessing the data

Once the server is running, you can access the parsed data by navigating to:

```sh
http://localhost:3000/data
```

## Example Output

```json
{
  "totalKills": 4,
  "players": ["Isgalamido", "Mocinha", "Zeh", "Dono da Bola"],
  "killsByMeans": {
    "MOD_ROCKET": 1,
    "MOD_TRIGGER_HURT": 2,
    "MOD_FALLING": 1
  },
  "kills": {
    "Isgalamido": 1,
    "Mocinha": 0,
    "Zeh": 0,
    "Dono da Bola": 0
  }
}
```
