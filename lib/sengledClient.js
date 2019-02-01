const request = require('request-promise');
const tough = require('tough-cookie');

module.exports = class Client {
  constructor (config) {
    this.cookieJar = request.jar();
    this.defaultOptions = {
      baseUrl: 'https://element.cloud.sengled.com',
      json: true,
      simple: false,
      resolveWithFullResponse: true,
      method: 'POST',
      jar: this.cookieJar,
      rejectUnauthorized: false,
      requestCert: true,
      agent: false,
    };
    this.username = config.username;
    this.password = config.password;
    this.sessionId = config.sessionId;
    this.isLoggedIn = false;
  }

  login () {
    if (this.isLoggedIn) return Promise.resolve();
    const options = {
      ...this.defaultOptions,
      baseUrl: 'https://ucenter.cloud.sengled.com',
      uri: '/user/app/customer/v2/AuthenCross.json',
      body: {
        osType: 'android',
        pwd: this.password,
        user: this.username,
        productCode: 'life',
        appCode: 'life',
        uuid: 'xxxxxx',
      },
    };

    return request(options)
      .then((res) => {
        const cookie = tough.parse(res.headers['set-cookie'][0]);
        this.sessionId = cookie.value;
        this.isLoggedIn = true;
      })
      .catch(console.warn);
  }

  deviceSetGroupColor (devices = [], color = []) {
    // const jessionId = this.cookieJar.getCookies(this.defaultOptions.baseUrl).JSESSIONID;
    // this.cookieJar.setCookie(`JSESSIONID=${this.sessionId}`, this.defaultOptions.baseUrl);
    const options = {
      uri: '/zigbee/device/deviceSetGroup.json',
      headers: {
        'content-type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        sid: this.sessionId,
        authority: 'elements.cloud.sengled.com',
        cookie: `JSESSIONID=${this.sessionId}`,
      },
      body: {
        cmdId: 129,
        deviceUuidList: devices,
        value: '255:255:255',
        rgbColorR: color[0],
        rgbColorG: color[1],
        rgbColorB: color[2],
      },
      ...this.defaultOptions,
    };
    // console.log(options.headers);
    // console.log(this.cookieJar.Cookies(this.defaultOptions.baseUrl));
    return request(options)
      .catch(console.warn);
  }
};
