# Bijal's Kitchen Catering Website Setup Guide

This guide will help you set up the complete catering website with a content management system. The website is built with Next.js and uses Sanity.io as the CMS for easy menu management.

## Prerequisites

Before starting, make sure you have:
- A computer with internet access
- A Google account (for various signups)
- A GitHub account (free at github.com)
- Node.js installed (download from nodejs.org)

## Step 1: Set Up Sanity.io (Content Management System)

### 1.1 Install Sanity CLI
1. Open Terminal/Command Prompt
2. Run: `npm install -g @sanity/cli`
3. Verify installation: `sanity --version`

### 1.2 Create Sanity Account and Project
1. In Terminal, run: `sanity init`
2. Choose "Create new project"
3. Sign in with Google account
4. Project name: "bijals-kitchen-menu"
5. Dataset: "production" 
6. Choose "Clean project with no predefined schemas"
7. Note down your PROJECT ID (shown in terminal)

### 1.3 Configure Sanity for Menu Management
1. Navigate to your project: `cd bijals-kitchen-menu`
2. Copy the schema files from our project to your Sanity folder
3. Replace the content in `schemas/schema.js` with our menu item schema
4. Start Sanity Studio: `sanity start`
5. Open http://localhost:3333 in your browser
6. This is your local Sanity Studio for managing menu items

### 1.4 Deploy Sanity Studio
1. In Terminal (in your Sanity project folder): `sanity deploy`
2. Choose a studio hostname: `bijals-kitchen-studio`
3. Your Studio will be available at: `https://bijals-kitchen-studio.sanity.studio/`
4. Bookmark this URL - this is where you'll manage your menu

## Step 2: Add Menu Items to Sanity

### 2.1 Using the Sanity Studio Interface
1. Go to your deployed Studio URL
2. Sign in with your Google account
3. Click "Menu Item" to create a new dish
4. Fill out the form:

**Required Fields:**
- **Dish Name**: e.g., "Aloo Gobi"
- **Category**: Choose from dropdown (CURRIES, SWEET, DAL, RICE, OTHERS, APPETIZERS, SNACKS)

**Optional Fields:**
- **Description**: Brief description of the dish
- **Quarter Price**: Price for quarter portion (enter number only, no $ sign)
- **Half Price**: Price for half portion
- **Full Price**: Price for full portion  
- **Special Pricing Info**: For items like "Per Piece", "Per Person", "60 pieces"
- **Dish Image**: Upload a photo (optional)
- **Currently Available**: Check/uncheck to show/hide from menu
- **Sort Order**: Number to control order within category (lower numbers first)

### 2.2 Sample Menu Categories and Items

**CURRIES** (Quarter/Half/Full pricing):
- Aloo Gobi: $25/$55/$110
- Aloo Mutter: $25/$55/$110
- Rajma Masala: $25/$55/$110
- Chole Masala: $25/$55/$110
- Palak Paneer: $35/$70/$140
- Malai Kofta: $40/$80/$160

**SWEET** (Quarter/Half/Full pricing):
- Shrikhand (Kesar): $40/$80/$160
- Shrikhand (Mango): $40/$80/$160
- Kheer: $45/$90/$180
- Gulab Jamun: $40/$80/$160

**DAL** (Quarter/Half/Full pricing):
- Dal Tadka: $30/$60/$120
- Dal Makhni: $30/$60/$120
- Gujarati Dal: $30/$60/$120

**SNACKS** (Special pricing):
- Bread Pakora: $1 (Special Pricing: "Piece")
- Dabeli: $3 (Special Pricing: "Piece")
- Pav Bhaji: $7 (Special Pricing: "Person")
- Pani Poori: $40 (Special Pricing: "60pieces")

## Step 3: Set Up GitHub Repository

### 3.1 Create GitHub Account
1. Go to https://github.com
2. Sign up with your email
3. Verify your email address

### 3.2 Upload Your Project
1. Download GitHub Desktop from https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click "Add an Existing Repository from your Hard Drive"
4. Select your `bijals-kitchen-catering` folder
5. Click "Publish repository"
6. Name it "bijals-kitchen-catering"
7. Keep it public (free)
8. Click "Publish repository"

## Step 4: Deploy to Vercel

### 4.1 Create Vercel Account
1. Go to https://vercel.com/
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### 4.2 Deploy Your Site
1. In Vercel dashboard, click "New Project"
2. Find your "bijals-kitchen-catering" repository
3. Click "Import"
4. Configure project settings:
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. Add Environment Variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET`: production
6. Click "Deploy"

Your website will be live at: `https://your-project-name.vercel.app`

## Step 5: Set Up Automatic Updates

### 5.1 Configure Webhook in Sanity
1. Go to your Sanity project dashboard
2. Click on "API" tab
3. Scroll down to "Webhooks"
4. Click "Create webhook"
5. Name: "Vercel Deploy"
6. URL: `https://api.vercel.com/v1/integrations/deploy/YOUR_VERCEL_HOOK_URL`
   (Get this from Vercel project settings → Git → Deploy Hooks)
7. Dataset: production
8. Trigger on: Create, Update, Delete
9. Click "Save"

Now whenever you update menu items in Sanity, your website will automatically rebuild!

## Step 6: Managing Your Menu (Daily Operations)

### 6.1 To Add New Menu Items:
1. Go to your Sanity Studio URL (bookmark it!)
2. Login with your account
3. Click "Menu Item" → "Create"
4. Fill in the details:
   - Name: "New Dish Name"
   - Category: Choose from dropdown
   - Prices: Enter quarter, half, full prices
   - Description: Brief description
   - Image: Upload photo (optional)
5. Click "Publish"
6. Your website will update automatically in 1-2 minutes!

### 6.2 To Edit Existing Items:
1. Go to Sanity Studio
2. Find the item you want to edit
3. Make changes
4. Click "Publish"
5. Changes appear on website automatically

### 6.3 To Delete Items:
1. Go to Sanity Studio
2. Find the item
3. Click the three dots menu
4. Select "Delete"
5. Confirm deletion

## Step 7: Custom Domain (Optional)

### 7.1 If you want a custom domain like "bijalskitchen.com":
1. Buy domain from Namecheap, GoDaddy, or Google Domains
2. In Vercel project settings, go to "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to update DNS settings
5. Wait for DNS propagation (24-48 hours)

## Troubleshooting

### Common Issues:

**Website shows "Menu items will appear here":**
- Make sure you've added menu items in Sanity Studio
- Check that your Sanity project ID is correct in Vercel environment variables
- Wait a few minutes for the build to complete

**Sanity Studio won't load:**
- Clear your browser cache
- Try incognito/private browsing mode
- Check if you're signed in to the correct account

**Website won't deploy:**
- Check that your GitHub repository is public
- Verify all environment variables are set in Vercel
- Look at the build logs in Vercel for specific errors

**Menu changes don't appear:**
- Wait 2-3 minutes for automatic rebuild
- Check Vercel deployments tab to see if rebuild triggered
- Verify webhook is configured correctly in Sanity

## Support Contacts

If you need help:
1. Check Vercel documentation: https://vercel.com/docs
2. Check Sanity documentation: https://www.sanity.io/docs
3. Check Next.js documentation: https://nextjs.org/docs

## Summary of URLs to Bookmark:

1. **Your Website**: `https://your-project-name.vercel.app`
2. **Sanity Studio**: `https://your-project-id.sanity.studio/`
3. **Vercel Dashboard**: `https://vercel.com/dashboard`
4. **GitHub Repository**: `https://github.com/yourusername/bijals-kitchen-catering`

## Monthly Costs:
- **Sanity**: Free (up to 3 users, 10k documents, 5GB assets)
- **Vercel**: Free (100GB bandwidth, unlimited sites)  
- **GitHub**: Free (public repositories)
- **Total**: $0/month

Your catering website is now fully set up with professional content management capabilities!