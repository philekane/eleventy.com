var axios = require('axios');

module.exports = async function() {
  let url = `https://ghibliapi.herokuapp.com/films`;

  return axios.get(url)
      .then(function (response) {
        return response.data;
      })
      .catch(function(error) {
          console.log(error);
      });
}


