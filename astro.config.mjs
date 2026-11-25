import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.pflichtteilsretter.de',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !['/danke/', '/impressum/', '/datenschutz/', '/ratgeber/sonderfaelle/'].some((p) => page.includes(p)) })],
});
