// this script is referenced by jest.config.js
// the purpose of this script is to initialize the environment variables for the tests
// those environment variables are declared in ".env.test.local" file. This name was chosen just to follow the Next.js naming patterns of environment files
require("dotenv").config({ path: ".env.test.local" });
