(this["webpackJsonppath-finder"]=this["webpackJsonppath-finder"]||[]).push([[0],{11:function(t,e,i){t.exports=i(18)},16:function(t,e,i){},17:function(t,e,i){},18:function(t,e,i){"use strict";i.r(e);var n=i(0),s=i.n(n),h=i(5),r=i.n(h),a=(i(16),i(17),i(2)),o=i(3),l=i(9),d=i(6),c=i(1),u=i(10),f=function(t){var e=t.finder,i=t.reset,n=t.uiMode;return e?s.a.createElement("div",{id:"uiContainer",className:"fancyShadow"},s.a.createElement("h1",{className:"fancyShadow infoHeader"},n),s.a.createElement("button",{className:"fancyShadow",onClick:function(){return e.findRandomPath()}},"random path"),s.a.createElement("button",{className:"fancyShadow",onClick:function(){return e.runStep()}},"STEP"),s.a.createElement("button",{className:"fancyShadow",onClick:function(){return e.run()}},"START"),s.a.createElement("button",{className:"fancyShadow active",onClick:i},"RESET")):s.a.createElement("div",{id:"uiContainer",className:"fancyShadow"},s.a.createElement("h1",{className:"fancyShadow infoHeader"},"LOADING"))};var g=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},p=i(7),v=function(){function t(){Object(a.a)(this,t),this.uiFunction=function(){return console.log("no function to update react ui set")},this.openSet=new Set,this.closedSet=new Set,this.loop=null,this.steps=0,this.finished=!1,this.running=!1,this.path=[],this.setHeuristic=function(t,e){return Math.hypot(e.x-t.x,e.y-t.y)},this.checkDia=function(t,e){return t.x-e.x&&t.y-e.y?1.414:1}}return Object(o.a)(t,[{key:"init",value:function(t,e,i){this.field=t,this.drawFunction=e,i&&(this.uiFunction=i),this.fieldWidth=this.field[0].length,this.fieldHeight=this.field.length,this.reset()}},{key:"reset",value:function(){this.finished=!1,this.running=!1,this.steps=0,this.path=[],this.loop&&clearTimeout(this.loop),this.openSet.clear(),this.closedSet.clear(),this.fillField(),this.start=null,this.end=null,this.fieldFlat=this.field.flat(1),this.drawField(),this.uiFunction("SET START")}},{key:"setStart",value:function(t,e){this.start=this.field[e][t],this.start.draw=1,this.openSet.add(this.start),this.uiFunction("SET END")}},{key:"setEnd",value:function(t,e){this.end=this.field[e][t],this.end.draw=3,this.uiFunction("SET BLOCKED")}},{key:"setStartNode",value:function(t){this.start=t,this.start.draw=1,this.openSet.add(this.start),this.uiFunction("SET END")}},{key:"setEndNode",value:function(t){this.end=t,this.end.draw=3,this.uiFunction("SET BLOCKED")}},{key:"findRandomPath",value:function(){this.randomStart(),this.randomEnd(),this.run()}},{key:"findFromTo",value:function(t,e){this.start=t,this.end=e,this.run()}},{key:"run",value:function(){var t=this;return this.finished||this.running?(this.uiFunction("RESET FIRST"),console.log("reset before starting a new finder")):this.field.length&&this.drawFunction?this.start?this.end?(this.drawField(),this.findValidPaths(),this.uiFunction("RUNNING"),this.running=!0,void(this.loop=setInterval((function(){t.step()}),10))):console.log("please set a end node. setEnd(x,y)"):console.log("please set a start node. setStart(x,y)"):console.log("seems like init failed")}},{key:"runStep",value:function(){if(this.finished||this.running)return this.uiFunction("RESET FIRST"),console.log("reset before starting a new finder");if(!this.steps){if(!this.field.length||!this.drawFunction)return console.log("seems like init failed");if(!this.start)return console.log("please set a start node. setStart(x,y)");if(!this.end)return console.log("please set a end node. setEnd(x,y)");this.drawField(),this.findValidPaths(),this.uiFunction("CLICK STEP OR RUN")}this.step()}},{key:"step",value:function(){this.openSet.size?(this.findLowestFScore(),this.updateSets(),this.checkNeigbors(),this.drawField(),this.steps++):(clearInterval(this.loop),this.finished=!0,this.running=!1,this.uiFunction("COULD NOT BE SOLVED"),console.log("could not be solved! :("))}},{key:"drawField",value:function(){this.drawFunction(Object(p.a)(this.fieldFlat))}},{key:"createPath",value:function(){for(var t=[],e=this.current;e.cameFrom;)t.push(e),e=e.cameFrom;return t}},{key:"drawPath",value:function(){for(var t=this.createPath(),e=0;e<t.length;e++)t[e].draw=4;this.start.draw=1,this.end.draw=3}},{key:"findLowestFScore",value:function(){this.min=this.openSet.values().next().value;var t=!0,e=!1,i=void 0;try{for(var n,s=this.openSet[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var h=n.value;h.f<this.min.f&&(this.min=h)}}catch(r){e=!0,i=r}finally{try{t||null==s.return||s.return()}finally{if(e)throw i}}this.current=this.min}},{key:"updateSets",value:function(){if(this.current===this.end)return clearTimeout(this.loop),this.current.draw=3,console.log("solved! :3"),this.finished=!0,this.uiFunction("SOLVED! :)"),this.drawPath();this.openSet.delete(this.current),this.closedSet.add(this.current),this.current.draw=2}},{key:"checkNeigbors",value:function(){for(var t=0;t<this.current.neighbors.length;t++)if(!this.closedSet.has(this.current.neighbors[t])){var e=this.current.g+this.checkDia(this.current,this.current.neighbors[t]);if(this.openSet.has(this.current.neighbors[t])){if(e>=this.current.neighbors[t].g)continue}else this.openSet.add(this.current.neighbors[t]);this.current.neighbors[t].g=e,this.current.neighbors[t].cameFrom=this.current,this.current.neighbors[t].h=this.setHeuristic(this.current.neighbors[t],this.end),this.current.neighbors[t].f=this.current.neighbors[t].h+this.current.neighbors[t].g}}},{key:"findNeighbors",value:function(){for(var t=0;t<this.fieldHeight;t++)for(var e=0;e<this.fieldWidth;e++)t>0&&this.field[t][e].neighbors.push(this.field[t-1][e]),e<this.fieldWidth-1&&this.field[t][e].neighbors.push(this.field[t][e+1]),t<this.fieldHeight-1&&this.field[t][e].neighbors.push(this.field[t+1][e]),e>0&&this.field[t][e].neighbors.push(this.field[t][e-1])}},{key:"findValidPaths",value:function(){for(var t=0;t<this.fieldHeight;t++)for(var e=0;e<this.fieldWidth;e++)t>0&&!this.field[t-1][e].blocked&&this.field[t][e].neighbors.push(this.field[t-1][e]),t>0&&e<this.fieldWidth-1&&!this.field[t-1][e+1].blocked&&this.field[t][e].neighbors.push(this.field[t-1][e+1]),e<this.fieldWidth-1&&!this.field[t][e+1].blocked&&this.field[t][e].neighbors.push(this.field[t][e+1]),t<this.fieldHeight-1&&e<this.fieldWidth-1&&!this.field[t+1][e+1].blocked&&this.field[t][e].neighbors.push(this.field[t+1][e+1]),t<this.fieldHeight-1&&!this.field[t+1][e].blocked&&this.field[t][e].neighbors.push(this.field[t+1][e]),t<this.fieldHeight-1&&e>0&&!this.field[t+1][e-1].blocked&&this.field[t][e].neighbors.push(this.field[t+1][e-1]),e>0&&!this.field[t][e-1].blocked&&this.field[t][e].neighbors.push(this.field[t][e-1]),t>0&&e>0&&!this.field[t-1][e-1].blocked&&this.field[t][e].neighbors.push(this.field[t-1][e-1])}},{key:"randomStart",value:function(){this.setStart(g(0,this.fieldWidth-1),g(0,this.fieldHeight-1))}},{key:"randomEnd",value:function(){this.setEnd(g(0,this.fieldWidth-1),g(0,this.fieldHeight-1))}},{key:"fillField",value:function(t){for(var e=0;e<this.fieldHeight;e++)for(var i=0;i<this.fieldWidth;i++)this.field[e][i]=new b(i,e,t)}}]),t}(),b=function t(e,i,n){Object(a.a)(this,t),this.neighbors=[],this.f=0,this.g=0,this.h=0,this.draw=0,this.blocked=!1,this.x=e,this.y=i,this.size=n},m=i(8),w=["white","red","green","blue","yellow","black"],y=Object(n.memo)((function(t){var e=t.width,i=t.height,h=t.item,r=t.nodeOnClick,a=t.createWall,o=Object(n.useState)(w[h.draw]),l=Object(m.a)(o,2),d=l[0],c=l[1];return s.a.createElement("div",{onClick:function(){r(h),c(w[h.draw])},onMouseMove:function(t){1===t.buttons&&(a(h),c(w[h.draw]))},className:"cell",style:{width:"".concat(e,"px"),height:"".concat(i,"px"),left:"".concat(h.x*e,"px"),top:"".concat(h.y*i,"px"),backgroundColor:d}})})),S=function(t){function e(t){var i;return Object(a.a)(this,e),(i=Object(l.a)(this,Object(d.a)(e).call(this,t))).fieldRef=s.a.createRef(),i.field=function(t,e){for(var i=new Array(e),n=0;n<i.length;n++)i[n]=new Array(t).fill(0);return i}(i.props.col||20,i.props.row||20),i.finder=new v,i.callAfterCss=i.callAfterCss.bind(Object(c.a)(i)),i.nodeOnClick=i.nodeOnClick.bind(Object(c.a)(i)),i.createWall=i.createWall.bind(Object(c.a)(i)),i.reset=i.reset.bind(Object(c.a)(i)),i.waitForCss=null,i.state={width:0,height:0,field:[],uiMode:"pending"},i}return Object(u.a)(e,t),Object(o.a)(e,[{key:"reset",value:function(){this.setState({uiMode:"set start"}),this.finder.reset(),this.finder.drawField()}},{key:"componentDidMount",value:function(){this.waitForCss=requestAnimationFrame(this.callAfterCss)}},{key:"callAfterCss",value:function(){var t=this;if(this.fieldRef.current&&this.field.length&&this.waitForCss){if(this.fieldRef.current.clientWidth>0){var e=this.fieldRef.current.clientWidth/this.field[0].length;this.setState({width:e,height:e,uiMode:"set start"})}else if(this.fieldRef.current.clientHeight>0){var i=this.fieldRef.current.clientHeight/this.field[0].length;this.setState({width:i,height:i,uiMode:"set start"})}this.finder.init(this.field,(function(e){return t.setState({field:e})}),(function(e){return t.setState({uiMode:e})})),cancelAnimationFrame(this.callAfterCss)}}},{key:"nodeOnClick",value:function(t){return this.finder&&this.finder.finished?console.log("already finished. reset and start again"):this.finder&&this.finder.running?console.log("currently running. reset and start again"):"SET START"===this.state.uiMode?this.finder.setStartNode(t):"SET END"===this.state.uiMode?this.finder.setEndNode(t):void 0}},{key:"createWall",value:function(t){if(this.finder&&this.finder.finished)return console.log("already finished. reset and start again");if(this.finder&&this.finder.running)return console.log("currently running. reset and start again");if("SET BLOCKED"===this.state.uiMode){if(t===this.finder.start||t===this.finder.end)return;t.draw=5,t.blocked=!0}}},{key:"render",value:function(){var t=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(f,{finder:this.finder,reset:this.reset,uiMode:this.state.uiMode}),s.a.createElement("div",{className:"fieldContainer fancyShadow"},s.a.createElement("div",{style:{height:"".concat(this.state.height*this.props.col,"px")},ref:this.fieldRef,className:"field"},this.state.field.map((function(e){return s.a.createElement(y,{key:"key"+e.x+"_"+e.y+"_"+e.draw,width:t.state.width,height:t.state.height,item:e,nodeOnClick:t.nodeOnClick,createWall:t.createWall})})))))}}]),e}(n.Component);var k=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(S,{row:24,col:24}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[11,1,2]]]);
//# sourceMappingURL=main.c35676e1.chunk.js.map