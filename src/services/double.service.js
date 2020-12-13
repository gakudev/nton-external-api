const logEvent = require("../events/myEmitter");
const _ = require("lodash");
const axios = require("axios").default;

class DoubleService {
  constructor(api) {
    this.api = api;
  }
    
  async countryCategory(country, category) {
    let get
    let data
    await axios.get(this.api).then((res) => {
      if (country === "Others") {
        get = _.filter(res.data, {'country':{'name':'Unsorted'}})
        data = _.filter(get, {'category':category})
      } else if (category === "Others") {
        get = _.filter(res.data, (o) => { 
          return o.country.name.toLowerCase().match(country.toLowerCase())
        })
        data = _.filter(get, {'category':null})
      } else if (country === "Others" && category === "Others") {
        get = _.filter(res.data, {'country':{'name':'Unsorted'}})
        data = _.filter(get, {'category':null})
      } else {
        get = _.filter(res.data, (o) => { 
          return o.country.name.toLowerCase().match(country.toLowerCase())
        })
        data = _.filter(get, {'category':category})
      }
    }).catch((e) => {
      logEvent.emit("APP-ERROR", {
        logTitle: "GROUP-BY-COUNTRY-&-CATEGORY-FAILED",
        logMessage: e,
        })
        throw new Error(e)
      })
    return data
  }
}
module.exports = DoubleService