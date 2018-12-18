const { google } = require('googleapis');
const getVideo = require('./getVideo');
const apiKey = process.env.YT_API_KEY;
const maxResults = 50;
const ytLink = 'https://www.youtube.com/watch?v=';
const chalk = require('chalk');
const service = google.youtube('v3');

function getPlaylistName(playlistId) {

  const options = {
    part: 'snippet',
    key: apiKey,
    id: playlistId
  }
  return new Promise((resolve, reject) => {
    service.playlists.list(options, function (err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response.data.items[0].snippet.title);
      }
    })
  }).catch(error => {
    console.log(chalk.red(error))
  });

}

function playlistItemsListByPlaylistId(options) {
  return new Promise((resolve, reject) => {
    service.playlistItems.list(options, function (err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response);
      }
    })
  }).catch(error => {
    console.log(chalk.red(error))
  });
}

async function getvideosFromPlaylist(options, playlistId) {
  const allResults = [];
  let nextPage;
  let pages;
  try {
    await playlistItemsListByPlaylistId(options).then((response) => {
      allResults.push(getVideosId(response.data.items));
      nextPage = response.data.nextPageToken;
      // calculate how many pages are there
      pages = Math.round(response.data.pageInfo.totalResults / maxResults) - 1;
    })
  }
  catch (error) {
    console.log(chalk.redBright('ERROR: '), ('Fetching videos from playlist'), error);
  }

  if (nextPage) {
    for (let i = 0; i < pages; i++) {
      const updatedOptions = {
        part: 'snippet',
        key: apiKey,
        maxResults: maxResults,
        playlistId: playlistId,
        pageToken: nextPage
      }
      await playlistItemsListByPlaylistId(updatedOptions).then((response) => {
        allResults.push(getVideosId(response.data.items));
        nextPage = response.data.nextPageToken;
      }).catch(error => {
        console.log(chalk.redBright('ERROR: '), ('Fetching playlist title'),error);
      })
    }
    return flattenArr(allResults);
  }
  else {
    return flattenArr(allResults);
  }
}


async function loadVideos(playlistId) {

  const options = {
    part: 'snippet',
    key: apiKey,
    maxResults: maxResults,
    playlistId: playlistId
  }

  console.log('Fetching video links from playlist...');

  let videoLinks;
  let playlistName;

  try {
    playlistName = await getPlaylistName(playlistId);
    videoLinks = await getvideosFromPlaylist(options, playlistId);
  } catch (error) {
    console.log(chalk.redBright('ERROR: '), ('Fetching videos from playlist'),error);

  }

  if (videoLinks !== undefined && videoLinks.length > 0) {

    const metadata =  {
      album: playlistName
  }

    // form tags
    console.log(`${videoLinks.length} video links fetched`);
    console.log(`Downloading videos from ${playlistName}...`);
    for (let i = 0; i < videoLinks.length; i++) {
      const link = ytLink + videoLinks[i];
      getVideo.processVideo(link, metadata);
    }
  } 
}

function getVideosId(items) {
  let ids = [];
  items.forEach(item => {
    ids.push(item.snippet.resourceId.videoId)
  });
  return ids;
}

function flattenArr(arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}


module.exports = {loadVideos};
