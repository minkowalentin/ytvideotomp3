const { google } = require('googleapis');
const getVideo = require('./getVideo');
const apiKey = process.env.YT_API_KEY;
const maxResults = 50;
const ytLink = 'https://www.youtube.com/watch?v=';
const chalk = require('chalk');

function playlistItemsListByPlaylistId(options) {
  var service = google.youtube('v3');
  return new Promise((resolve, reject) => {
    service.playlistItems.list(options, function (err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response);
      }
    })
  }).catch(error => {
    console.log(chalk.red(error.errors[0].message))
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
    console.log(chalk.redBright('ERROR: '), ('Fetching videos from playlist'));
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
        console.log(chalk.redBright('ERROR: '), ('Fetching videos from playlist'));
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
  try {
    videoLinks = await getvideosFromPlaylist(options, playlistId);
  } catch (error) {
    console.log(chalk.redBright('ERROR: '), ('Fetching videos from playlist'));
  }

  if (videoLinks !== undefined && videoLinks.length > 0) {
    console.log(`${videoLinks.length} video links fetched`);
    console.log(`Downloading videos...`);

    for (let i = 0; i < videoLinks.length; i++) {
      getVideo.processVideo(ytLink + videoLinks[i]);
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
