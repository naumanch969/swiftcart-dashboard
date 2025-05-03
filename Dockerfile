# Use Node 20 to satisfy semantic-release and related packages
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only what's needed for npm install
COPY package*.json ./

# Also copy the prisma schema before install (needed for postinstall script)
COPY prisma ./prisma

# Now install dependencies
RUN npm install

# Then copy everything else
COPY . .

# Run Prisma generate (after schema is available)
RUN npx prisma generate

# Build the project (for Next.js or other bundlers)
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
