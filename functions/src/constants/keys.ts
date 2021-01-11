require('dotenv').config();

const {
  SECRET_KEY = 'StrOK30fF4T3@br1C0rpu_',
  REFRESH_TOKEN_KEY = 'L4guN4Bl4D3@br1C0rpu_',
} = process.env;
export { SECRET_KEY, REFRESH_TOKEN_KEY };
