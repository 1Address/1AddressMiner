# 1AddressMiner for Docker

## Common commands

### Build
``docker-compose build``

### Start
``docker-compose up -d``

### Show logs 
``docker-compose lgos -f``

### Stop & kill
``docker-compose stop or docker-compose kill``

## Requirements

* docker (https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* docker-compose (pip install docker-compose)
* NVIDIA: nvidia-dorcker (https://github.com/NVIDIA/nvidia-docker)
* AMD: Rocm driver or latest pro driver (https://rocm.github.io/ROCmInstall.html)
