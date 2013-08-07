#!/bin/sh

echo '######################################'
echo '# BEFORE INSTALL #'
echo '# - START - #'
echo '######################################'

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