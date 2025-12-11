# Cloudflare Worker Setup

## Custom Domain: workers.keepintracks.com

This worker is configured to use the custom domain `workers.keepintracks.com`.

## Setting up the Custom Domain

### Step 1: Add Custom Domain in Cloudflare Dashboard

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Select your worker: `keepintracks-website`
4. Go to **Settings** > **Triggers**
5. Scroll down to **Custom Domains**
6. Click **Add Custom Domain**
7. Enter: `workers.keepintracks.com`
8. Click **Add Custom Domain**

Cloudflare will automatically:
- Create the necessary DNS records
- Provision an SSL certificate
- Configure routing

### Step 2: Verify DNS (if needed)

If DNS wasn't automatically configured, manually add a CNAME record:

1. Go to your Cloudflare dashboard
2. Select the `keepintracks.com` domain
3. Navigate to **DNS** > **Records**
4. Add a new **CNAME** record:
   - **Name**: `workers`
   - **Target**: `keepintracks-website.<your-account-subdomain>.workers.dev`
   - **Proxy status**: Proxied (orange cloud)
   - **TTL**: Auto

### Step 3: Verify Domain

After configuring the custom domain, wait a few minutes for DNS propagation and SSL provisioning, then:
- Visit: `https://workers.keepintracks.com`
- You should see a JSON response indicating the worker is running

## Setting up RESEND_API_KEY

To configure the Resend API key for your Cloudflare Worker, you need to set it as a secret.

### For Production (Deployed Worker)

Run this command in the `cloudflare-workers` directory:

```bash
wrangler secret put RESEND_API_KEY
```

When prompted, paste your Resend API key (starts with `re_`).

### For Local Development

Create a `.dev.vars` file in the `cloudflare-workers` directory:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

**Note:** The `.dev.vars` file is already in `.gitignore`, so it won't be committed to git.

### Getting Your Resend API Key

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key (it starts with `re_`)

## Deployment

### Deploy to Production

1. **Set the API key secret** (if not already done):
   ```bash
   wrangler secret put RESEND_API_KEY
   ```

2. **Deploy the worker:**
   ```bash
   wrangler deploy
   ```

3. **Verify deployment:**
   - Visit: `https://workers.keepintracks.com`
   - You should see a JSON response indicating the worker is running

### Test Locally

```bash
wrangler dev
```

This will start a local development server. The worker will be available at a local URL (usually `http://localhost:8787`).

## Testing

### Test the Contact Form

1. **Using the test file:**
   - Open `test-contact.html` in your browser
   - Fill out the form and submit
   - Check that the email is received at `info@keepintracks.com`

2. **Using your Hugo site:**
   - Navigate to the contact page on your website
   - Fill out and submit the contact form
   - The form will send requests to `https://workers.keepintracks.com`

### Verify Worker Status

Visit `https://workers.keepintracks.com` in your browser. You should see:
```json
{
  "status": "ok",
  "message": "Contact form API is running",
  "endpoint": "POST to this URL with { subject, email, message }",
  ...
}
```

## Troubleshooting

- **"Email service not configured"**: Make sure you've set the `RESEND_API_KEY` secret using `wrangler secret put RESEND_API_KEY`
- **"Failed to send email"**: Check that your Resend API key is valid and your domain is verified in Resend
- **CORS errors**: The worker includes CORS headers, but make sure your frontend is making requests to `https://workers.keepintracks.com`
- **Custom domain not working**: 
  - Verify DNS record is correct and proxied
  - Check that the route is configured in Cloudflare dashboard
  - Wait a few minutes for DNS propagation
  - Verify SSL certificate is active (should be automatic with Cloudflare)
