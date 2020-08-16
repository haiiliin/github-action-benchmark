import { strict as A } from 'assert';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Parser as JsParser } from 'acorn';

describe('check assets/default_index.html', function() {
    it('is valid HTML and its script is valid as JavaScript', async function() {
        // Verify HTML syntax
        const html = await fs.readFile(join(__dirname, '../src/assets/default_index.html'), 'utf8');
        const q = cheerio.load(html);
        const s = q('#main-script');
        A.ok(s);
        const src = s.html();
        A.ok(src);

        // Verify JavaScript syntax. It raises an error if invalid
        JsParser.parse(src as string);
    });
});
