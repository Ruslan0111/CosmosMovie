import axios from 'axios';

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
  api_key: "226baf8becdcb48d3cf2eeef5d60a3fb"
}

export default axios;
