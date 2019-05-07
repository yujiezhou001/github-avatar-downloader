//Define repository owner and name to pass them directly on commandline.
//require all the necessary packages.

var repoowner = process.argv[2];
var reponame = process.argv[3];
var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

//Request function 
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': `token ${secrets.GITHUB_TOKEN}`
        }
      };

    request(options, function(err, res, body){
        //convert strings to object in order to extract useful information in execution.
        cb(err,JSON.parse(body));
    });
}
//Execution of Request Function & stores urls and filepaths
getRepoContributors(repoowner, reponame, function(err, result) {
    console.log("Errors:", err);
    if (repoowner && reponame) {
        result.forEach(function(element){
            var imageurl = element.avatar_url;
            var filepath = "./images/" + element.login +".jpg";
            downloadImageByURL(imageurl, filepath)
        });
    } else {
        console.log("You didn't specify both arguments!");
    }
})

//Another request function that passes its input content to output file.
function downloadImageByURL(url, filePath) {
    request.get(url)           
       .on('error', function (err) {  
         if (err) {
         console.log('error!'); 
         }                 
       })
    // .on('response', function (response) {                           
    // })
       .pipe(fs.createWriteStream(filePath));               
}






