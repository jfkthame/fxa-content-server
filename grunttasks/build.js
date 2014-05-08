/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('build', [
    'lint',
    'clean:dist',
    'l10n-generate-pages',
    // l10n-generate-pages needs to be run before useminPrepare to seed
    // the list of resources to minimize. Generated pages are placed into
    // `server/templates/pages/dist` where they will be post-processed
    // with requirejs and usemin
    'useminPrepare',
    'selectconfig:dist',
    'l10n-create-json',
    'l10n-generate-tos-pp:dist',
    'requirejs',
    'css',
    'connect_fonts',
    'concurrent:dist',
    'concat',
    'cssmin',
    'static-pages',
    'copy:dist',
    // uglify overwrites the files in the dist directory.
    'uglify',
    // modernizr must come after concat, copy and uglify so the
    // custom version overwrites all default versions.
    'modernizr:dist',
    'rev',
    'usemin'
  ]);
};
