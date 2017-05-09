const _ = require('underscore');
const DELIMITER = ': ';

// Input: Array of strings defining dependencies
// Output: Comma separated list of package names in the order of install

module.exports = {
  /**
   * Parses a list of libraries and their dependencies into an object.  Each entry in the list of libraries
   * is a string of the form "Library: Dependency".
   * @param {array} libraries - The list of libraries.
  **/
  parse(libraries = []) {
    return _.reduce(libraries, (memo, library) => {
      const [key, value] = library.split(DELIMITER);

      memo[key] = value;
      return memo;
    }, {});
  },

  /**
   * Sorts an object of library-dependency key-value pairs so that dependencies come first
   * @param {object} packages - Object of library-dependency key-value pairs
  **/
  sort(packages = {}) {
    const order = _.keys(_.pick(packages, _.isEmpty));
    packages = _.omit(packages, _.isEmpty);

    while (_.any(packages)) {


      for (const library in packages) {
        if (order.indexOf(packages[library]) >= 0) {
          order.push(library);
          delete packages[library];
        }
      }
    }

    return order;
  },

  install(packages = []) {
    return this.sort(this.parse(packages)).join(', ');
  },


};
