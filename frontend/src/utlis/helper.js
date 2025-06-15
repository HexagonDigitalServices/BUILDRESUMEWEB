// src/utils/helper.js
import html2canvas from "html2canvas";
import moment from "moment"

/**
 * Validate email format.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Given a rootElement, walk it and every descendant and copy its
 * computed style into inline style.cssText. This forces ALL colors,
 * fonts, spacings, shadows, borders, etc. to be “real” values that
 * html2canvas understands (no more unsupported oklch()).
 */
export function inlineAllComputedStyles(rootElement) {
  const nodes = [rootElement, ...rootElement.querySelectorAll("*")];
  nodes.forEach((node) => {
    const cs = window.getComputedStyle(node);
    let cssText = "";
    for (let i = 0; i < cs.length; i++) {
      const prop = cs[i];
      const val  = cs.getPropertyValue(prop);

      // ✂️ Skip any unsupported OKLCH color functions
      if (val.includes("oklch(")) continue;

      cssText += `${prop}:${val};`;
    }
    node.style.cssText = cssText;
  });
}

/**
 * Given an image URL, return the lightest average color as "rgb(r, g, b)".
 * If the image fails to load (CORS or invalid URL), resolves to "#ffffff".
 */
export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve) => {
    if (!imageUrl || typeof imageUrl !== "string") {
      return resolve("#ffffff")
    }

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let r = 0,
        g = 0,
        b = 0,
        count = 0

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i]
        const green = data[i + 1]
        const blue = data[i + 2]
        const brightness = (red + green + blue) / 3

        if (brightness > 100) {
          r += red
          g += green
          b += blue
          count++
        }
      }

      if (count === 0) {
        resolve("#ffffff")
      } else {
        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)
        resolve(`rgb(${r}, ${g}, ${b})`)
      }
    }

    img.onerror = () => {
      // Fallback to white if image can’t load
      resolve("#ffffff")
    }

    if (!imageUrl.startsWith("data:")) {
      img.crossOrigin = "anonymous"
    }
    img.src = imageUrl
  })
}

/**
 * Format "YYYY-MM" → "MMM YYYY" (e.g. "2025-03" → "Mar 2025").
 */
export function formatYearMonth(yearMonth) {
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : ""
}

/**
 * Recursively replace any computed 'oklch(...)' in color, backgroundColor,
 * or borderColor—and any inline SVG fill/stroke attributes—so that no OKLCH
 * values remain. This runs on a given rootElement and all its descendants.
 */
export const fixTailwindColors = (rootElement) => {
  if (!rootElement) return
  const elements = rootElement.querySelectorAll("*")
  elements.forEach((el) => {
    const style = window.getComputedStyle(el)
      ;["color", "backgroundColor", "borderColor"].forEach((prop) => {
        const val = style[prop] || ""
        if (val.includes("oklch")) {
          el.style[prop] = "#000"
        }
      })

    // If this is an SVG element, also override inline fill/stroke attributes
    if (el instanceof SVGElement) {
      const fill = el.getAttribute("fill")
      if (fill && fill.includes("oklch")) {
        el.setAttribute("fill", "#000")
      }
      const stroke = el.getAttribute("stroke")
      if (stroke && stroke.includes("oklch")) {
        el.setAttribute("stroke", "#000")
      }
    }
  })
}

/**
 * Clone a DOM element, apply fixTailwindColors on the clone (to remove ANY 'oklch(...)'),
 * then run html2canvas on that clone. Returns a PNG data URL.
 */
export async function captureElementAsImage(element) {
  if (!element) throw new Error("No element provided");

  // 1) Clone & position off-screen (opacity:0 so it's still “visible” to html2canvas)
  const clone = element.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.top      = "-9999px";
  clone.style.left     = "0";
  clone.style.opacity  = "0";
  const { width, height } = element.getBoundingClientRect();
  clone.style.width  = `${width}px`;
  clone.style.height = `${height}px`;
  document.body.appendChild(clone);

  // 2) Inject a global override into the real <head>
  //    This will force ALL elements—including Tailwind’s oklch colors—
  //    to render with black text, white backgrounds, no box-shadows,
  //    and no background-images.
  const override = document.createElement("style");
  override.id = "__html2canvas_override__";
  override.textContent = `
    * {
      color: #000 !important;
      background-color: #fff !important;
      border-color: #000 !important;
      box-shadow: none !important;
      background-image: none !important;
    }
  `;
  document.head.appendChild(override);

  try {
    // 3) Now html2canvas will only see “safe” colors & no shadows
    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: "#FFFFFF",
    });
    return canvas.toDataURL("image/png");
  } finally {
    // 4) Tear down both the clone and our override stylesheet
    document.body.removeChild(clone);
    document.head.removeChild(override);
  }
}

/**
 * Convert a dataURL string ("data:image/png;base64,...") into a File object.
 */
export const dataURLtoFile = (dataUrl, fileName) => {
  const [header, base64] = dataUrl.split(",")
  const mimeMatch = header.match(/:(.*?);/)
  const mime = mimeMatch ? mimeMatch[1] : "image/png"
  const bstr = atob(base64)
  const len = bstr.length
  const u8arr = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    u8arr[i] = bstr.charCodeAt(i)
  }

  return new File([u8arr], fileName, { type: mime })
}
