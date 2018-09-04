#!/bin/bash

ETH_PRIVATE_KEY=${ETH_PRIVATE_KEY:-"0x"}
VANITYGEN_AGS=${VANITYGEN_AGS:-"-d 2"}
GAS_PRICE=${GAS_PRICE:-"2e9"}
RUNTIME=${RUNTIME:-nvidia}

sed -i -e "s/\.\.\/vanitygen-plus/\/opt\/vanitygen-plus/g" /opt/1AddressMiner/index.js

sed -i -e "s/\*\*\*/${ETH_PRIVATE_KEY}/g" /opt/1AddressMiner/index.js
sed -i -e "s/.\/oclvanitygen \-d 2/\/opt\/vanitygen-plus\/oclvanitygen\.${RUNTIME} ${VANITYGEN_AGS}/g" /opt/1AddressMiner/index.js
sed -i -e "s/2e9/${GAS_PRICE}/g" /opt/1AddressMiner/index.js

cd /opt/1AddressMiner
node index.js
