# Deployment Guide - Smart Minds AI

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended - Zero Config)

**Step 1: Create GitHub Repository First**
```bash
# Option A: Using GitHub CLI (if authenticated)
gh repo create Smart-Minds-Interactive-Hub-AI --public --description "AI-powered interactive learning platform"

# Option B: Create manually at github.com/new
# Repository name: Smart-Minds-Interactive-Hub-AI
# Description: AI-powered interactive learning platform
# Public repository

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/Smart-Minds-Interactive-Hub-AI.git
git branch -M main
git push -u origin main
```

**Step 2: Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# For production deployment
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist` (⚠️ Important: NOT "build")
- Install Command: `npm install`
- Framework Preset: `Other` (don't use React preset)

**Note:** We include a `vercel.json` file to ensure correct configuration.

### 2. Netlify

**Drag & Drop:**
1. Run `npm run build`
2. Drag `dist` folder to Netlify dashboard

**Git Integration:**
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Deploy
npm run build
npm run deploy
```

### 4. Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### 5. Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

**Deploy with Docker:**
```bash
# Build image
docker build -t smart-minds-ai .

# Run container
docker run -p 3000:80 smart-minds-ai
```

## 🌐 Environment Variables for Production

Create `.env.production`:
```env
VITE_APP_NAME="Smart Minds AI"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPERIMENTS=false
VITE_API_BASE_URL=https://your-api-domain.com
```

## 📋 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] Performance optimizations applied
- [ ] Security headers configured
- [ ] Analytics/monitoring setup
- [ ] Error tracking configured
- [ ] Domain/SSL configured

## 🔧 Performance Optimizations

### 1. Code Splitting
```typescript
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Route-based splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
```

### 2. Image Optimization
```bash
# Install image optimization tools
npm install -D imagemin imagemin-webp
```

### 3. Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze
```

## 🔒 Security Configuration

### Content Security Policy (CSP)
Add to your hosting platform:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.puter.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://js.puter.com;
```

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 📊 Monitoring & Analytics

### Error Tracking with Sentry
```bash
npm install @sentry/react

# Add to main.tsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE
})
```

### Performance Monitoring
```typescript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run type-check
    
    - name: Build
      run: npm run build
      env:
        VITE_ENABLE_ANALYTICS: true
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Deployment Issues

**1. Vercel "404: DEPLOYMENT_NOT_FOUND" Error**
This happens when:
- Repository URL in one-click deploy button doesn't exist
- Trying to access a deleted deployment
- Wrong repository permissions

**Solution:**
```bash
# First, create and push to GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/Smart-Minds-Interactive-Hub-AI.git
git branch -M main  
git push -u origin main

# Then deploy manually with Vercel CLI
npx vercel
```

**2. Build Fails**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

**2. Routing Issues (404 on refresh)**
- Configure SPA fallback to `index.html`
- For Netlify: Add `_redirects` file with `/* /index.html 200`
- For Apache: Configure `.htaccess`

**3. Environment Variables Not Working**
- Ensure variables start with `VITE_`
- Check variable names in hosting platform
- Verify build process includes env vars

**4. Large Bundle Size**
```bash
# Analyze bundle
npx vite-bundle-analyzer dist

# Enable tree shaking
# Check for duplicate dependencies
npm ls --depth=0
```

## 📱 Mobile Optimization

### PWA Configuration
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

## 🌍 CDN Configuration

### Cloudflare Setup
1. Add domain to Cloudflare
2. Configure DNS
3. Enable caching rules:
   - Static assets: Cache for 1 year
   - HTML: Cache for 1 hour
   - API: No cache

### AWS CloudFront
```bash
# Create distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

## 🔄 Updates & Maintenance

### Automated Dependency Updates
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Health Checks
```bash
# Add health check endpoint
# Monitor uptime and performance
# Set up alerts for downtime
```

## 📈 Scaling Considerations

### Performance Metrics to Monitor
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

### Load Testing
```bash
# Install k6
brew install k6

# Create load test script
k6 run load-test.js
```

This deployment guide ensures your Smart Minds AI application is production-ready and highly scalable!
