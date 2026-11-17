import { Project } from '../data/portfolioData';

/**
 * Generates an ultra-crisp, high-DPI raster texture for a Project card
 * formatted in the Clyde signature luxury light & sage (#b1b493) aesthetic.
 * Renders into an offscreen HTML5 Canvas and returns a PNG data URL.
 */
export function generateProjectCardTexture(project: Project): string {
  if (typeof document === 'undefined') return '';

  const width = 760;
  const height = 980;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Base Crisp White / Off-White Card Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.6, '#FBFBF9');
  bgGrad.addColorStop(1, '#F4F5EF');
  ctx.fillStyle = bgGrad;
  roundRect(ctx, 0, 0, width, height, 40);
  ctx.fill();

  // 2. Sage (#b1b493) Ambient Glow from Top-Right
  const glow = ctx.createRadialGradient(width - 80, 80, 20, width - 80, 80, 360);
  glow.addColorStop(0, 'rgba(177, 180, 147, 0.28)');
  glow.addColorStop(0.5, 'rgba(177, 180, 147, 0.08)');
  glow.addColorStop(1, 'rgba(177, 180, 147, 0)');
  ctx.fillStyle = glow;
  roundRect(ctx, 0, 0, width, height, 40);
  ctx.fill();

  // 3. Sage Ambient Glow from Bottom-Left
  const bGlow = ctx.createRadialGradient(80, height - 80, 20, 80, height - 80, 320);
  bGlow.addColorStop(0, 'rgba(177, 180, 147, 0.18)');
  bGlow.addColorStop(1, 'rgba(177, 180, 147, 0)');
  ctx.fillStyle = bGlow;
  roundRect(ctx, 0, 0, width, height, 40);
  ctx.fill();

  // 4. Subtle Clean Tech Dots Grid Pattern
  ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
  for (let x = 30; x < width - 30; x += 32) {
    for (let y = 30; y < height - 30; y += 32) {
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  // 5. Card Border with Clyde Sage Gradient
  const borderGrad = ctx.createLinearGradient(0, 0, width, height);
  borderGrad.addColorStop(0, 'rgba(177, 180, 147, 0.75)');
  borderGrad.addColorStop(0.35, 'rgba(177, 180, 147, 0.35)');
  borderGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.08)');
  borderGrad.addColorStop(1, 'rgba(177, 180, 147, 0.6)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2.5;
  roundRect(ctx, 1.5, 1.5, width - 3, height - 3, 40);
  ctx.stroke();

  // Internal Padding
  const padX = 48;
  let cursorY = 64;

  // 6. Category Pill Badge
  ctx.font = '600 18px "Poppins", -apple-system, system-ui, sans-serif';
  const catText = project.category.toUpperCase();
  const catWidth = ctx.measureText(catText).width;
  const pillPadX = 18;
  const pillHeight = 36;
  
  ctx.fillStyle = 'rgba(177, 180, 147, 0.18)';
  roundRect(ctx, padX, cursorY, catWidth + pillPadX * 2, pillHeight, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(177, 180, 147, 0.5)';
  ctx.lineWidth = 1.2;
  roundRect(ctx, padX, cursorY, catWidth + pillPadX * 2, pillHeight, 18);
  ctx.stroke();

  ctx.fillStyle = '#4e5135';
  ctx.fillText(catText, padX + pillPadX, cursorY + 24);

  // Period / Role on Top Right
  if (project.period) {
    ctx.font = '500 17px monospace, sans-serif';
    ctx.fillStyle = '#6c757d';
    ctx.textAlign = 'right';
    ctx.fillText(project.period, width - padX, cursorY + 24);
    ctx.textAlign = 'left';
  }

  cursorY += 66;

  // 7. Project Title
  ctx.font = '800 34px "Poppins", -apple-system, system-ui, sans-serif';
  
  // Wrap title lines if too long
  const titleWords = project.title.split(' ');
  let titleLine = '';
  const maxTitleW = width - padX * 2;
  const titleLines: string[] = [];
  
  for (const word of titleWords) {
    const testLine = titleLine ? `${titleLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxTitleW && titleLine) {
      titleLines.push(titleLine);
      titleLine = word;
    } else {
      titleLine = testLine;
    }
  }
  if (titleLine) titleLines.push(titleLine);

  for (let i = 0; i < titleLines.length; i++) {
    ctx.fillStyle = i === 0 ? '#000000' : '#8e916c';
    ctx.fillText(titleLines[i], padX, cursorY + 32);
    cursorY += 40;
  }

  cursorY += 12;

  // 8. Status Badge
  if (project.statusBadge) {
    ctx.font = '700 15px monospace, sans-serif';
    const badgeText = `★  ${project.statusBadge.toUpperCase()}`;
    const badgeW = ctx.measureText(badgeText).width;
    const bHeight = 32;

    ctx.fillStyle = 'rgba(177, 180, 147, 0.22)';
    roundRect(ctx, padX, cursorY, badgeW + 28, bHeight, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(177, 180, 147, 0.55)';
    ctx.lineWidth = 1;
    roundRect(ctx, padX, cursorY, badgeW + 28, bHeight, 16);
    ctx.stroke();

    ctx.fillStyle = '#4e5135';
    ctx.fillText(badgeText, padX + 14, cursorY + 21);
    cursorY += 48;
  }

  // 9. Short Description (Multiline)
  ctx.font = '400 19px "Poppins", -apple-system, system-ui, sans-serif';
  ctx.fillStyle = '#55595d';
  const descWords = project.description.split(' ');
  let descLine = '';
  let lineCount = 0;
  for (const word of descWords) {
    const testLine = descLine ? `${descLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxTitleW && descLine) {
      ctx.fillText(descLine, padX, cursorY + 22);
      descLine = word;
      cursorY += 28;
      lineCount++;
      if (lineCount >= 3) break;
    } else {
      descLine = testLine;
    }
  }
  if (descLine && lineCount < 3) {
    ctx.fillText(descLine, padX, cursorY + 22);
    cursorY += 34;
  }

  cursorY += 18;

  // 10. Key Highlights (2-3 items)
  ctx.font = '500 17px "Poppins", -apple-system, system-ui, sans-serif';
  const highlights = project.highlights.slice(0, 3);
  for (const hl of highlights) {
    ctx.fillStyle = '#b1b493';
    ctx.fillText('✦', padX, cursorY + 20);

    ctx.fillStyle = '#212529';
    // Truncate highlight if too wide
    let truncated = hl;
    while (ctx.measureText(truncated).width > maxTitleW - 32 && truncated.length > 20) {
      truncated = truncated.slice(0, -4) + '...';
    }
    ctx.fillText(truncated, padX + 26, cursorY + 20);
    cursorY += 32;
  }

  // 11. Tech Stack Pills at the Bottom
  const bottomY = height - 160;
  ctx.font = '600 15px monospace, sans-serif';
  let pillX = padX;
  let pillRowY = bottomY;
  const maxPillRowW = width - padX * 2;

  for (const tech of project.technologies.slice(0, 8)) {
    const tWidth = ctx.measureText(tech).width;
    const pW = tWidth + 24;
    const pH = 32;

    if (pillX + pW > padX + maxPillRowW) {
      pillX = padX;
      pillRowY += 40;
      if (pillRowY > height - 90) break;
    }

    ctx.fillStyle = '#f4f5ee';
    roundRect(ctx, pillX, pillRowY, pW, pH, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(177, 180, 147, 0.45)';
    ctx.lineWidth = 1;
    roundRect(ctx, pillX, pillRowY, pW, pH, 8);
    ctx.stroke();

    ctx.fillStyle = '#3a3d24';
    ctx.fillText(tech, pillX + 12, pillRowY + 21);
    pillX += pW + 10;
  }

  // 12. Bottom CTA Bar
  const ctaY = height - 64;
  const ctaGrad = ctx.createLinearGradient(padX, ctaY, width - padX, ctaY);
  ctaGrad.addColorStop(0, '#b1b493');
  ctaGrad.addColorStop(0.5, '#9a9d7c');
  ctaGrad.addColorStop(1, '#b1b493');
  ctx.fillStyle = ctaGrad;
  roundRect(ctx, padX, ctaY, width - padX * 2, 40, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(177, 180, 147, 0.9)';
  ctx.lineWidth = 1.2;
  roundRect(ctx, padX, ctaY, width - padX * 2, 40, 20);
  ctx.stroke();

  ctx.font = '700 15px monospace, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('✦ DRAG TO ROTATE  •  CLICK TO EXPAND ✦', width / 2, ctaY + 25);
  ctx.textAlign = 'left';

  return canvas.toDataURL('image/png');
}

/** Helper to draw a rounded rectangle path on canvas */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
