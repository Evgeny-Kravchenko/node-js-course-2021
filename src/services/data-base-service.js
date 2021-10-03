const fs = require('fs');

class DataBaseService {
  constructor(database, pathToStore) {
    this.database = database;
    this.pathToStore = pathToStore;
  }

  async getResource(name, { parameterToSearch, parameterValue } = {}) {
    const isExist = await this.checkIfResourceExist(this.pathToStore + name);
    if (!isExist) {
      return null;
    }
    const allDataPaths = await this.database.readdirSync(
      this.pathToStore + name
    );

    const data = allDataPaths.map((fileName) => {
      const specifiedData = this.getSpecifiedResource(
        `${this.pathToStore}/${name}/${fileName}`
      );
      return specifiedData;
    });
    return parameterToSearch
      ? data.filter((item) => item[parameterToSearch] === parameterValue)
      : data;
  }

  getSpecifiedResource(name) {
    return JSON.parse(this.database.readFileSync(name));
  }

  updateEntity(name, id, body) {
    const doesResourceExist = this.checkIfResourceExist(
      `${__dirname}/../local-data-base/${name}/${id}.json`
    );
    if (doesResourceExist) {
      this.deleteEntity(name, id);
      this.database.writeFileSync(
        `${__dirname}/../local-data-base/${name}/${id}.json`,
        JSON.stringify(body)
      );
    }
  }

  createEntity(name, id, body) {
    const doesResourceExist = this.checkIfResourceExist(
      `${__dirname}/../local-data-base/${name}`
    );
    if (doesResourceExist) {
      this.database.writeFileSync(
        `${__dirname}/../local-data-base/${name}/${id}.json`,
        JSON.stringify(body)
      );
    }
  }

  deleteEntity(name, id) {
    this.database.unlinkSync(
      `${__dirname}/../local-data-base/${name}/${id}.json`
    );
  }

  checkIfResourceExist(path) {
    return this.database.existsSync(path);
  }
}

module.exports = {
  dataBaseService: new DataBaseService(fs, `${__dirname}/../local-data-base/`),
};
