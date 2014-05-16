/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.config('copy', {
    strings: {
      files: [{
        expand: true,
        cwd: '<%= yeoman.strings_src %>',
        dest: '<%= yeoman.strings_dist %>',
        src: [
          '**/*.po'
        ]
      }]
    },
    dist: {
      files: [
        {
          // static resources.
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            // modernizr is left unbundled and is generated in the
            // modernizr task, no need to copy it over.
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
            'fonts/**/*.{woff,eot,ttf,svg,ofl}',
            'i18n/{,*/}{,*/}*.*'
          ]
        }
      ]
    },
    styles: {
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>/styles',
      dest: '<%= yeoman.tmp %>/styles/',
      src: '{,*/}*.css'
    }
  });
};
