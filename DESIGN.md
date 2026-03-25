# Design System Document



## 1. Overview & Creative North Star: "The Digital Atelier"



This design system is built for a technology partner that values human-centric craftsmanship over assembly-line production. We move away from the cold, sterile "Corporate Blue" aesthetic toward a **Warm-Tech Studio** feel.



The Creative North Star is **"The Digital Atelier."** Think of it as a master architect’s workshop: precise and technical, yet warm, editorial, and tactile. We reject the rigid, centered grids of generic SaaS products in favor of **Intentional Asymmetry**. By using generous white space and overlapping elements, we create a sense of movement and "founder-led" personality. This isn't just a platform; it’s a curated experience where technology feels sophisticated and approachable.



---



## 2. Colors & Surface Logic



Our palette balances the authority of deep blues with the organic warmth of cream and brown. We do not use standard grays.



### Color Palette (Material Design Tokens)

- **Primary (Deep Blue):** `#00426f` (Primary) | `#1d5a8d` (Primary Container)

- **Secondary (Cyan Accent):** `#006876` (Secondary) | `#58e6ff` (Secondary Container)

- **Tertiary (Warm Brown):** `#5e3600` (Tertiary) | `#7e4b00` (Tertiary Container)

- **Surface (Base Cream):** `#fff9ec` (Surface) | `#f4eddb` (Surface Container)



### The "No-Line" Rule

**Explicit Instruction:** Traditional 1px solid borders are prohibited for sectioning. We define boundaries through tonal shifts.

- Use a `surface-container-low` (`#faf3e1`) background to transition into a new content block against the base `surface`.

- For more emphasis, use `surface-container-high` (`#efe8d6`).



### Surface Hierarchy & Nesting

Treat the UI as a series of layered paper or frosted glass.

- **Level 1 (Base):** `surface`

- **Level 2 (In-page content):** `surface-container-low`

- **Level 3 (Cards/Modals):** `surface-container-lowest` (pure white `#ffffff`) to create a "pop" against the cream base.



### The "Glass & Gradient" Rule

To add soul to the interface, use **Glassmorphism** for floating navigation or overlay elements. Apply a backdrop-blur (12px–20px) with a semi-transparent `surface` color (80% opacity). For main CTAs, use a subtle linear gradient from `primary` to `primary-container` at a 135-degree angle to provide depth.



---



## 3. Typography



The typographic personality is **Editorial Authority.** We pair the classic, intellectual feel of a serif with the modern precision of a sans-serif.



- **Display & Headlines (Newsreader):** Used for storytelling. `display-lg` (3.5rem) should be used with tight letter-spacing and asymmetrical alignment to lead the eye.

- **Titles & Body (Manrope):** Used for utility. `body-lg` (1rem) provides high readability.

- **Labels (Manrope):** `label-md` (0.75rem) should always be in uppercase with a slight letter-spacing increase (+0.05rem) to evoke a technical, "blueprinted" look.



---



## 4. Elevation & Depth



We achieve hierarchy through **Tonal Layering** rather than structural lines.



### The Layering Principle

Instead of shadows, stack surface tiers. A `surface-container-highest` element placed on a `surface-dim` background creates a natural, soft lift.



### Ambient Shadows

Shadows are reserved for floating elements (e.g., Modals, Popovers).

- **Style:** Extra-diffused.

- **Token:** Blur: 40px, Y-offset: 12px.

- **Color:** Use `on-surface` at 6% opacity. Never use pure black or grey; the shadow must feel like it's cast by a warm light source onto a cream surface.



### The "Ghost Border" Fallback

If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. This creates a "suggestion" of a line rather than a hard boundary.



---



## 5. Components



### Buttons

- **Primary:** `primary-container` background with `on-primary` text. Use `xl` (1.5rem) roundedness for a premium, approachable feel.

- **Secondary:** Ghost style. No background, `outline-variant` at 20% opacity for the border.

- **Interactions:** On hover, shift background color to `primary` (darker) and add a 4px soft ambient shadow.



### Input Fields

- **Container:** `surface-container-highest` with a `none` border.

- **States:** On focus, the bottom edge gains a 2px `secondary` (Cyan) underline. Avoid the "box-in-a-box" look.



### Cards

- **Construction:** Use `surface-container-lowest` (#ffffff) on the `surface` base.

- **Spacing:** Minimum padding of `spacing-8` (2.75rem).

- **Rule:** No dividers. Separate the header, body, and footer using vertical white space (`spacing-6` or `spacing-10`).



### Additional Signature Component: The "Atelier Badge"

A specialized chip for founder-led insights.

- **Style:** `tertiary-fixed` background, `on-tertiary-fixed` text.

- **Placement:** Positioned asymmetrically (e.g., overlapping the top-left corner of a card) to break the grid.



---



## 6. Do’s and Don'ts



### Do

- **Do** use asymmetrical layouts. If a headline is left-aligned, try right-aligning the supporting body text in the next column.

- **Do** leverage the `surface-tint` to give interactive elements a slight warmth.

- **Do** use `spacing-24` (8.5rem) for major section breaks to let the editorial content breathe.



### Don't

- **Don't** use 100% opaque black text. Always use `on-surface` (`#1e1c11`) to maintain the "Warm-Tech" tone.

- **Don't** use 1px solid dividers. Use a background color shift or `spacing-10` of empty space.

- **Don't** center-align long-form text. Editorial layouts are traditionally flush-left or asymmetrically balanced.

- **Don't** use sharp 90-degree corners. Even for subtle elements, use the `sm` (0.25rem) roundedness at a minimum.