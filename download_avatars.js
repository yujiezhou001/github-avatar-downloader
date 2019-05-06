var request = require('request');
var secrets = require('./secrets')
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': `token ${secrets.GITHUB_TOKEN}`
        }
      };

    request(options, function(err, res, body){
        cb(err,JSON.parse(body));
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    result.forEach(function(element){
        var imageurl = element.avatar_url;
        var filepath = "./images/" + element.login +".jpg"
        downloadImageByURL(imageurl, filepath)
    })
  });


function downloadImageByURL(url, filePath) {
    request.get(url)           
       .on('error', function (err) {  
         if (err) {
         console.log('error!'); 
         }                 
       })
       .on('response', function (response) {                           
       })
       .pipe(fs.createWriteStream(filePath));               
}






