const path = require('path')
if (!process.env.NODE_ENV) require('dotenv').config({ path: path.join(process.cwd(), '.env.local') })