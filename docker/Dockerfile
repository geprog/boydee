# This file is used for production-ready deployments

FROM node:lts-alpine

WORKDIR /app
ENV NODE_ENV=production

# copy backend code
COPY app/backend/dist/index.js ./
COPY app/backend/config/ ./config/

# copy frontend code (and backend public files)
COPY app/backend/public app/frontend/dist ./public/

RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "index.js"]
