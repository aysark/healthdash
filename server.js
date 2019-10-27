const express = require('express');
const app = express();

var twilio = require('twilio');
var client = new twilio.RestClient('AC29185952423b8ea71aedbeca69e298d9', 'a65e49264c32e65f7844d76eb9f05bf4');

app.set('port', (3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/notify', (req, res) => {
  const param = req.query.q;

  client.sms.messages.create({
      to:'+13238987096',
      from:'+14243560186',
      body: 'Containers are now available for pickup at port of Los Angeles.'
  }, function(error, message) {
      if (!error) {
        console.log('Success! The SID for this SMS message is:', message.sid);
        return res.json({success: true});
      }
    else {
      return res.json({
        error: error,
      });
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
