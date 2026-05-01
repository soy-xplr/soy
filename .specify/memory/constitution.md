# Beautiful Web Constitution

## Core Principles

### I. Curated Context Over Raw Links

Every bookmark must communicate why it was saved, not only where it points. A card should include enough title, description, category, tags, and personal note context for a visitor to understand the curator's point of view before opening anything else.

### II. Detail Pages Are First-Class Content

Bookmark cards must navigate to internal detail pages. Detail pages are the primary place for longer notes, images, and personal commentary. Original external URLs belong inside the detail page as secondary actions that open in a new tab.

### III. Static-First Operation

The first version must remain static and lightweight. Bookmark summaries are managed as static data, while detail page bodies are hardcoded directly in page code or components. No CMS, database, authentication, or metadata automation is required for the MVP.

### IV. Warm, Readable Scrapbook Design

The product should feel like a tidy handwritten scrapbook: warm paper tones, restrained handwritten accents, sticker-like tags, and card layouts. Decorative elements must support reading and navigation rather than compete with content.

### V. Searchable and Filterable by Default

The bookmark archive must remain easy to explore as content grows. Category filtering and keyword search are required MVP behaviors, and they must work against bookmark titles, descriptions, notes, categories, and tags.

### VI. Accessibility Before Decoration

Handwritten styling and visual decoration must not reduce usability. Core text should use readable fonts, interactive elements must be keyboard accessible, and selection state must not rely on color alone.

## Product Constraints

- The MVP is a public portfolio-style curation site, not a private bookmark manager.
- The MVP must not include login, user accounts, comments, likes, saved states, or community sharing.
- The MVP must not include browser-based link creation or editing.
- The MVP must not fetch URL metadata automatically.
- The MVP must not introduce a server database or API unless a later approved plan changes the architecture.
- Detail page content should be authored manually so the site owner can shape each page like a Notion-style document.

## Content Model Requirements

Each bookmark summary must support:

- `id`: unique stable identifier
- `slug`: internal detail page route segment
- `title`: card and detail page title
- `url`: original external URL
- `description`: short visitor-facing summary
- `note`: curator's personal reason for saving
- `category`: primary grouping
- `tags`: searchable descriptive labels
- `thumbnail`: optional image path or URL
- `savedAt`: saved date in `YYYY-MM-DD` format
- `featured`: optional recommendation flag

Detail page body content is intentionally excluded from the summary data model for the MVP. It should live in the relevant page or component where the site owner can directly edit text and images.

## User Experience Requirements

- Visitors should understand the site's purpose within a few seconds of landing on the home page.
- The home page should present a handwritten-style title, short introduction, category filters, search, and bookmark cards.
- Clicking a bookmark card should route to `/bookmarks/{slug}`.
- Detail pages should use a narrow, vertical, Notion-like reading layout with title, metadata, images, text, personal note blocks, and an original link action.
- Empty search or filter states should use warm, human copy rather than generic error language.
- External links should open in a new tab from the detail page.

## Quality Gates

Before a feature or implementation plan is considered complete:

- It must preserve the card-to-detail-page flow.
- It must keep the MVP static-first unless an approved plan explicitly changes that constraint.
- It must not remove category filtering or keyword search from the MVP.
- It must keep detail page content easy for the site owner to hardcode and edit.
- It must follow the warm scrapbook visual direction without sacrificing readability.
- It must pass available linting, formatting, and JSON validation for changed files.

## Governance

This constitution guides product and implementation decisions for the Beautiful Web bookmark site. When a new requirement conflicts with these principles, the conflict should be resolved by updating the relevant PRD or plan first, then revising this constitution if the product direction has intentionally changed.

Changes to the constitution should include:

- the reason for the change,
- the product behavior affected,
- any documents or implementation plans that need to be updated.

**Version**: 1.0.0  
**Ratified**: 2026-04-30  
**Last Amended**: 2026-04-30
