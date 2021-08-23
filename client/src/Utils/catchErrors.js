function catchErrors(error, displayError) {
  let errorMessage;
  if (error.response) {
    // if there's a request made to our server in the backend ,it will respond with a status quote that isn't in the 200 range, meaning no beuno (not sure how to spell that , but okay ..!!)
    errorMessage = error.response.data;
  } else if (error.request) {
    // the request was made but got no response
    errorMessage = error.request;
  } else {
    // something else occured in making the request and it triggered the error
    errorMessage = error.message;
  }
  displayError(errorMessage);
}

export default catchErrors;
