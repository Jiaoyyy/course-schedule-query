const assert=require('node:assert/strict'),M=require('./dist/model.js');
const base={name:'测试课程',teacher:'测试教师',room:'101',day:1,start:1,end:2};
assert.equal(M.validate(base), '');
assert.match(M.validate({...base,start:4,end:2}),/节次/);
assert.match(M.validate({...base,name:'   '}),/填写/);
assert.match(M.validate({...base,day:8}),/节次/);
assert.match(M.validate({...base,start:2,end:3},[base]),/冲突/);
assert.match(M.validate({...base,start:1,end:4},[base]),/冲突/);
assert.equal(M.validate({...base,start:3,end:4},[base]),'');
assert.equal(M.validate({...base,day:2},[base]),'');
assert.equal(M.filter(M.samples,{day:6}).length,0);
assert.equal(M.filter(M.samples,{query:'  互联网  '})[0].id,'demo-5');
assert.equal(M.filter(M.samples,{teacher:'李老师',day:4}).length,1);
assert.equal(M.filter(M.samples,{query:'计算中心'})[0].id,'demo-9');
const accepted=[];for(const course of M.samples){assert.equal(M.validate(course,accepted),'');accepted.push(course);}
console.log('查询、组合筛选、空结果、输入校验及时间冲突检查通过。');
