(function(root){
  const days=['周一','周二','周三','周四','周五','周六','周日'];
  const samples=[
    {id:'demo-1',name:'高等数学',teacher:'陈老师',room:'理教 201',day:1,start:1,end:2},
    {id:'demo-2',name:'大学英语',teacher:'李老师',room:'二教 305',day:1,start:5,end:6},
    {id:'demo-3',name:'数据结构',teacher:'王老师',room:'理教 402',day:2,start:3,end:4},
    {id:'demo-4',name:'体育',teacher:'刘老师',room:'东操场',day:2,start:7,end:8},
    {id:'demo-5',name:'互联网软件开发',teacher:'张老师',room:'三教 3202',day:3,start:1,end:4},
    {id:'demo-6',name:'线性代数',teacher:'陈老师',room:'理教 208',day:3,start:7,end:8},
    {id:'demo-7',name:'大学英语',teacher:'李老师',room:'二教 305',day:4,start:1,end:2},
    {id:'demo-8',name:'计算机网络',teacher:'赵老师',room:'理教 405',day:4,start:5,end:6},
    {id:'demo-9',name:'数据结构实验',teacher:'王老师',room:'计算中心 102',day:5,start:3,end:4},
    {id:'demo-10',name:'通识选修',teacher:'周老师',room:'一教 108',day:5,start:9,end:10}
  ];
  function validate(c,courses=[]){
    if(!['name','teacher','room'].every(k=>typeof c[k]==='string'&&c[k].trim()))return '请填写课程名称、教师和教室。';
    if(c.name.length>40||c.teacher.length>20||c.room.length>30)return '填写内容超过长度限制。';
    if(!Number.isInteger(c.day)||c.day<1||c.day>7||!Number.isInteger(c.start)||!Number.isInteger(c.end)||c.start<1||c.end>12||c.start>c.end)return '请选择有效节次，结束节次不能早于开始节次。';
    const conflict=courses.find(x=>x.day===c.day&&x.start<=c.end&&x.end>=c.start);
    return conflict?`与「${conflict.name}」（第 ${conflict.start}–${conflict.end} 节）时间冲突，请调整节次。`:'';
  }
  function filter(courses,{day=0,teacher='',query=''}={}){const q=query.trim().toLocaleLowerCase();return courses.filter(c=>(!day||c.day===day)&&(!teacher||c.teacher===teacher)&&(!q||[c.name,c.teacher,c.room].some(x=>x.toLocaleLowerCase().includes(q)))).sort((a,b)=>a.day-b.day||a.start-b.start);}
  const api={days,samples,validate,filter};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ScheduleModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
