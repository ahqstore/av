const { execSync } = require("node:child_process");

execSync(
  "curl -F 'file=@/Users/ajin/Desktop/diva-beta.apk' http://localhost:8000/api/v1/upload -H \"Authorization: 6163734e236ef604b86285d3fba110fe6fca976b5bcbf11b2b3e036d44f1a9ec\""
);
