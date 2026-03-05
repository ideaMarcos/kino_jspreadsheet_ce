# Kino JSpreadsheet CE Widget

A Kino widget for displaying interactive spreadsheets in Livebook using Jspreadsheet CE.

## Quick Start

```bash
pnpm install      # Install dependencies in assets/
pnpm build        # Build JavaScript bundle
pnpm dev          # Watch and rebuild on file changes
```

## Project Structure

- **lib/kino_jspreadsheet_ce.ex** - Elixir module, Kino widget definition
- **assets/src/main.js** - JavaScript initialization code
- **assets/package.json** - JavaScript dependencies
- **jspreadsheet.livemd** - Livebook examples

## Key Files & Purposes

| File                          | Purpose                             |
| ----------------------------- | ----------------------------------- |
| `lib/kino_jspreadsheet_ce.ex` | Widget module, option normalization |
| `assets/main.js`              | jspreadsheet initialization, config |
| `assets/package.json`         | JavaScript dependencies             |
| `mix.exs`                     | Elixir project config               |

## Important Dependencies

- **jspreadsheet-ce v5.0.4** - Spreadsheet library (use proper `worksheets` array structure in config)
- **jsuites v5.13.5** - UI utilities for jspreadsheet
- **esbuild** - JavaScript bundler
- **pnpm** - JavaScript package manager

## Widget Options

```elixir
KinoJspreadsheetCe.new(
  data: [["A", "B"], [1, 2]],           # Optional: 2D array (defaults to [])
  columns: [%{}, %{type: "number"}],    # Optional: column config
  minDimensions: {10, 5},               # Optional: min rows/cols
  toolbar: true                         # Optional: show toolbar
)
```

See [jspreadsheet documentation](https://bossanova.uk/jspreadsheet/docs) for advanced column configuration options like `type`, `width`, `format`, etc.

## Important Notes

- **jspreadsheet-ce v5** requires `worksheets` array structure; plain `data` property causes initialization errors
- Toolbar uses jspreadsheet's native array-based configuration with custom CSS styling
- Container uses standard `div` element (jspreadsheet handles all DOM initialization)
- Default data is empty array; provide data in options or get blank spreadsheet

## Build & Development

### Build System Overview

The project uses a **two-part build**:
1. **JavaScript**: esbuild bundles `assets/src/main.js` → `lib/assets/build/main.js`
2. **Elixir**: mix.exs references `assets_path: "lib/assets/build"` for the bundled JS

**When to rebuild:**
- Change JS code → run `cd assets && pnpm build` (or `pnpm dev` for watch mode)
- Change Elixir code → run `mix compile` (auto-reloads in Livebook)

```bash
# Development with watch
cd assets && pnpm dev

# Production build
cd assets && pnpm build

# Check built output
ls -lh lib/assets/build/main.js
```

## Lessons Learned

1. **jspreadsheet-ce v5 worksheets structure** - Version 5 requires proper `worksheets` array structure: `{worksheets: [{data: data, columns: columns}]}`. Using plain `{data: data}` causes "worksheets are not defined" error. See [worksheets docs](https://bossanova.uk/jspreadsheet/docs/worksheets).

2. **Toolbar styling** - jspreadsheet-ce v5 toolbar uses native CSS from CDN. Custom inline CSS styling provided for better UX.

3. **Container element** - Using standard `document.createElement("div")` as jspreadsheet-ce expects a regular DOM element for initialization.

4. **Toolbar configuration** - Pass toolbar as array of button arrays to jspreadsheet initialization, not a boolean flag.

5. **CSS imports via Kino** - Use `ctx.importCSS()` to load Material Icons and jspreadsheet CSS from CDN rather than bundling.

## Documentation References

- [jspreadsheet-ce Docs](https://bossanova.uk/jspreadsheet/docs) - Official jspreadsheet documentation
- [jsuites Docs](https://bossanova.uk/jsuites/docs) - jsuites UI library documentation
- [Kino Documentation](https://github.com/livebook-dev/kino) - Livebook widget framework
- [Livebook](https://livebook.dev/) - Interactive notebook environment
