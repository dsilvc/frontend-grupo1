FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

COPY package.json ./
RUN  npm install 
RUN npm install -D @swc/cli @swc/core
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run dev
EXPOSE 3000

ENV PORT 3000


CMD ["npm", "start"]