FROM node:24-alpine

WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY --chown=node:node . .

EXPOSE 4321
CMD ["npm", "run", "dev"]
