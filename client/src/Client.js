/* eslint-disable no-undef */

const fhirToken = ''

function getPatients(cb) {
  return fetch(`https://healthdash.azurehealthcareapis.com/Patient`, {
    accept: 'application/json',
    headers: {
      'Authorization': `Bearer ${fhirToken}`
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}


function notify(query, cb) {
  return fetch(`api/notify?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { getPatients, notify };
export default Client;
