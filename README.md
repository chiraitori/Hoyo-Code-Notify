# Discord Bot: HoyoGame Code Notify

A Discord bot built with `discord.js` that allows users to redeem game codes for Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero via a slash command.

## Features

- Slash command `/redeemcode` that opens a modal to notify up to three game codes.
- Supports three games: Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero.
- Automatically sends redeemed codes to a specified channel, tagging a role associated with each game.

## Prerequisites

- Node.js v16.6.0 or higher
- A Discord bot token (can be obtained from the [Discord Developer Portal](https://discord.com/developers/applications))
- A `.env` file containing the following environment variables:
  - `TOKEN` - Your Discord bot token
  - `CHANNEL` - The ID of the channel where the bot should send the redeemed codes

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chiraitori/Hoyo-Code-Notify.git
   cd Hoyo-Code-Notify
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your bot token and channel ID:

   ```env
   TOKEN=your-bot-token
   CHANNEL=your-channel-id
   ```

4. Run the bot:

   ```bash
   node index.js
   ```

## Usage

1. Invite the bot to your Discord server.
2. Use the `/redeemcode` slash command to open a modal.
3. Fill in the game name (`genshin`, `hsr`, or `zzz`) and up to three game codes.
4. The bot will process the codes and send them to the specified channel.

## Code Overview

- **Dependencies**: Uses `discord.js` for interacting with the Discord API and `dotenv` for managing environment variables.
- **Commands**: 
  - `/redeemcode`: Opens a modal for users to input game codes.
- **Modal Interaction**:
  - Upon submitting the modal, the bot checks the validity of the game choice and then constructs a message to send to a specific channel.
- **Error Handling**:
  - The bot provides feedback for invalid game choices and handles errors if the specified channel is not found.

## Contribution

Feel free to fork this repository and submit pull requests. If you find any bugs or have feature requests, please open an issue.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [discord.js](https://discord.js.org/) for the excellent library for interacting with the Discord API.
- [dotenv](https://github.com/motdotla/dotenv) for managing environment variables.
