const logEvent = require("../events/myEmitter");
const axios = require("axios").default;

class BaseService {
  constructor(api) {
    this.api = api;
  }

  async base() {
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
}

module.exports = BaseService