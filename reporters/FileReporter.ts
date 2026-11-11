import type {Reporter,FullConfig,TestCase,TestResult,TestStep,FullResult} from '@playwright/test/reporter';
import fs from 'node:fs';
import path from 'node:path';
// Không log request header, token, mật khẩu hoặc browser storage.
export default class FileReporter implements Reporter {
 private file='';
 private write(line:string){fs.appendFileSync(this.file,`${new Date().toISOString()} ${line}\n`);}
 onBegin(_config:FullConfig){fs.mkdirSync('logs',{recursive:true});this.file=path.join('logs','test-run.log');fs.writeFileSync(this.file,'');this.write('RUN BEGIN');}
 onTestBegin(test:TestCase){this.write(`START ${test.title}`);}
 onStepBegin(test:TestCase,_result:TestResult,step:TestStep){if(step.category==='test.step')this.write(`STEP ${test.title.split(' | ')[0]} ${step.title}`);}
 onTestEnd(test:TestCase,result:TestResult){this.write(`END ${test.title} | ${result.status} | ${result.duration}ms`);if(result.error)this.write(`ERROR ${(result.error.message||'').replace(/\u001b\[[0-9;]*m/g,'')}`);}
 onEnd(result:FullResult){this.write(`RUN END ${result.status}`);}
}
