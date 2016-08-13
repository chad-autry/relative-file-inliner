# relative-file-inliner
Processes a template and inlines files

### Status
[![Build Status](https://travis-ci.org/chad-autry/relative-file-inliner.svg?branch=master)](https://travis-ci.org/chad-autry/relative-file-inliner)

* Install from npm
* Pipe in input template
* Pipe to output file
* Include {{<relativePathToFile>}} to inline
    * Should be only element on the line
* Execute from directory the relative paths are in relation to