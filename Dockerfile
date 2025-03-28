# Imagen base con Node.js (x86_64)
FROM --platform=linux/amd64 node:22-bullseye

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
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip aws

# Instalar AWS SAM CLI
RUN pip3 install aws-sam-cli

# Habilitar Yarn con Corepack
RUN corepack enable && corepack prepare yarn@4 --activate

# Otras herramientas necesarias
RUN pip3 install awscli-local

# Establecer directorio de trabajo
WORKDIR /workspaces/app

# Comando por defecto
CMD [ "bash" ]
