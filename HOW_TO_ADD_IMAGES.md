# 🎨 How to Add Your Own Animal Images

If you want to use **real doodle artwork** instead of SVG, follow these steps:

## 📥 Step 1: Get Your Images

### Where to Find Doodle Assets:
- **Itch.io**: https://itch.io/game-assets/free/tag-animals
- **OpenGameArt**: https://opengameart.org/art-search?keys=animal
- **Kenney.nl**: https://kenney.nl/assets (search "animal")
- **Create Your Own**: Use Procreate, Figma, or any drawing app

### Image Requirements:
- Format: PNG with transparent background
- Size: ~200-300px width recommended
- Style: Side-view, cartoon/doodle style
- You need: cat, bunny, frog, bear (or any 4 animals)

## 📁 Step 2: Add Images to Project

1. Create folder:
```bash
mkdir -p /Users/arjun/feed-the-doodles/public/animals
```

2. Add your images:
```
/public/animals/cat.png
/public/animals/bunny.png
/public/animals/frog.png
/public/animals/bear.png
```

## ✏️ Step 3: Update Animal Component

Replace the SVG code in `components/Animal.tsx` with this:

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// ... keep all the interfaces and props ...

export default function Animal({
  type,
  fullness,
  hasBurped,
  hasPooped,
  onFeed,
  isDraggingFood,
}: AnimalProps) {
  const [showBurp, setShowBurp] = useState(false);
  const [showPoop, setShowPoop] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isEating, setIsEating] = useState(false);

  // ... keep all the useEffect hooks ...

  const scale = 1 + (fullness / 100) * 0.8; // Grows up to 1.8x size

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className="relative flex flex-col items-center"
      whileHover={fullness < 100 && isDraggingFood ? { scale: 1.05 } : {}}
    >
      {/* Animal Image */}
      <motion.div
        animate={{
          scale: isEating ? [1, 1.1, scale] : scale,
          rotate: isEating ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative w-32 h-32"
      >
        <Image
          src={`/animals/${type}.png`}
          alt={type}
          width={128}
          height={128}
          className="object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Keep all the other elements: fullness bar, burp, thank you, poop */}
    </motion.div>
  );
}
```

## 🚀 Step 4: Deploy

```bash
cd /Users/arjun/feed-the-doodles
git add .
git commit -m "Add custom animal images"
git push
vercel --prod
```

---

## 🍪 Bonus: Custom Food Images

Same process for food items:

1. Add to `/public/food/`:
   - cookie.png
   - strawberry.png
   - cupcake.png

2. Update `components/FoodItem.tsx`:

```tsx
<Image
  src={`/food/${type}.png`}
  alt={type}
  width={64}
  height={64}
/>
```

---

## 🎨 Creating Your Own in Figma

1. Go to https://figma.com
2. Create 200x200px frame
3. Draw your animal (side view)
4. Export as PNG (2x for retina)
5. Make background transparent
6. Download and add to `/public/animals/`

---

## 🤖 Using AI to Generate

### DALL-E Prompts:
```
"cute doodle style cat, side view, simple cartoon, black outline, transparent background, pastel colors"
"cute doodle style bunny, side view, game asset, simple cartoon"
"cute doodle style frog, side view, kawaii, transparent background"
"cute doodle style bear, side view, simple cartoon character"
```

### Remove Background:
- https://remove.bg (free)
- Upload AI-generated image
- Download PNG with transparent background

---

## ✅ Quick Test

After adding images, test locally:

```bash
npm run dev
# Visit: http://localhost:3000/aayushi-game-62492
```

If images don't show, check:
1. Files are in `/public/animals/`
2. Names match exactly: `cat.png`, `bunny.png`, etc.
3. Run `npm run build` to check for errors

---

Need help? Let me know what images you found and I'll help integrate them!

