# 🚀 Deployment Guide

## Quick Deploy to Vercel (3 Steps)

### 1️⃣ Install Vercel CLI

```bash
npm install -g vercel
```

### 2️⃣ Deploy

From the project directory:

```bash
cd /Users/arjun/feed-the-doodles
vercel
```

When prompted:
- **Set up and deploy?** Yes
- **Which scope?** Choose your account
- **Link to existing project?** No
- **Project name?** Press Enter (or customize)
- **Directory?** Press Enter
- **Override settings?** No

### 3️⃣ Get Your Link

After deployment completes, you'll see:

```
✅  Production: https://feed-the-doodles-xyz123.vercel.app
```

**Your game URL will be:**
```
https://feed-the-doodles-xyz123.vercel.app/aayushi-game-62492
```

☝️ Share ONLY this link with Aayushi! It's private and won't appear in search engines.

---

## Alternative: Deploy via Vercel Dashboard

1. **Create GitHub repo** (can be private):
   ```bash
   cd /Users/arjun/feed-the-doodles
   git init
   git add .
   git commit -m "Initial commit: Feed the Doodle Animals game"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/feed-the-doodles.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repo
   - Click Deploy

3. **Done!** Your game will be live at the provided URL

---

## 🔒 Privacy Checklist

Before sharing the link, verify:

- ✅ URL contains `/aayushi-game-62492` path
- ✅ No analytics or tracking enabled
- ✅ Project is not indexed by search engines
- ✅ Only people with the direct link can access it

---

## 🧪 Test Locally First

Before deploying, test the game:

```bash
npm run dev
```

Open: http://localhost:3000/aayushi-game-62492

Make sure everything works:
- ✅ Animals appear correctly
- ✅ Drag and drop food works
- ✅ Animals get chubby when fed
- ✅ Burp animation appears when full
- ✅ Bird flies in with message
- ✅ Reset button appears and works
- ✅ Poop animation on reset

---

## 🎨 Customization (Optional)

### Change the Message

Edit `components/MessageNote.tsx`:

```tsx
<p className="text-lg">
  Your custom message here
</p>
```

### Change Reminder Popups

Edit `components/ReminderPopup.tsx`:

```tsx
const reminders = [
  "Your custom reminder 1",
  "Your custom reminder 2",
  // Add more...
];
```

### Change the Secret Route

1. Rename folder: `app/aayushi-game-62492` → `app/YOUR-NEW-ROUTE`
2. Update README with new URL path

---

## ⚡ Production Build (Optional Test)

To test the production build locally:

```bash
npm run build
npm start
```

---

## 🆘 Troubleshooting

### Build Errors

```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### Vercel CLI Issues

```bash
# Re-login to Vercel
vercel logout
vercel login
```

### Preview Before Production

```bash
# Deploy to preview URL first
vercel --prod=false
```

---

Made with 💖 for Aayushi

