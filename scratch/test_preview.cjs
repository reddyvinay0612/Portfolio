const sharp = require('sharp');

async function testComposite() {
  const textPng = await sharp({
    create: {
      width: 2000,
      height: 1906,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="2000" height="1906" viewBox="0 0 2000 1906" xmlns="http://www.w3.org/2000/svg">
            <text x="1000" y="930" 
                  font-family="system-ui, -apple-system, sans-serif" 
                  font-size="160" 
                  font-weight="900" 
                  text-anchor="middle" 
                  fill="#121316" 
                  letter-spacing="-3px">VINAYPRAKASH</text>
          </svg>
        `),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toBuffer();
  
  await sharp('public/osmo/layer1.webp')
    .composite([
      { input: 'public/osmo/layer2.webp', blend: 'over' },
      { input: textPng, blend: 'over' },
      { input: 'public/osmo/layer4-vinay.webp', blend: 'over' }
    ])
    .resize(1000, 953)
    .jpeg({ quality: 90 })
    .toFile('public/osmo/preview-full.jpg');
    
  console.log('Successfully generated public/osmo/preview-full.jpg');
}
testComposite();
