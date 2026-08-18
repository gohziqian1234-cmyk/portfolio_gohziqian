# Back To Portfolio Snippet For Game Repos

Add this to each game repo's `index.html` so visitors can return to Ziqian's portfolio even when they open the game directly.

```html
<!-- ADD: actual portfolio URL once deployed, e.g. https://ziqian-portfolio.vercel.app/ -->
<a
  href="https://[ZIQIAN-PORTFOLIO-DOMAIN]/"
  target="_top"
  class="back-to-portfolio"
  title="Back to Ziqian's Portfolio"
>
  ← Portfolio
</a>
```

```css
.back-to-portfolio {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 9999;
  padding: 8px 16px;
  background: rgba(13, 13, 13, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.7;
}

.back-to-portfolio:hover {
  opacity: 1;
  background: rgba(61, 90, 254, 0.85);
  transform: translateY(-2px);
}
```

For Piano Tiles, keep the link top-left unless it overlaps the HUD or canvas controls. For Erebus-7, move it to bottom-left if the horror UI uses the top-left corner.
