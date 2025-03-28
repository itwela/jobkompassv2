Perplexity-inspired design system in your SASS. This guide will cover font choices, sizes, spacing, and other unique aspects of Perplexity's design.

## Typography

1. Font Family:
   * Primary font: IBM Plex Sans[2](https://www.reddit.com/r/perplexity_ai/comments/1gu95b4/what_font_style_perplexity_use/)[4](https://meta.discourse.org/t/a-simple-and-fun-design-tool-for-customizing-discourse/323807)
   * Monospace font (for code): Berkeley Mono[2](https://www.reddit.com/r/perplexity_ai/comments/1gu95b4/what_font_style_perplexity_use/)
2. Font Sizes:
   * Base font size: 16px
   * Header sizes:
     * h1: 2.5rem (40px)
     * h2: 2rem (32px)
     * h3: 1.75rem (28px)
     * h4: 1.5rem (24px)
   * Body text: 1rem (16px)
   * Small text: 0.875rem (14px)
3. Line Height:
   * Body text: 1.5
   * Headers: 1.2

## Spacing

1. Base spacing unit: 8px
2. Vertical rhythm:
   * Paragraphs: 1.5rem (24px) bottom margin
   * Headers: 2rem (32px) top margin, 1rem (16px) bottom margin
3. Horizontal spacing:
   * Container padding: 1.5rem (24px) on mobile, 2rem (32px) on desktop
   * Grid gap: 1rem (16px)

## Layout

1. Max content width: 1200px
2. Responsive breakpoints:
   * Mobile: 0 - 767px
   * Tablet: 768px - 1023px
   * Desktop: 1024px and above

## Components

1. Cards:
   * Padding: 1.5rem (24px)
   * Border radius: 8px
   * Box shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
2. Buttons:
   * Padding: 0.75rem 1.25rem (12px 20px)
   * Border radius: 4px
   * Font size: 1rem (16px)
   * Font weight: 600
3. Input fields:
   * Height: 2.5rem (40px)
   * Padding: 0.5rem 0.75rem (8px 12px)
   * Border radius: 4px
   * Border: 1px solid #e0e0e0

## SASS Implementation

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-textMainDark selection:!text-superDark selection:bg-superDuper/10 bg-offset dark:bg-offsetDark my-md relative flex flex-col rounded font-mono text-sm font-thin"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"><button type="button" class="focus-visible:bg-offsetPlus dark:focus-visible:bg-offsetPlusDark hover:bg-offsetPlus text-textOff dark:text-textOffDark hover:text-textMain dark:hover:bg-offsetPlusDark  dark:hover:text-textMainDark font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans  select-none items-center relative group/button  justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150 active:ease-outExpo origin-center whitespace-nowrap inline-flex text-sm h-8 aspect-square"><div class="flex items-center min-w-0 font-medium gap-1.5 justify-center"><div class="flex shrink-0 items-center justify-center size-4"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" class="svg-inline--fa fa-copy fa-fw fa-1x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"></path></svg></div></div></button></div><div class="-mt-xl"><div><div class="text-text-200 bg-background-300 py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div class="pr-lg"><span><code><span><span>// Variables
</span></span><span>$font-family-sans: 'IBM Plex Sans', sans-serif;
</span><span>$font-family-mono: 'Berkeley Mono', monospace;
</span><span>$base-font-size: 16px;
</span><span>$base-line-height: 1.5;
</span><span>$base-spacing: 8px;
</span><span>
</span><span>// Typography
</span><span>body {
</span><span>  font-family: $font-family-sans;
</span><span>  font-size: $base-font-size;
</span><span>  line-height: $base-line-height;
</span><span>}
</span><span>
</span><span>h1, h2, h3, h4 {
</span><span>  margin-top: $base-spacing * 4;
</span><span>  margin-bottom: $base-spacing * 2;
</span><span>}
</span><span>
</span><span>h1 { font-size: 2.5rem; }
</span><span>h2 { font-size: 2rem; }
</span><span>h3 { font-size: 1.75rem; }
</span><span>h4 { font-size: 1.5rem; }
</span><span>
</span><span>// Spacing
</span><span>.container {
</span><span>  max-width: 1200px;
</span><span>  margin: 0 auto;
</span><span>  padding: 0 $base-spacing * 3;
</span><span>  
</span><span>  @media (min-width: 768px) {
</span><span>    padding: 0 $base-spacing * 4;
</span><span>  }
</span><span>}
</span><span>
</span><span>// Components
</span><span>.card {
</span><span>  padding: $base-spacing * 3;
</span><span>  border-radius: $base-spacing;
</span><span>  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
</span><span>}
</span><span>
</span><span>.button {
</span><span>  padding: ($base-spacing * 1.5) ($base-spacing * 2.5);
</span><span>  border-radius: $base-spacing / 2;
</span><span>  font-size: 1rem;
</span><span>  font-weight: 600;
</span><span>}
</span><span>
</span><span>.input {
</span><span>  height: $base-spacing * 5;
</span><span>  padding: ($base-spacing) ($base-spacing * 1.5);
</span><span>  border-radius: $base-spacing / 2;
</span><span>  border: 1px solid #e0e0e0;
</span><span>}
</span><span>
</span><span>// Responsive grid
</span><span>.grid {
</span><span>  display: grid;
</span><span>  gap: $base-spacing * 2;
</span><span>  
</span><span>  @media (min-width: 768px) {
</span><span>    grid-template-columns: repeat(2, 1fr);
</span><span>  }
</span><span>  
</span><span>  @media (min-width: 1024px) {
</span><span>    grid-template-columns: repeat(3, 1fr);
</span><span>  }
</span><span>}
</span><span></span></code></span></div></div></div></pre>

This SASS implementation provides a foundation for a Perplexity-inspired design system. Remember to adjust colors and other brand-specific elements to match your own design preferences[1](https://learnprompting.org/blog/guide-perplexity)[3](https://www.uxdesigninstitute.com/blog/perplexity-ai-and-design-process/)[4](https://meta.discourse.org/t/a-simple-and-fun-design-tool-for-customizing-discourse/323807)[5](https://www.jploft.com/blog/a-complete-guide-to-perplexity-ai).

### Citations:

1. [https://learnprompting.org/blog/guide-perplexity](https://learnprompting.org/blog/guide-perplexity)
2. [https://www.reddit.com/r/perplexity_ai/comments/1gu95b4/what_font_style_perplexity_use/](https://www.reddit.com/r/perplexity_ai/comments/1gu95b4/what_font_style_perplexity_use/)
3. [https://www.uxdesigninstitute.com/blog/perplexity-ai-and-design-process/](https://www.uxdesigninstitute.com/blog/perplexity-ai-and-design-process/)
4. [https://meta.discourse.org/t/a-simple-and-fun-design-tool-for-customizing-discourse/323807](https://meta.discourse.org/t/a-simple-and-fun-design-tool-for-customizing-discourse/323807)
5. [https://www.jploft.com/blog/a-complete-guide-to-perplexity-ai](https://www.jploft.com/blog/a-complete-guide-to-perplexity-ai)
6. [https://www.youtube.com/watch?v=4BH454Kw-90](https://www.youtube.com/watch?v=4BH454Kw-90)
7. [https://docs.perplexity.ai/guides/prompt-guide](https://docs.perplexity.ai/guides/prompt-guide)
8. [https://fonts.google.com/knowledge/stop_stealing_sheep.pdf](https://fonts.google.com/knowledge/stop_stealing_sheep.pdf)
9. [https://www.youtube.com/watch?v=RO9KwjKIrXI](https://www.youtube.com/watch?v=RO9KwjKIrXI)

---

Answer from Perplexity:** **[pplx.ai/share](pplx.ai/share)
