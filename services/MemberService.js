const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching speakers information
 */
class MemberService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the speakers data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of speakers name and short name
   */
  async getNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((member) => {
      return { name: member.name, shortname: member.shortname };
    });
  }

  /**
   * Get all artwork
   */
  async getAllArtwork() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all speakers and
    // create an array that contains all artwork
    const artwork = data.reduce((acc, elm) => {
      if (elm.artwork) {
        // eslint-disable-next-line no-param-reassign
        acc = [...acc, ...elm.artwork];
      }
      return acc;
    }, []);
    return artwork;
  }

  /**
   * Get all artwork of a given speaker
   * @param {*} shortname The speakers short name
   */
  async getArtworkForMember(shortname) {
    const data = await this.getData();
    const member = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!member || !member.artwork) return null;
    return member.artwork;
  }

  /**
   * Get speaker information provided a shortname
   * @param {*} shortname
   */
  async getMember(shortname) {
    const data = await this.getData();
    const member = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!member) return null;
    return {
      title: member.title,
      name: member.name,
      shortname: member.shortname,
      description: member.description,
    };
  }

  /**
   * Returns a list of speakers with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map((member) => {
      return {
        name: member.name,
        shortname: member.shortname,
        title: member.title,
      };
    });
  }

  /**
   * Get a list of speakers
   */
  async getList() {
    const data = await this.getData();
    return data.map((member) => {
      return {
        name: member.name,
        shortname: member.shortname,
        title: member.title,
        summary: member.summary,
      };
    });
  }

  /**
   * Fetches speakers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data).members;
  }
}

module.exports = MemberService;
