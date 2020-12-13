const logEvent = require("../events/myEmitter");
const _ = require("lodash");
const axios = require("axios").default;

class SingleService {
  constructor(api) {
    this.api = api;
  }

  async all() {
    let data 
    await axios.get(this.api).then((res) => {
      data = res.data
    }).catch((e) => {
      logEvent.emit("APP-ERROR", {
        logTitle: "SHOW-ALL-CHANNEL-FAILED",
        logMessage: e,
      })
      throw new Error(e)
    })
    return data
  }

  async name(name) {
    let data 
    await axios.get(this.api).then((res) => {
      data = _.filter(res.data, (o) => { 
        return o.name.toLowerCase().match(name.toLowerCase()) 
      })
    }).catch((e) => {
      logEvent.emit("APP-ERROR", {
        logTitle: "GROUP-BY-NAME-FAILED",
        logMessage: e,
      })
      throw new Error(e)
    })
    return data
  }

  async category(category) {
    let data
    await axios.get(this.api).then((res) => {
      if (category === "Others") {
        data = _.filter(res.data, {'category':null})
      } else {
        data = _.filter(res.data, {'category':category})
      }
      }).catch((e) => {
        logEvent.emit("APP-ERROR", {
          logTitle: "GROUP-BY-CATEGORY-FAILED",
          logMessage: e,
        })
        throw new Error(e)
      })
    return data
  }

  async country(country) {
    let data
    await axios.get(this.api).then((res) => {
      if (country === "Others") {
        data = _.filter(res.data, {'country':{'name':'Unsorted'}})
      } else {
        data = _.filter(res.data, (o) => { 
          return o.country.name.toLowerCase().match(country.toLowerCase()) 
        })
      }
      }).catch((e) => {
        logEvent.emit("APP-ERROR", {
          logTitle: "GROUP-BY-COUNTRY-FAILED",
          logMessage: e,
        })
        throw new Error(e)
      })
    return data
  }
}
module.exports = SingleService
