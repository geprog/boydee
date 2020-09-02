FROM node:12.14

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# The node image comes with a base non-root 'node' user which this Dockerfile
# gives sudo access. However, for Linux, this user's GID/UID must match your local
# user UID/GID to avoid permission issues with bind mounts. Update USER_UID / USER_GID
# if yours is not 1000. See https://aka.ms/vscode-remote/containers/non-root-user.
ARG USER_UID=1000
ARG USER_GID=$USER_UI

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y upgrade \
    #
    # add git and needed tools
    && apt-get -y install \
    # uncomment if gcc needed for native code
        # build-dependencies \
        # build-base \
        # gcc \
        # wget \
        openssh-client \
        ca-certificates \
        git \
        bash \
        bash-completion \
        shellcheck \
    #
    # add dependencies for cypress (https://docs.cypress.io/guides/guides/continuous-integration.html#Dependencies)
    && apt-get -y install \
        libgtk2.0-0 \
        libgtk-3-0 \
        libnotify-dev \
        libgconf-2-4 \
        libnss3 \
        libxss1 \
        libasound2 \
        libxtst6 \
        xauth \
        xvfb \
    #
    # cleanup
    && rm -rf /var/lib/apt/lists/* \
    && apt-get autoremove -y \
    && apt-get clean -y

 # enable bash completion
 RUN echo "if [ -f /etc/bash_completion ]; \n then . /etc/bash_completion \nfi" >> ~/.bashrc

 # Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=
