#!/bin/sh

echo '######################################'
echo '# BEFORE INSTALL #'
echo '# - START - #'
echo '######################################'

echo '---- Installing libspotify ----'
cd /tmp
wget https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Linux-x86_64-release.tar.gz
tar zxfv libspotify-12.1.51-Linux-x86_64-release.tar.gz
cd libspotify-0.0.8-linux6-x86_64/
sudo make install prefix=/usr/local
sudo ldconfig

echo '---- Installing node-jscoverage ----'
cd /tmp
git clone git://github.com/visionmedia/node-jscoverage.git
cd node-jscoverage
sudo ./configure
sudo make
sudo make install

echo '######################################'
echo '# BEFORE INSTALL #'
echo '# - FINISH - #'
echo '######################################'