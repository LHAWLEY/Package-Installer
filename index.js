// Input: Array of strings defining dependencies
// Output: Comma separated list of package names in the order of install

module.exports = {
  /**
   * Parses a list of libraries and their dependencies into an object.  Each entry in the list of libraries
   * is a string of the form "Library: Dependency".
   * @param {array} libraries - The list of libraries.
  **/
  parse(libraries = []) {
    const dependencies = {};

    for (let i = 0; i < libraries.length; i++) {
      const library = libraries[i];
      const [key, value] = library.split(': ');

      dependencies[key] = value;
    }

    return dependencies;
  }
};
