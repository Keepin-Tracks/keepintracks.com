# Contact Form Deployment Checklist

Use this checklist to ensure your contact form is properly configured and can send emails.

## Pre-Deployment Checklist

### 1. Cloudflare Worker Configuration

- [ ] **Worker name** is set in `wrangler.toml` (should be `keepintracks-website`)
- [ ] **Routes** are configured in `wrangler.toml` for `workers.keepintracks.com`
- [ ] **RESEND_API_KEY** secret is set using `wrangler secret put RESEND_API_KEY`

### 2. DNS Configuration

- [ ] **CNAME record** exists for `workers.keepintracks.com` pointing to your worker
- [ ] DNS record is **proxied** (orange cloud) in Cloudflare
- [ ] DNS has propagated (wait 5-10 minutes after changes)

### 3. Cloudflare Dashboard Setup

- [ ] **Route** is configured in Cloudflare dashboard:
  - Go to Workers & Pages → `keepintracks-website` → Settings → Triggers → Routes
  - Route pattern: `workers.keepintracks.com/*`
- [ ] **Custom domain** is added (if using custom domain feature):
  - Go to Workers & Pages → `keepintracks-website` → Settings → Triggers → Custom Domains
  - Add: `workers.keepintracks.com`

### 4. Resend Configuration

- [ ] **Resend API key** is created and copied
- [ ] **Domain verification** is complete in Resend dashboard
- [ ] **From email** domain (`keepintracks.com`) is verified in Resend

### 5. Code Configuration

- [ ] Contact form JavaScript uses correct URL: `https://workers.keepintracks.com`
- [ ] Form fields match worker expectations:
  - `subject` (required)
  - `email` (required, validated)
  - `message` (required)
- [ ] Worker email template is properly configured

## Deployment Steps

### Step 1: Set Resend API Key Secret

```bash
cd cloudflare-workers
wrangler secret put RESEND_API_KEY
```

When prompted, paste your Resend API key (starts with `re_`).

### Step 2: Deploy the Worker

```bash
wrangler deploy
```

Expected output should show:
- Worker deployed successfully
- URL: `https://workers.keepintracks.com` (or your custom domain)

### Step 3: Verify Worker is Running

Visit `https://workers.keepintracks.com` in your browser.

**Expected response:**
```json
{
  "status": "ok",
  "message": "Contact form API is running",
  ...
}
```

If you see this, the worker is running correctly.

### Step 4: Test the Contact Form

1. **Using the test file:**
   - Open `cloudflare-workers/test-contact.html` in your browser
   - Fill out the form with test data
   - Submit and verify you receive an email at `info@keepintracks.com`

2. **Using your Hugo site:**
   - Navigate to your contact page
   - Fill out and submit the form
   - Check for success/error messages
   - Verify email is received

## Troubleshooting

### Issue: "Email service not configured"

**Solution:**
- Make sure you've set the `RESEND_API_KEY` secret:
  ```bash
  wrangler secret put RESEND_API_KEY
  ```
- Redeploy the worker after setting the secret

### Issue: "Failed to send email"

**Possible causes:**
1. Invalid Resend API key
2. Domain not verified in Resend
3. From email address not authorized

**Solution:**
- Check Resend dashboard for API key status
- Verify your domain in Resend dashboard
- Ensure `admin@keepintracks.com` is authorized to send emails

### Issue: CORS errors in browser console

**Solution:**
- Verify the worker URL is correct: `https://workers.keepintracks.com`
- Check that CORS headers are included in worker responses (they should be)
- Ensure the form is making POST requests, not GET

### Issue: Custom domain not working

**Solution:**
- Verify DNS record exists and is proxied
- Check route configuration in Cloudflare dashboard
- Wait for DNS propagation (can take up to 24 hours, usually 5-10 minutes)
- Verify SSL certificate is active (should be automatic with Cloudflare)

### Issue: Form submits but no email received

**Check:**
1. Check browser console for errors
2. Check Cloudflare Worker logs in dashboard
3. Check Resend dashboard for email delivery status
4. Verify recipient email address (`info@keepintracks.com`) is correct
5. Check spam folder

## Testing Commands

### Test worker locally:
```bash
cd cloudflare-workers
wrangler dev
```

### Check worker logs:
```bash
wrangler tail
```

### List secrets:
```bash
wrangler secret list
```

## Success Indicators

✅ Worker responds to GET requests with status JSON  
✅ Worker accepts POST requests with form data  
✅ Emails are sent successfully via Resend  
✅ Contact form shows success message after submission  
✅ Emails are received at `info@keepintracks.com`  
✅ Reply-to address is set to the form submitter's email  

## Next Steps After Deployment

1. Monitor worker logs for any errors
2. Test the form from different browsers/devices
3. Set up monitoring/alerts for failed email sends
4. Consider adding rate limiting to prevent abuse
5. Add analytics to track form submissions
