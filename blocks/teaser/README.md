# Teaser Block

A versatile news and content teaser component designed for showcasing articles, blog posts, and other content with compelling visuals and text.

## Overview

The Teaser block is built based on the Figma design specifications and supports multiple layout variations, responsive design, and accessibility features. It automatically adapts the headline size based on content length and provides interactive hover effects.

## Features

- **Two Layout Variants**: With image and without image
- **Smart Title Sizing**: Automatically adjusts headline size based on character count
- **Interactive Hover Effects**: Image zoom and color transitions
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Accessibility Compliant**: WCAG guidelines support with keyboard navigation
- **Theme Support**: Light and dark theme variants
- **Analytics Ready**: Built-in click tracking

## Design Specifications

Based on the Figma design, the teaser follows these specifications:

### With Image Variant
- **Image Aspect Ratio**: 16:9 (480x270px on desktop)
- **Title Style**: H5 (24px font size)
- **Description**: Body text (20px) limited to 3 lines
- **Meta Information**: Topic (blue #0063BE) + Date separator

### Without Image Variant
- **Title Sizing Logic**:
  - Characters < 53: H3 size (44px)
  - Characters ≥ 53: H4 size (27px)
- **Extended Content**: More space for description text

### Responsive Behavior
- **Desktop**: 480px max width
- **Mobile**: 312px width with adjusted typography and spacing
- **Hover Effects**: 4% image zoom with color transitions

## Content Model

The teaser block includes the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | Reference | No | Background/feature image (16:9 aspect ratio) |
| `imageAlt` | Text | No | Alt text for the image |
| `topic` | Text | No | Category or topic label |
| `date` | Text | No | Publication or event date |
| `title` | Text | Yes | Main headline |
| `description` | Rich Text | No | Content description (max 155 characters recommended) |
| `link` | AEM Content | No | Target URL for the teaser |
| `classes` | Multiselect | No | Style options (layout and theme variants) |

### Style Options

#### Layout Options
- **With Image** (default): Displays with featured image
- **Without Image**: Text-only layout with larger headlines

#### Theme Options
- **Light** (default): Standard light theme
- **Dark**: Dark background variant

## Usage Examples

### Basic Teaser with Image
```html
<div class="block teaser">
  <div>
    <div>
      <picture>
        <img src="image.jpg" alt="Description" width="480" height="270">
      </picture>
    </div>
  </div>
  <div>
    <div>
      <div>Healthcare | February 17, 2023</div>
      <h3>Vision 2026 – Fresenius Kabi's healthy growth journey</h3>
      <p>Caring for life – this is the mission we at Fresenius Kabi...</p>
      <p class="button-container">
        <a href="/article" class="button">Read More</a>
      </p>
    </div>
  </div>
</div>
```

### Teaser without Image
```html
<div class="block teaser no-image">
  <div>
    <div>
      <div>Technology | March 15, 2023</div>
      <h3>Paving the way for the future of blood transfusions</h3>
      <p>Revolutionary advances in medical technology...</p>
    </div>
  </div>
</div>
```

### Dark Theme Teaser
```html
<div class="block teaser dark">
  <!-- Content structure same as above -->
</div>
```

## JavaScript Functionality

The teaser block automatically:

1. **Adds Semantic Classes**: Enhances markup with meaningful CSS classes
2. **Processes Content**: Splits topic/date, handles external links
3. **Adds Interactivity**: Hover effects and click handlers
4. **Improves Accessibility**: ARIA attributes and keyboard navigation
5. **Tracks Analytics**: Click events for measurement

### Key JavaScript Features

#### Smart Title Sizing
```javascript
const titleLength = titleElement.textContent.length;
if (hasNoImageClass) {
  if (titleLength < 53) {
    titleElement.classList.add('teaser-title-large'); // H3
  } else {
    titleElement.classList.add('teaser-title-medium'); // H4
  }
} else {
  titleElement.classList.add('teaser-title-small'); // H5
}
```

#### Interactive Effects
- Image zoom on hover
- Title color change on hover
- Full teaser click area
- Keyboard navigation support

#### Analytics Integration
Tracks teaser interactions with:
```javascript
{
  event: 'teaser_click',
  teaser_title: title,
  teaser_topic: topic,
  teaser_url: link.href,
  component: 'teaser'
}
```

## CSS Architecture

The component uses a BEM-inspired naming convention:

- `.block.teaser` - Main container
- `.teaser-image-container` - Image wrapper
- `.teaser-content` - Text content container
- `.teaser-meta` - Topic and date
- `.teaser-title` - Main headline
- `.teaser-description` - Body text

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  .block.teaser {
    width: 312px;
    max-width: calc(100vw - 32px);
  }
}

/* Tablet */
@media (min-width: 768px) {
  .block.teaser {
    max-width: 100%;
  }
}
```

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant colors
- **Reduced Motion**: Respects user preferences

## Performance Considerations

- **Optimized Images**: Lazy loading and proper sizing
- **Efficient CSS**: Scoped selectors and minimal reflow
- **Progressive Enhancement**: Works without JavaScript
- **Minimal JavaScript**: Lightweight interaction layer

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Accessibility**: Screen readers (NVDA, JAWS, VoiceOver)

## Testing

Use the included `teaser-test.html` file to test different variations:

1. Teaser with image
2. Teaser without image
3. Long title handling
4. Dark theme variant
5. Interactive behaviors

## Integration with Universal Editor

The teaser block is automatically available in the Universal Editor under the "Blocks" section. Authors can:

1. Add a new Teaser block
2. Configure content through the properties panel
3. Choose layout and theme options
4. Preview changes in real-time
5. Publish content

## Maintenance

### Adding New Style Options

To add new style options, update the `classes` field in the model:

```json
{
  "name": "Size",
  "children": [
    { "name": "Compact", "value": "compact" },
    { "name": "Extended", "value": "extended" }
  ]
}
```

Then add corresponding CSS:

```css
.block.teaser.compact {
  /* Compact styling */
}

.block.teaser.extended {
  /* Extended styling */
}
```

### Customizing Hover Effects

Modify the transition and transform properties in the CSS:

```css
.block.teaser .teaser-image {
  transition: transform 0.6s ease-in-out;
}

.block.teaser .teaser-image.teaser-image-hover {
  transform: scale(1.04); /* Adjust zoom level */
}
```

## Troubleshooting

### Common Issues

1. **Images not displaying**: Check image paths and dimensions
2. **Hover effects not working**: Verify JavaScript is loaded
3. **Responsive issues**: Test CSS media queries
4. **Accessibility problems**: Run axe or similar tools

### Debug Mode

Enable debug logging by adding to the JavaScript:

```javascript
if (window.location.hostname.includes('aem.page')) {
  console.log('Teaser block data:', block);
}
```

## Future Enhancements

Potential improvements for future versions:

- Video background support
- Animation on scroll
- Social sharing integration
- Advanced analytics tracking
- A/B testing capabilities
- Internationalization support
