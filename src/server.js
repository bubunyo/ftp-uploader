import app from './app';
import constants from './config/constants';

app.listen(constants.PORT, () => {
  console.log(`Listening on port ${constants.PORT}`);
});

