# Ask Dots Island Demo — Design QA

## Visual inputs

- Source A: `/var/folders/c0/pt636m8d4t358yfwrvd0983h0000gn/T/codex-clipboard-91effdd6-5896-49ea-8e21-6f37f0906880.png`（2670 × 1550）
- Source B: `/var/folders/c0/pt636m8d4t358yfwrvd0983h0000gn/T/codex-clipboard-52a97ab3-f642-4b58-9ebf-0988060ab84f.png`（2622 × 1540）
- Prototype: `/private/tmp/ask-dots-island-final.png`（浏览器截图；内部手机画布 393 × 852）
- Expanded state: `/private/tmp/ask-dots-island-expanded.png`
- Full comparison: `/private/tmp/ask-dots-design-qa-comparison.png`
- Focused comparison: `/private/tmp/ask-dots-design-qa-focused.png`

## Comparison setup

- State: initial feed for content comparison; scrolled expanded state for interaction review.
- Density normalization: source screenshots keep their original aspect ratio; the prototype is cropped to its exact 393 × 852 phone canvas.
- Scope: the supplied screenshots are desktop search-result content references, not a mobile shell reference. The comparison therefore covers card imagery, content variety, two-column density, titles and metadata. Header, tabs, Ask Dots island and iOS chrome continue to follow the existing Figma/specification.

## Required fidelity surfaces

1. Two-column image feed with varied cover ratios.
2. Covers and titles grounded in the two supplied search-result screenshots.
3. Unique visible items without repeated card id, title or cover.
4. Randomized order and randomized time/like metadata.
5. Ask Dots island auto-expands after more than two viewport heights of scrolling and stays dismissed after pressing “忽略”.

## Findings and fix history

- P0: none.
- P1: none.
- P2: none.
- P3: source screenshots contain desktop five-column crops, so some cover text is naturally tighter after conversion to a 190px mobile column. `object-fit: cover` and varied card heights preserve the reference feed rhythm without stretching.
- Replaced the original six repeated demo cards with 19 individually cropped screenshot-based covers.
- Added a one-time no-replacement shuffle; refresh produces a different order while the current page remains stable.
- Added exact `data-card-id` hooks and verified 19/19 unique ids, titles and images.
- Verified 393 × 852 canvas, 3781px scroll height, automatic island expansion, dismiss lock, and zero browser warnings/errors.

Final result: passed

## 2026-08-05 incremental QA

- Main-site input dock matched Figma node `2209:71562`: dock `393×98px`, composer `369×60px`, input `369×48px`, watermark at `y=60px`, home indicator at `y=78px`; the lower mask uses the specified three-stop gradient and only the input surface keeps `25px` background blur.
- Shared ReportDemoCanvas uses height-adaptive auto scale with a persistent `912px` phone-bezel basis. At a `910px` browser viewport the result is `85%`; toggling the phone bezel keeps the same scale, while the first manual zoom switches to manual mode.
- Expanded guidance Lottie is `24×24px` inside the unchanged `20×20px` layout slot. Browser-computed center delta is under `0.004px` on both axes, so the larger animation does not move the copy.
- Collapse behavior was sampled across the `800ms` morph. At approximately `300ms`, the card remained in the `collapsing` state at `128.45×48.52px` with liquid opacity `1`, `20px` radius and shadow intact. The glass surface and shadow remain attached through the size morph, then fade only after reaching the tab entry size.
- Figma node `2198:68564` was rechecked after the visual update. The expanded card now computes to a 90% white surface, transparent border, exact dual shadow (`0 8px 16px rgba(0,0,0,.08)` + `0 3px 80px rgba(102,170,159,.2)`) and 8% mint CTA surface; the former full-card green tint and mint border are gone.
- In the unfinished-return state, the result entry reports `总结中` and the fixed icon slot renders the shared `ProcessIndicator kind="thinking"`; the copy keeps its loading sheen and the tab layout does not move.
- ESLint, `git diff --check` and production build passed. The build still reports the existing `lottie-web` direct-`eval` warning.

Incremental result: passed

## 2026-08-05 scheme switch QA

- Reference: `/private/tmp/conversation-scheme-panel.png`（existing answer-loading scheme interaction）.
- Prototype: `/private/tmp/ask-dots-scheme-panel.png`（Ask Dots scheme A/B interaction）.
- Combined comparison: `/private/tmp/scheme-panel-comparison.png`.
- The Ask Dots demo reuses the same 220px panel, bottom-right anchor, title/header, close action, segmented control and canvas toolbar entry. Only the business controls differ, so the panel height continues to follow its content.
- Browser interaction verified `方案 A → 方案 B`: `data-bubble-variant` changed from `current` to `new`, the active segmented state updated, and a conversation-in-progress screen remounted to the initial results state (`aria-hidden: true → false`, regular `问点点` entry restored).
- Repeated clicks on the scheme tool kept the panel open; the dedicated close button removed it, matching the existing interaction.
- `mcp:sync`, focused ESLint, token lint, schema lint, `git diff --check` and production build passed. The build still reports only the existing `lottie-web` direct-`eval` warning.

Scheme switch result: passed
