/* eslint-disable no-console */
const fs = require("fs");
const webStore = require("chrome-webstore-upload")({
  extensionId: process.env.APP_ID,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

webStore.fetchToken().then(async token => {
  const myZipFile = fs.createReadStream("./get-the-gist.zip");
  try {
    webStore.uploadExisting(myZipFile, token).then(
      ({ uploadState, ...uploadRes }) => {
        // Response is a Resource Representation
        // https://developer.chrome.com/webstore/webstore_api/items#resource
        console.log(uploadState, uploadRes);
        if (uploadState === "FAILURE")
          throw new Error(
            JSON.stringify({
              uploadState,
              ...uploadRes
            })
          );

        const target = process.env.PUBLISH_TARGET; // optional. Can also be 'trustedTesters'
        webStore.publish(target, token).then(
          publishRes => {
            // Response is documented here:
            // https://developer.chrome.com/webstore/webstore_api/items/publish
            console.log("Publish successful!", publishRes);
          },
          err => {
            throw new Error(err);
          }
        );
      },
      err => {
        throw new Error(err);
      }
    );
  } catch (error) {
    console.error(
      "Something went wrong when uploading and publishing...",
      error
    );
  }
});
