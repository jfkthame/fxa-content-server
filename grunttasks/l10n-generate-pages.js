/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// grunt task to create a copy of each static page for each locale.
// Any `{{ lang }}` tags will be replaced with the language. This is
// used to create a per-locale template with locale specific resources.

module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  var templateSrc;
  var templateDest;

  grunt.registerTask('l10n-generate-pages',
      'Generate localized versions of the static pages', function () {

    // server config is set in the selectconfig task
    var supportedLanguages = grunt.config.get('server.i18n.supportedLanguages');

    templateSrc = grunt.config.get('yeoman.page_template_src');
    templateDest = grunt.config.get('yeoman.page_template_dist');

    supportedLanguages.forEach(generatePagesForLanguage);
  });

  function generatePagesForLanguage(language) {
    var destRoot = path.join(templateDest, language);

    grunt.file.recurse(templateSrc,
                    function (srcPath, rootDir, subDir, fileName) {
      var destPath = path.join(destRoot, (subDir || ''), fileName);
      generatePage(srcPath, destPath, language);
    });
  }

  function generatePage(srcPath, destPath, language) {
    grunt.log.writeln('generating `%s`', destPath);

    grunt.file.copy(srcPath, destPath, {
      process: function (contents, path) {
        // replace any `{{ lang }}` tags with the language.
        return contents.replace(/{{\s*lang\s*}}/g, language);
      }
    });
  }
};
