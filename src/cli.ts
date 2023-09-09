#!/usr/bin/env node
import { Command } from '@commander-js/extra-typings';
import pkg from 'package.json';

import { generateDirectusSchema } from '@/index';

const program = new Command();

program
  .name('directus-typegen')
  .version(pkg.version)
  .option('-u, --url <url>', 'Directus API url')
  .option('-t, --token <token>', 'Directus API token')
  .option('-o, --out <filename>', 'Output file name')
  .action((p) => {
    console.log('Generating Directus schema...');
    return generateDirectusSchema(p.url, p.token, p.out);
  });

program.parse(process.argv);
