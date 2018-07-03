# a9cdn-uploader

a simple cli to upload cdn files

## install

``` bash
# install global as system command
sudo npm -g install a9cdn-uploader

# show the help
a9cdn-uploader -h
```

## how it works

scan the path and upload it's files 
using the relative path as URI

## example

``` bash
# upload `webapp/asset`'s files to cdn
a9cdn-uploader upload ../cdn.js  webapp/asset

# check the `webapp/asset`'s files with cdn
a9cdn-uploader check ../cdn.js  webapp/asset
```