// src/utils/colors.js
export const fixTailwindColors = (element) => {
  const clone = element.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.width = `${element.offsetWidth}px`;
  document.body.appendChild(clone);

  // Convert oklch colors to rgb
  const convertOklch = (value) => {
    const oklchRegex = /oklch\(([^)]+)\)/g;
    return value.replace(oklchRegex, (match) => {
      // For production, replace with actual oklch to rgb conversion logic
      // This is a placeholder - in a real app you'd use a color conversion library
      return match.replace('oklch', 'rgb');
    });
  };

  // Process all elements
  const allElements = clone.querySelectorAll('*');
  allElements.forEach(el => {
    const computed = window.getComputedStyle(el);

    // Handle background colors
    if (computed.backgroundColor.includes('oklch')) {
      el.style.backgroundColor = convertOklch(computed.backgroundColor);
    }

    // Handle text colors
    if (computed.color.includes('oklch')) {
      el.style.color = convertOklch(computed.color);
    }

    // Handle border colors
    if (computed.borderColor.includes('oklch')) {
      el.style.borderColor = convertOklch(computed.borderColor);
    }
  });

  return clone;
};