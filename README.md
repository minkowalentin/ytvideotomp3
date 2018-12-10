# ytvideotomp3

This is a Node.js app that downloads a youtube video or a playlist and converts it to **mp3** files.

## Setting up youtube data API

This app uses the youtube data v3 API to fetch links from playlists. In order to fetch playlists you have to generate a API key. Follow the instructions bellow to set up one.

* Go to [google developers console](https://console.developers.google.com) and create a project if you haven't already.

* Click on Enable API's and Services and then
Search for Youtube Data v3. Once located, click on enable.


* Navigate back to [google developers console](https://console.developers.google.com) and click on **Credentials** located in the side menu.
Click on create credentials and select API key.

* Copy your API key in the .env file.

## Commands and options

