const logEvent = require("../events/myEmitter");
const _ = require("lodash");
const axios = require("axios").default;

class DuplicateService {
  constructor(api) {
    this.api = api;
  }

  async duplicateName() {
    let data
    let name
    let newArr = []
    let allArr = []
    await axios.get(this.api).then((res) => {
      let groupped = _.groupBy(res.data, (o) => {return o.name});
      data = _.uniq(_.flatten(_.filter(groupped, (n) => {return n.length > 1})));
      for (let i of data) {
        if (name == null || i.name == name) {
          newArr.push(i.url)
        } else {
          allArr.push({[name]: newArr})
          newArr = []
          newArr.push(i.url)
        }
        name = i.name
      }
      data = allArr
      }).catch((e) => {
        logEvent.emit("APP-ERROR", {
          logTitle: "MERGE-DUPLICATE-CHANNEL-NAME-FAILED",
          logMessage: e,
        })
        throw new Error(e)
      })
    return data
  }
}
module.exports = DuplicateService