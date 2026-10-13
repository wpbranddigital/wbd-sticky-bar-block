# Sticky Bar Block

Create sticky announcement, promotion, and CTA bars directly in the WordPress Block Editor.

- **Block:** `sticky-bar-block/sticky-bar` (category: Design)
- **Requires:** WordPress 6.6+, PHP 7.4+
- **License:** GPL-2.0-or-later

## Development

```bash
npm install
npm run start       # watch mode
npm run build       # production build into /build
npm run lint:js
npm run lint:css
npm run plugin-zip  # creates wbd-sticky-bar-block.zip for WordPress.org
```

Source lives in `src/sticky-bar/`; the plugin loads the compiled block from `build/sticky-bar/`.

## Structure

```
wbd-sticky-bar-block/
├── wbd-sticky-bar-block.php Plugin bootstrap, registers the block from build/
├── includes/
│   ├── helpers.php          Attribute validation (colors, sizes, enums, ints)
│   └── render.php           sticky_bar_block_render(): escaped frontend markup
├── src/sticky-bar/
│   ├── block.json           Metadata, attributes, supports, assets
│   ├── index.js             Registration
│   ├── edit.js              Editor UI (toolbar + sidebar panels)
│   ├── save.js              Saves only InnerBlocks content
│   ├── render.php           Template that calls sticky_bar_block_render()
│   ├── variations.js        Announcement / Promotion / CTA / Free Shipping presets
│   ├── view.js              Close button + dismissal memory (vanilla JS)
│   ├── style.scss           Frontend + editor styles
│   └── editor.scss          Editor-only styles
├── languages/               Translation template
├── readme.txt               WordPress.org readme
└── uninstall.php
```

## Architecture: hybrid block

The block **saves only its inner content** (Paragraph/Heading blocks) and renders the wrapper, CTA and close button in PHP.

Why not fully static?

1. **Security & kses:** the bar needs inline CSS custom properties (offset, z-index, gap) and CTA styles. Users without `unfiltered_html` (Authors, Contributors) have saved markup filtered by kses, which can strip these and cause "block contains unexpected content" errors. Rendering them at runtime avoids that, and every value is validated and escaped server-side (`esc_url`, `esc_attr`, allow-listed colors/sizes, clamped numbers).
2. **No deprecations:** the bar markup can be improved in future versions without block validation errors or `deprecated` migrations.
3. **Still simple:** there is no custom REST API, no editor `ServerSideRender`; the editor uses a normal React preview, and the content remains ordinary blocks.

Why not fully dynamic? Keeping the message as real InnerBlocks gives native Gutenberg editing (formatting, links, emoji) with no custom rich-text storage.

## Frontend behavior

- `position: fixed` bar; top bars add `--wp-admin--admin-bar--height` when the admin toolbar is visible (disabled below 600px where the toolbar scrolls away).
- Responsive visibility with CSS media queries only (mobile < 600px, tablet 600–1024px, desktop > 1024px).
- `view.js` reveals the close button, handles click/Escape dismissal and optional `sessionStorage`/`localStorage` memory. The storage key includes a hash of the bar text so edited bars reappear.
- Animations are CSS keyframes, disabled under `prefers-reduced-motion`.
