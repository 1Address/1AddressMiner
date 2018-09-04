FROM nvidia/cuda:9.2-cudnn7-devel-ubuntu16.04

RUN apt-get update && \
    apt-get -y install curl gcc g++ gdb cmake git make python3 python3-dev python3-pip 

ARG AMD_DRIVER=amdgpu-pro-18.30-641594.tar.xz
ARG AMD_DRIVER_URL=https://www2.ati.com/drivers/linux/ubuntu
RUN mkdir -p /tmp/opencl-driver-amd
WORKDIR /tmp/opencl-driver-amd
RUN echo AMD_DRIVER is $AMD_DRIVER; \
    curl --referer $AMD_DRIVER_URL -O $AMD_DRIVER_URL/$AMD_DRIVER; \
    tar -Jxvf $AMD_DRIVER; \
    cd amdgpu-pro-*; \
    ./amdgpu-install; \
    apt-get install opencl-amdgpu-pro -y; \
    rm -rf /tmp/opencl-driver-amd;

WORKDIR /tmp

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends opencl-headers libssl-dev libpcre3-dev ocl-icd-dev ocl-icd-dbg opencl-headers libpcre3-dev ocl-icd-dev ocl-icd-dbg libcurl4-gnutls-dev locate && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y --no-install-recommends \
        ocl-icd-libopencl1 \
        ocl-icd-opencl-dev  \
        clinfo && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/OpenCL/vendors && \
    echo "libnvidia-opencl.so.1" > /etc/OpenCL/vendors/nvidia.icd

RUN git clone https://github.com/exploitagency/vanitygen-plus.git && \
    cd vanitygen-plus && \
    make -j8 all LIBRARY_PATH="${LIBRARY_PATH}:/opt/amdgpu-pro/lib/x86_64-linux-gnu" && \
    mkdir -p /opt/vanitygen-plus && \
    cp oclvanitygen /opt/vanitygen-plus/oclvanitygen.amd && \
    make clean && make -j8 all LIBRARY_PATH="${LIBRARY_PATH}:/usr/local/cuda-9.2/targets/x86_64-linux/lib" && \
    cp oclvanitygen /opt/vanitygen-plus/oclvanitygen.nvidia && \
    cp *.cl /opt/vanitygen-plus

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs build-essential && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get -y install yarn && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt

RUN git clone https://github.com/1Address/1AddressMiner.git && \
    cd 1AddressMiner && \
    rm -rf package-lock.json && \
    yarn 

ADD run.sh /run.sh

CMD ["/run.sh"]
