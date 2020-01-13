const { join } = require('path');
const rollup = require('rollup');
const typescript2 = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');
const ts = require('typescript');
const project = require('./project');

async function createBundle() {
  if (process.argv.slice(2)[0] === 'bench') {
    console.log(`creating cjs bundle`);

    const bundle = await rollup.rollup({
      input: project.entry.path,
      plugins: [
        typescript2({
          tsconfig: project['tsconfig.json'].path,
          typescript: ts
        })
      ]
    });

    const fileName = join(project.dist.path, `seafox.cjs.js`);

    console.log(`writing ${fileName}`);

    await bundle.write({
      file: fileName,
      name: 'seafox',
      format: 'cjs'
    });
  } else {
    for (const type of ['normal', 'minified']) {
      console.log(`creating ${type} bundle`);

      const bundle = await rollup.rollup({
        input: project.entry.path,
        plugins: [
          typescript2({
            tsconfig: project['tsconfig.json'].path,
            typescript: ts
          }),
          ...(type === 'minified' ? [terser()] : [])
        ]
      });

      const suffix = type === 'minified' ? '.min' : '';

      // 'cjs' | 'esm' | 'umd'

      for (const format of ['esm']) {
        const fileName = join(project.dist.path, `seafox.${format}${suffix}.js`);

        console.log(`writing ${fileName}`);

        await bundle.write({
          file: fileName,
          name: 'seafox',
          format
        });
      }

      for (const format of ['umd']) {
        const fileName = join(project.dist.path, `seafox.${format}${suffix}.js`);

        console.log(`writing ${fileName}`);

        await bundle.write({
          file: fileName,
          exports: 'named',
          name: 'seafox',
          format
        });
      }
    }
  }

  console.log(`done`);
}

createBundle();
