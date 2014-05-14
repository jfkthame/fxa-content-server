/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// task to take care of generating connect-fonts CSS and copying font files.

// Locale specific font css are created @app/styles/localized/{{ locale }}.css
// fonts care copied from npm packages into app/fonts

module.exports = function (grunt) {
  'use strict';

  var fontPacks = [
    'connect-fonts-clearsans',
    'connect-fonts-firasans'
  ];

  var fontNamesNeeded = [
    'clearsans-regular',
    'firasans-regular',
    'firasans-light'
  ];

  grunt.config('connect_fonts', {
    dist: {
      options: {
        fontPacks: fontPacks,
        fontNames: fontNamesNeeded,
        languages: [],
        dest: '<%= yeoman.app %>/styles/localized'
      }
    }
  });

  grunt.task.registerTask('configure_connect_fonts', 'configure connect fonts based on the currently selected config', function () {
    // server config is not available on startup and ie set in the
    // selectconfig task. configure_connect_fonts should be run after
    // selectconfig and before connect_fonts.
    grunt.config.set('connect_fonts.dist.options.languages',
          [].concat(grunt.config.get('server.i18n.supportedLanguages')));
  });

  grunt.config('connect_fonts_copy', {
    dist: {
      options: {
        fontPacks: fontPacks,
        dest: '<%= yeoman.app %>/fonts'
      }
    }
  });
};
