/**
 * Teaser block implementation
 * Creates news/content teasers with image and text content
 */

export default function decorate(block) {
  // Add semantic CSS classes for better styling
  addSemanticClasses(block);
  
  // Process special content patterns
  processContent(block);
  
  // Add interactive features
  addEventListeners(block);
  
  // Add accessibility features
  addAccessibilityFeatures(block);
}

/**
 * Add semantic CSS classes to block elements
 * @param {HTMLElement} block - The block DOM element
 */
function addSemanticClasses(block) {
  const hasNoImageClass = block.classList.contains('no-image');
  
  // Add wrapper class
  block.classList.add('teaser-wrapper');
  
  // Find and classify image elements
  const picture = block.querySelector('picture');
  const img = block.querySelector('img');
  
  if (picture && !hasNoImageClass) {
    picture.classList.add('teaser-image-wrapper');
    picture.parentElement.classList.add('teaser-image-container');
  }
  
  if (img && !hasNoImageClass) {
    img.classList.add('teaser-image');
  }
  
  // Find and classify text content
  const textContainer = findTextContainer(block);
  if (textContainer) {
    textContainer.classList.add('teaser-content');
    
    // Find topic and date (typically in first div)
    const topicDateElement = textContainer.querySelector('div:first-child');
    if (topicDateElement && isTopicDateContent(topicDateElement)) {
      topicDateElement.classList.add('teaser-meta');
      
      // Split topic and date
      const textContent = topicDateElement.textContent;
      if (textContent.includes('|')) {
        const [topic, date] = textContent.split('|').map(s => s.trim());
        topicDateElement.innerHTML = `
          <span class="teaser-topic">${topic}</span>
          <span class="teaser-divider">|</span>
          <span class="teaser-date">${date}</span>
        `;
      }
    }
    
    // Find and classify title
    const titleElement = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
    if (titleElement) {
      titleElement.classList.add('teaser-title');
      
      // Determine title size based on character count (from Figma specs)
      const titleLength = titleElement.textContent.length;
      if (hasNoImageClass) {
        // For no-image variant: use H3 for <53 chars, H4 for >=53 chars
        if (titleLength < 53) {
          titleElement.classList.add('teaser-title-large');
        } else {
          titleElement.classList.add('teaser-title-medium');
        }
      } else {
        // For with-image variant: use H5
        titleElement.classList.add('teaser-title-small');
      }
    }
    
    // Find and classify description text
    const descriptionElement = textContainer.querySelector('p:not(.button-container)');
    if (descriptionElement) {
      descriptionElement.classList.add('teaser-description');
    }
  }
  
  // Find and classify links/buttons
  const links = block.querySelectorAll('a');
  links.forEach(link => {
    if (link.classList.contains('button')) {
      link.classList.add('teaser-button');
    } else {
      link.classList.add('teaser-link');
    }
  });
}

/**
 * Find the main text container in the block
 * @param {HTMLElement} block - The block DOM element
 * @returns {HTMLElement|null} - The text container element
 */
function findTextContainer(block) {
  // Look for a div that contains text content but not images
  const divs = block.querySelectorAll('div');
  for (const div of divs) {
    if (div.querySelector('h1, h2, h3, h4, h5, h6, p') && !div.querySelector('picture, img')) {
      return div;
    }
  }
  return null;
}

/**
 * Check if element contains topic and date content
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - True if contains topic/date pattern
 */
function isTopicDateContent(element) {
  const text = element.textContent.trim();
  // Check for topic | date pattern
  return text.includes('|') && text.split('|').length === 2;
}

/**
 * Process special content patterns
 * @param {HTMLElement} block - The block DOM element
 */
function processContent(block) {
  // Ensure proper link behavior
  const links = block.querySelectorAll('a[href]');
  links.forEach(link => {
    // Add external link indicators
    if (link.hostname && link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Add title attribute if missing
    if (!link.getAttribute('title') && link.textContent.trim()) {
      link.setAttribute('title', link.textContent.trim());
    }
  });
}

/**
 * Add event listeners for interactive features
 * @param {HTMLElement} block - The block DOM element
 */
function addEventListeners(block) {
  const image = block.querySelector('.teaser-image');
  const teaserLink = block.querySelector('.teaser-link');
  
  // Add hover effects for images
  if (image && teaserLink) {
    teaserLink.addEventListener('mouseenter', () => {
      image.classList.add('teaser-image-hover');
    });
    
    teaserLink.addEventListener('mouseleave', () => {
      image.classList.remove('teaser-image-hover');
    });
  }
  
  // Make entire teaser clickable if there's a main link
  const mainLink = block.querySelector('a[href]');
  if (mainLink) {
    block.style.cursor = 'pointer';
    
    block.addEventListener('click', (e) => {
      // Don't trigger if clicking on an actual link or button
      if (e.target.closest('a, button')) {
        return;
      }
      
      e.preventDefault();
      
      // Trigger the main link
      if (mainLink.getAttribute('target') === '_blank') {
        window.open(mainLink.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = mainLink.href;
      }
      
      // Track click for analytics
      trackTeaserClick(block, mainLink);
    });
  }
}

/**
 * Add accessibility features
 * @param {HTMLElement} block - The block DOM element
 */
function addAccessibilityFeatures(block) {
  // Add ARIA labels for images
  const image = block.querySelector('.teaser-image');
  if (image && !image.getAttribute('aria-label') && !image.getAttribute('alt')) {
    image.setAttribute('aria-label', 'Teaser image');
  }
  
  // Add keyboard navigation for clickable teaser
  const mainLink = block.querySelector('a[href]');
  if (mainLink) {
    block.setAttribute('tabindex', '0');
    block.setAttribute('role', 'article');
    
    // Add aria-label for screen readers
    const title = block.querySelector('.teaser-title');
    if (title) {
      block.setAttribute('aria-label', `Read more about: ${title.textContent}`);
    }
    
    // Handle keyboard events
    block.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        block.click();
      }
    });
  }
  
  // Ensure proper heading hierarchy
  const title = block.querySelector('.teaser-title');
  if (title && !title.id) {
    title.id = `teaser-title-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Track teaser clicks for analytics
 * @param {HTMLElement} block - The block DOM element
 * @param {HTMLElement} link - The clicked link element
 */
function trackTeaserClick(block, link) {
  if (window.dataLayer) {
    const title = block.querySelector('.teaser-title')?.textContent || '';
    const topic = block.querySelector('.teaser-topic')?.textContent || '';
    
    window.dataLayer.push({
      event: 'teaser_click',
      teaser_title: title,
      teaser_topic: topic,
      teaser_url: link.href,
      component: 'teaser'
    });
  }
}
