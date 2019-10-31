const fs = require("fs");
const webStore = require("chrome-webstore-upload")({
  extensionId: process.env.APP_ID,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

webStore.fetchToken().then(async token => {
  const myZipFile = fs.createReadStream("./get-the-gist.zip");
  webStore.uploadExisting(myZipFile, token).then(
    uploadRes => {
      // Response is a Resource Representation
      // https://developer.chrome.com/webstore/webstore_api/items#resource
      console.log("Upload successful!", uploadRes);

      const target = "trustedTesters"; // optional. Can also be 'trustedTesters'
      webStore.publish(target, token).then(
        publishRes => {
          // Response is documented here:
          // https://developer.chrome.com/webstore/webstore_api/items/publish
          console.log("Publish successful!", publishRes);
        },
        err => new Error("Something went wrong when publishing: ", err)
      );
    },
    err => new Error("Something went wrong when uploading: ", err)
  );
});
