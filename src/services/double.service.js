const logEvent = require("../events/myEmitter");
const _ = require("lodash");
const axios = require("axios").default;

class DoubleService {
  constructor(api) {
    this.api = api;
  }
    
  async countryName(country, name) {
    let get
    let data
    await axios.get(this.api).then((res) => {
      if (country === "Others") {
        get = _.filter(res.data, {'country':{'name':'Unsorted'}})
        data = _.filter(get, (o) => { 
          return o.name.toLowerCase().match(name.toLowerCase())
        })
      } else {
        get = _.filter(res.data, (o) => { 
          return o.country.name.toLowerCase().match(country.toLowerCase())
        })
        data = _.filter(get, (o) => { 
          return o.name.toLowerCase().match(name.toLowerCase())
        })
      }
    }).catch((e) => {
      logEvent.emit("APP-ERROR", {
        logTitle: "GROUP-BY-COUNTRY-&-NAME-FAILED",
        logMessage: e,
        })
        throw new Error(e)
      })
    return data
  }
}
module.exports = DoubleService