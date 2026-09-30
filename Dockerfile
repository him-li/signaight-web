FROM node:20-alpine AS base
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json* ./
RUN yarn install --frozen-lockfile


FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"
# Define ARG
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost/api/v1
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_LAYOUT_TYPE
ARG NEXT_PUBLIC_REDIS_URI
ARG JINA_KUBERNETES_MODE
ARG JINA_KUBERNETES_HOSTS_SUFFIX

# Set ENV variables
ENV NEXT_PUBLIC_MAPBOX_TOKEN $NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_LAYOUT_TYPE $NEXT_PUBLIC_LAYOUT_TYPE
ENV NEXT_PUBLIC_API_BASE_URL $NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_REDIS_URI $NEXT_PUBLIC_REDIS_URI
ENV JINA_KUBERNETES_MODE=$JINA_KUBERNETES_MODE
ENV JINA_KUBERNETES_HOSTS_SUFFIX=$JINA_KUBERNETES_HOSTS_SUFFIX

RUN yarn build

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD [ "node", "server.js" ]
