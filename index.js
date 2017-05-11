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
    const noDeps = _.pick(packages, _.isEmpty);
    const withDeps = _.omit(packages, _.isEmpty);
    const ordered = [..._.keys(noDeps)];

    while (_.any(withDeps)) {
      for (const library in withDeps) {
        if (_.contains(ordered, withDeps[library])) {
          ordered.push(library);
          delete withDeps[library];
        }
      }
    }

    return ordered;
  },

  /**
   * Parses packages and checks if there is a cycle
   * if there is a cycle it throws an error
   * if there is no cycle it returns a string of the sorted packages
   * @param {array} libraries - The list of libraries.
  **/
  install(packages = []) {
    const libraries = this.parse(packages);

    if (this.isCycle(libraries)) {
      throw("This is a cycle");
    } else {
      return this.sort(libraries).join(', ');
    }
  },

  /**
   * Returns true or false after checking to see if an object of packages contains a cycle
   * @param {object} packages - Object of library-dependency key-value pairs
  **/
  isCycle(packages = {}) {
    const libraries = _.chain(packages).pairs().flatten().uniq().value();

    return !_.all(libraries, library => {
      let result = true;
      const checked = [];

      if (!packages[library] || _.contains(checked, library)) {
        return true;
      }

      while (packages[library]) {
        const dependency = packages[library];
        checked.push(library);

        if (_.contains(checked, dependency)) {
          result = false;
          break;
        }

        library = dependency;
      }

      return result;
    });
  }
};
