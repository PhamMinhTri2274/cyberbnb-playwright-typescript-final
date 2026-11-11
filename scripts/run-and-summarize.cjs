const {spawnSync}=require('node:child_process');
const cli=require.resolve('@playwright/test/cli');
const run=spawnSync(process.execPath,[cli,'test',...process.argv.slice(2)],{stdio:'inherit'});
const summary=spawnSync(process.execPath,[require.resolve('./summarize.cjs')],{stdio:'inherit'});
process.exitCode=run.status===0?(summary.status??1):(run.status??1);
