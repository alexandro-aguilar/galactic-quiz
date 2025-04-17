# Imagen base con Node.js (x86_64)
FROM --platform=linux/arm64 node:22-bullseye

ARG GIT_EMAIL
ARG GIT_USERNAME

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    socat \
    unzip \
    curl \
    python3 \
    python3-pip \
    git \
    zip \
    && rm -rf /var/lib/apt/lists/*

# Instalar AWS CLI v2 para x86_64
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip aws

# Instalar AWS SAM CLI
RUN pip3 install aws-sam-cli

# Habilitar Yarn con Corepack
RUN corepack enable && corepack prepare yarn@4.7.0 --activate

# Otras herramientas necesarias
RUN pip3 install awscli-local

ENV GIT_EMAIL=${GIT_EMAIL}
ENV GIT_USERNAME=${GIT_USERNAME}

RUN git config --global user.email '$GIT_EMAIL'
RUN git config --global user.name '$GIT_USERNAME'

# Establecer directorio de trabajo
WORKDIR /workspaces/app




# Comando por defecto
CMD [ "bash" ]
