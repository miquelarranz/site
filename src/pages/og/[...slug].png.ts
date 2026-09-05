import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

// Load font for satori (Inter as fallback; we'll use a system font approach)
let fontData: ArrayBuffer | null = null;
function getFont(): ArrayBuffer {
  if (fontData) return fontData;
  // Try to use a bundled font from node_modules if available
  const possible = [
    path.join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff'),
    path.join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff'),
  ];
  for (const p of possible) {
    if (fs.existsSync(p)) {
      fontData = fs.readFileSync(p).buffer as ArrayBuffer;
      return fontData;
    }
  }
  throw new Error('No font found for OG image generation. Run: npm install @fontsource/inter');
}

function ogHtml(title: string, description: string) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '64px',
        background: '#fcfbf8',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontSize: '14px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#6b6862',
              marginBottom: '24px',
              fontWeight: '400',
            },
            children: 'miquelarranz.com',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: title.length > 50 ? '40px' : '52px',
              fontWeight: '600',
              color: '#1b1a17',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              maxWidth: '900px',
            },
            children: title,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: '22px',
              color: '#6b6862',
              lineHeight: '1.5',
              maxWidth: '800px',
            },
            children: description,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '64px',
              right: '64px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#9a5b34',
            },
          },
        },
      ],
    },
  };
}

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, description: post.data.description },
  }));
}

export async function GET({ props }: APIContext) {
  const { title, description } = props as { title: string; description: string };

  let font: ArrayBuffer;
  try {
    font = getFont();
  } catch {
    // Fallback: return a simple 1x1 transparent PNG so build doesn't fail
    const fallback = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
    return new Response(fallback, { headers: { 'Content-Type': 'image/png' } });
  }

  const svg = await satori(ogHtml(title, description) as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Inter', data: font, weight: 400, style: 'normal' }],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const pngData = resvg.render().asPng();

  return new Response(new Uint8Array(pngData), {
    headers: { 'Content-Type': 'image/png' },
  });
}
