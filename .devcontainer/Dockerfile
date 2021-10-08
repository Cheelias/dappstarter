# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.194.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="14"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"

# RUN wget https://dist.ipfs.io/go-ipfs/v0.8.0/go-ipfs_v0.8.0_linux-amd64.tar.gz \
#   && tar -xvzf go-ipfs_v0.8.0_linux-amd64.tar.gz \ 
#   && cd go-ipfs \
#   && sudo bash install.sh

# RUN wget https://dist.ipfs.io/ipfs-cluster-service/v0.13.3/ipfs-cluster-service_v0.13.3_linux-amd64.tar.gz \
#   && sudo tar -xf ipfs-cluster-service_v0.13.3_linux-amd64.tar.gz ipfs-cluster-service/ipfs-cluster-service \ 
#   && sudo mv ipfs-cluster-service/ipfs-cluster-service  /usr/local/bin
 
# RUN sudo -u node npm install -g node-pre-gyp @ceramicnetwork/cli

# run the installation script  
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh 

# start zsh
CMD [ "zsh" ]
RUN curl -fsSL https://starship.rs/install.sh | bash -s -- -y
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh)" -- \
  -p git \
  -p ssh-agent \
  -p https://github.com/zsh-users/zsh-autosuggestions \
  -p https://github.com/zsh-users/zsh-completions
  
RUN echo 'eval "$(starship init zsh)"' >> /home/node/.zshrc
