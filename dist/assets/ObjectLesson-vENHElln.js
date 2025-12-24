import{Q as u}from"./QueryFunction-DOmpSBpj.js";import{d as p,r as b,c as g,k as m,F as h,q as x,e as _,h as f,i as w,j as v,m as i,_ as y}from"./index-uUoRXPJ3.js";const t=[{question:"提交时报错并丢失代码：husky - pre-commit script failed (code 1) ，怎么找回?",tag:"git",answer:`<ol>
            <li>试着查看暂存库列表：<green>git stash list </green></li>
            <li>恢复暂存库：<green>git stash  apply </green></li>
        </ol>`},{question:"Chrome 浏览器渲染页面频繁闪屏导致整个浏览器不能使用！",tag:"Chrome",answer:`<ol>
            <li>打开浏览器设置-系统：chrome://settings/system</li>
            <li>使用图形加速功能（如果可用）：关闭此配置</li>
            <li>重启浏览器</li>
        </ol>`},{question:"nginx: [emerg] bind() to 0.0.0.0:port failed (98: Address already in use)",tag:"Nginx",answer:`<ol>
            <li>
                第一步检查端口占用情况：<green>netstat -apn  | grep  port</green>，以9090端口为例，输出结果如下：
                <div>[root@xxxs sbin]# netstat -apn  | grep  9090</div>
                <div>tcp        0      0 0.0.0.0:9090            0.0.0.0:*  </div>
                <div>LISTEN      9090/nginx: worker </div>
            </li>
            <li>第二步强制杀掉：<green>kill -9 port</green></li>
            <li>
                第三步重启nginx服务器：
                <green>
                    <div>cd /usr/local/nginx(nginx文件夹)/sbin</div>
                    <div>./nginx -s reload</div>
                </green>
            </li>
        </ol>`},{question:"u盘或移动硬盘大于4GB的文件无法存储",tag:"其它",answer:`<ol>
            <div>因为u盘或硬盘默认格式是<orange>FAT32</orange>，它的单个文件大小限制为4GB，所以需要格式化为其它格式，如下：</div>
            <li>格式化为<green>NTFS</green>，属于微软的专利，无法在Mac系统使用</li>
            <li>格式化为<green>exFAT</green>，兼容性好，单个文件上限可达16EB</li>
        </ol>`},{question:"github master分支下的dist文件夹推送到gh-pages分支",tag:"git",answer:`<ol>
            <li>第一步前提条件：dist需先提交到master分支</li>
            <li>第二步快捷命令：<green>git subtree push --prefix dist origin gh-pages</green></li>
            <li>强制推送快捷命令：<green>git push origin 'git subtree split --prefix dist main':gh-pages --force </green></li>
        </ol>`},{question:"为什么CSS中的calc函数可能会不生效？",tag:"CSS",answer:`<ol>
            <li>运算符之间没加空格，错误示例如：<red>width: calc(100%-50px);</red></li>
            <li>运算值没带单位，错误示例如：<red>width: calc(0 + 100px);</red></li>
            <li>低版本less处理calc冲突，代码编译前：<green>width: calc(100% - 50px);</green>编译后：<red>width: calc(50%);</red>，解决方法如下：<green>~'anything'</green></li>
        </ol>`},{question:"MacOS上Node版本的管理工具 n",tag:"Node",answer:`<ol>
            <li>下载管理工具n：<green>npm i -g n</green> 或 <green>yarn global add n</green></li>
            <li>
                安装Node版本 <br/> 
                指定版本：<green>n version </green>，如：n 18.12.1 <br/>
                稳定版本：<green>n lts/stable</green> <br/>
                最新版本：<green>n latest/current</green> <br/>
            </li>
            <li>
                删除Node版本 <br/> 
                指定版本：<red>n rm/- version </red> <br/>
                当前版本：<red>n uninstall</red> <br/>
                当前以外的版本：<red>n prune</red> <br/>
            </li>
        </ol>`}],q={class:"lesson"},k=["innerHTML"],N=p({__name:"ObjectLesson",setup(B){const s=b(t),l={},a=[];t.forEach(e=>{l[e.tag]||(l[e.tag]=!0,a.push({label:e.tag,value:e.tag}))});function d(e){let o=e.selectVal?t.filter(n=>n.tag===e.selectVal):t;const r=e.inputVal||"";s.value=o.filter(n=>n.answer.includes(r)||n.tag.includes(r))}return(e,o)=>{const r=v("n-card");return i(),g("div",q,[m(u,{options:a,style:{"margin-bottom":"20px"},top:"20px",onQuery:d}),(i(!0),g(h,null,x(s.value,(n,c)=>(i(),_(r,{key:c,title:`${n.question}🍎🍎🍎${n.tag}`,"header-style":"background:rgba(24, 160, 88, 0.2)","content-style":"background:rgba(24, 160, 88, 0.1)"},{default:f(()=>[w("div",{innerHTML:n.answer,class:"answer"},null,8,k)]),_:2},1032,["title"]))),128))])}}}),S=y(N,[["__scopeId","data-v-c44baa25"]]);export{S as default};
