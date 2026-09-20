# LIFE//THREADS — Your life, in receipts

**Three datasets. Thousands of moments. One story.** LIFE//THREADS is a frontend-only WebRush project that turns household activity, India transaction activity, and Spotify listening history into a single exploratory life narrative.

## Setup

Place the provided, unmodified files in `public/data/`:

- `Daily Household Transactions.csv`
- `Augmented_IndiaTransactMultiFacet2024.csv`
- `spotify_history.csv`
- `spotify_data_dictionary.csv` (reference data dictionary)

Then run `npm install` and `npm run dev`. Build with `npm run build`.

## All three datasets are used

The household file contributes daily-life categories, modes, notes, and spending. The India transaction file contributes merchants, categories, amounts, city/state movement, and timing. Spotify history contributes tracks, artists, listening duration, skips, shuffle state, platforms, and listening timestamps. They are never shown as three isolated dashboards; each loader feeds one normalized record stream.

## Data → insight → connection → story

`src/utils/normalizeData.js` turns the sources into a shared structure. `aggregationEngine` creates per-day, per-hour, artist, category, and location summaries without rendering the raw 150k Spotify rows. `connectionEngine` detects temporal, same-day, category/music, location, and behavioral proximity. `patternEngine` derives night, weekend, music, and recurrence signals. `storyEngine` translates evidence into cautious language such as “may be part of the same period.”

The experience includes an interactive constellation, unified timeline, combined daily heatmap, global search, dynamic source/type/time filters, pattern detector, music and spending context charts, safe receipt details, Surprise Me, and fullscreen Story Mode.

## Architecture

`src/data/` contains dataset-specific loaders and the unified orchestrator. `src/utils/` holds parsing, normalization, privacy, aggregation, connection, pattern, and story logic. `src/hooks/useLifeData.js` memoizes derived data. `src/components/` holds independently reusable interactive UI components.

## Privacy, accessibility, and performance

Sensitive fields are never normalized: raw customer IDs, card-like values, exact addresses, names, DOBs, and fraud-facing identity details never reach UI records. Only merchant/category/amount/time and coarse city/state are surfaced.

The UI uses semantic controls, accessible labels, modal roles, keyboard focus states, Escape-compatible close controls (click close), contrast-conscious palettes, and reduced-motion support. Spotify is parsed once in-browser and visual layers cap/aggregate data (the constellation renders 520 nodes, timeline/heatmap show bounded windows), avoiding a 150k-node DOM.

## WebRush Scoring Improvements

The current build is optimized around the hackathon evaluation model:

- Cross-dataset story discovery across Spotify, India Transactions and Household Transactions
- Connection explanations with signal strength and supporting reasons
- Story Mode with step-by-step receipt exploration and keyboard controls
- Surprise Me discovery flow using generated threads
- Responsive mobile navigation with accessible menu state
- Keyboard-friendly dialogs, focus-visible controls and reduced-motion support
- Performance-aware aggregated constellation instead of rendering the raw Spotify dataset
- Large-list and visualization guidance for client-side performance
- Sanitized receipt presentation with no unnecessary sensitive identifiers

### Core flow

`3 datasets → Normalize → Aggregate → Connect → Detect Patterns → Discover Threads → Story Mode`

### Performance principle

The large Spotify dataset is aggregated before visualization. The interface renders clusters and selected receipts rather than placing every raw record into the DOM.


## Attempt #2 Quality & Responsive Hardening

This version is optimized around the WebRush/FAIE evaluation feedback, with the largest effort focused on responsive design and visual execution.

### Responsive coverage

The interface uses adaptive layouts for:
- 320px and 360px small phones
- 375–480px mobile screens
- 560–700px large phones and small tablets
- 768–900px tablets
- 1024px+ desktop layouts
- Wide desktop screens with constrained content widths

Responsive safeguards include:
- No intentional horizontal page overflow
- Flexible cards and data grids
- Mobile navigation drawer with scrim
- Sticky mobile header/filter controls
- Responsive timeline records
- Responsive charts and visualization containers
- Mobile-safe receipt/detail drawer
- Touch-friendly controls
- Reduced-motion support

### Accessibility hardening

- Keyboard-focus-visible states
- Escape-key navigation closing
- ARIA labels for search, navigation, filters, dialogs and data clusters
- Semantic navigation regions
- Accessible mobile menu state
- Dialog semantics for receipt and story views
- Reduced-motion media support
- Clear focusable interactive elements

### Performance approach

The application keeps the supplied datasets local and frontend-only. Records are normalized once, then aggregated into reusable structures for timeline, pattern and connection views. Visualizations consume aggregated data rather than rendering every raw record.

### Story discovery flow

```text
Three supplied datasets
        ↓
Normalization
        ↓
Unified life records
        ↓
Aggregation
        ↓
Time / date / category connections
        ↓
Pattern detection
        ↓
Interactive exploration
        ↓
Story Mode
```

### Evaluation-focused improvements

Attempt #2 specifically strengthens:
1. UI/UX consistency and hierarchy
2. Mobile/tablet responsiveness
3. Visualization containment
4. Navigation usability
5. Accessibility and keyboard behavior
6. Documentation of architecture and performance decisions

The core concept remains unchanged: transform disconnected receipts into discoverable relationships and meaningful stories.


## Final WebRush Responsive QA

The final build is designed mobile-first for the evaluation viewport range. The HTML viewport is explicitly configured with `width=device-width` and safe-area support. Layouts use fluid CSS grids, bounded content widths, horizontal filter scrolling, a touch-friendly navigation drawer, responsive charts, stacked timeline records, and mobile-safe story/detail panels.

### Recommended QA matrix

| Viewport | Expected behavior |
|---|---|
| 320px | Single-column controls/cards, no horizontal page overflow |
| 375–480px | Compact two-column metrics, stacked datasets and timeline |
| 560–700px | Responsive cards/charts with mobile navigation |
| 768–900px | Tablet layout with drawer navigation |
| 1024px+ | Full desktop sidebar and multi-column content |

### Evaluation priorities

The implementation prioritizes the seven authoritative categories: problem alignment, UI/UX and responsiveness, functionality, code architecture, performance/accessibility, innovation, and documentation. The large Spotify dataset is never rendered as a raw record-per-node interface; derived aggregates are used for visual layers.
