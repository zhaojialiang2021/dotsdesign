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
