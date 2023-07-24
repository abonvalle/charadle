"use strict";(self.webpackChunkwordle=self.webpackChunkwordle||[]).push([[486],{7406:(S,m,r)=>{r.d(m,{t:()=>x});var d=r(12),c=r(755),p=r(4063),e=r(5158),v=r(7217),h=r(6733);class f{constructor(n,t){this._document=t;const o=this._textarea=this._document.createElement("textarea"),i=o.style;i.position="fixed",i.top=i.opacity="0",i.left="-999em",o.setAttribute("aria-hidden","true"),o.value=n,o.readOnly=!0,this._document.body.appendChild(o)}copy(){const n=this._textarea;let t=!1;try{if(n){const o=this._document.activeElement;n.select(),n.setSelectionRange(0,n.value.length),t=this._document.execCommand("copy"),o&&o.focus()}}catch{}return t}destroy(){const n=this._textarea;n&&(n.remove(),this._textarea=void 0)}}let C=(()=>{class s{constructor(t){this._document=t}copy(t){const o=this.beginCopy(t),i=o.copy();return o.destroy(),i}beginCopy(t){return new f(t,this._document)}}return s.\u0275fac=function(t){return new(t||s)(c.LFG(h.K0))},s.\u0275prov=c.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),x=(()=>{class s{constructor(t,o,i,a){this._gameService=t,this._jokersService=o,this._snackbarService=i,this._clipboard=a}shareScore(){const t=this.generateShareData();this._copyFallback(t.text??"")}generateShareData(){const t=this._gameService.success$.value?this._gameService.currentActiveBoardLine$.value:"\u{1f480}",o=this._gameService.getTries(),i=this._gameService.wordle$.value.date,a=this.getScore(),l=[`Name Guessr ${d.N.version.label} #${i} \u{1f3af}${a}pts \u270d\ufe0f${t}/6`];return o?.forEach(g=>{l.push(g)}),l.push(this.getSharingJokersData()),l.push(d.N.version.link),{text:l.join("\n")}}getSharingJokersData(){const t=this._jokersService.paintJoker$.value?.useCount,o=this._jokersService.placeLetterJoker$.value?.useCount,i=this._jokersService.serieJoker$.value?.useCount;return 0!==t||0!==o||0!==i?`\u{1f58c}\ufe0fx${t}, \u{1f524}x${o}, \u{1f3a5}x${i}`:"0x\u{1f0cf}"}getScore(){const t=this._gameService.wordle$.value.difficulty??1,i=this._jokersService.paintJoker$.value,a=this._jokersService.placeLetterJoker$.value,l=this._jokersService.serieJoker$.value;if(this._gameService.end$.value&&!this._gameService.success$.value||!i||!a||!l)return 0;let u=100;return u-=l.useCount>0?10-(t-1):0,u-=19/i.maxUse*i.useCount,u-=36/a.maxUse*a.useCount,u-=(2-.25*(t-1))*Math.pow((this._gameService.currentActiveBoardLine$.value??0)-.5,2),Math.round(u>100?100:u)}_navShare(t){navigator.share?navigator.share(t).then(()=>console.log("Successful share!")).catch(o=>{console.error(o),this._copyFallback(t.text??"")}):this._copyFallback(t.text??"")}_copyFallback(t){""!==t.trim()&&this._copyLongText(t)?this._snackbarService.openSnackBar("Copi\xe9 \u{1f44c}","success"):this._snackbarService.openSnackBar("Impossible de copier le r\xe9sultat \u{1f937}","alert")}_copyLongText(t){const o=this._clipboard.beginCopy(t);let a,i=3;do{a=o.copy()}while(!a||--i);return o.destroy(),!!a}}return s.\u0275fac=function(t){return new(t||s)(c.LFG(p.h),c.LFG(e.j),c.LFG(v.o),c.LFG(C))},s.\u0275prov=c.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},3486:(S,m,r)=>{r.r(m),r.d(m,{ResultatPageModule:()=>x});var d=r(7406),c=r(4583),p=r(353),e=r(755),v=r(4063),h=r(6733);function f(s,n){if(1&s&&(e.TgZ(0,"div",19),e._uU(1),e.qZA()),2&s){const t=n.$implicit;e.xp6(1),e.hij(" ",t," ")}}function C(s,n){if(1&s){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",1)(2,"div",2)(3,"h1",3),e._uU(4),e.qZA(),e._UZ(5,"img",4),e.TgZ(6,"div",5)(7,"p",6),e._uU(8),e.qZA(),e.TgZ(9,"p",7),e._uU(10," de "),e.qZA(),e.TgZ(11,"p",8),e._uU(12),e.qZA()(),e.TgZ(13,"div",9)(14,"p"),e._uU(15),e.qZA(),e.TgZ(16,"p"),e._uU(17),e.ALo(18,"async"),e.qZA(),e.TgZ(19,"p"),e._uU(20),e.qZA()(),e.TgZ(21,"div",10),e.YNc(22,f,2,1,"div",11),e.TgZ(23,"a",12)(24,"p",13),e._uU(25,"Voir les essais"),e.qZA()()(),e.TgZ(26,"div",14)(27,"p",15),e._uU(28,"Partagez votre score :"),e.qZA(),e.TgZ(29,"div",16)(30,"i",17),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.shareService.shareScore())}),e.qZA()()(),e.TgZ(31,"p",18),e._uU(32),e.qZA()()(),e.BQk()}if(2&s){const t=n.$implicit,o=e.oxw();e.xp6(4),e.hij(" ",o.gameMsg," "),e.xp6(1),e.Q6J("src",null==t?null:t.imgPath,e.LSH)("alt",null==t?null:t.fullname),e.xp6(3),e.hij(" ",null==t?null:t.fullname," "),e.xp6(4),e.hij(" ",null==t?null:t.serie," "),e.xp6(3),e.hij("\u{1f3af}",o.shareService.getScore()," pts"),e.xp6(2),e.hij("",e.lcZ(18,12,o.gameService.currentActiveBoardLine$),"/6 essais"),e.xp6(3),e.Oqu(o.jokerData),e.xp6(2),e.Q6J("ngForOf",o.tries)("ngForTrackBy",o.trackByFn),e.xp6(1),e.Q6J("routerLink","/"),e.xp6(9),e.hij("Prochain nom dans : ",o.timeLeftStr,"")}}const y=[{path:"",component:(()=>{class s{get gameMsg(){return this.gameService.success$.value?"gojo"===this.gameService.wordle$.value.text?"Kyoshiki Murasaki":"Gagn\xe9 !":"Si proche..."}constructor(t,o,i){this.shareService=t,this.gameService=o,this._cdr=i,this.panelOpenState=!0,this.tries=[],this.jokerData="",this.timeLeftStr="--h--",this.interval=null}ngOnInit(){this.tries=this.gameService.getTries()??[],this.jokerData=this.shareService.getSharingJokersData(),this.startTimer()}ngOnDestroy(){this.pauseTimer()}openPanel(){this.panelOpenState=!0,this.startTimer(),this._cdr.detectChanges()}closePanel(){this.panelOpenState=!1,this.pauseTimer(),this._cdr.detectChanges()}startTimer(){this.timeLeftStr=this.calculateTimeLeft(),this._cdr.detectChanges(),this.interval=setInterval(()=>{this.timeLeftStr=this.calculateTimeLeft(),this._cdr.detectChanges()},1e3)}calculateTimeLeft(){const t=new Date,o=new Date;o.setHours(24,0,0,0);let i=o.getTime()-t.getTime();const a=Math.floor(i/36e5),l=Math.floor(i%36e5/6e4),g=Math.floor(i%6e4/1e3);return i>0?`${a.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}`:"00:00:00"}pauseTimer(){this.interval&&clearInterval(this.interval)}trackByFn(t,o){return t}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(d.t),e.Y36(v.h),e.Y36(e.sBO))},s.\u0275cmp=e.Xpm({type:s,selectors:[["resultat-page"]],decls:2,vars:3,consts:[[4,"ngIf"],[1,"flex","flex-col","justify-center","items-center","text-white","h-full","overflow-y-auto"],[1,"flex","flex-col","justify-center","items-center","text-white","overflow-y-auto","bg-black/60","min-w-[280px]","rounded-md"],[1,"text-2xl","text-shadow-sm","shadow-black","mb-2","pt-2"],[1,"rounded-sm","max-w-[200px]","max-h-[200px]",3,"src","alt"],[1,"flex","flex-col","justify-center","items-center","py-2"],[1,"text-2xl","capitalize","text-shadow-sm","shadow-black"],[1,"text-lg","text-shadow-sm","shadow-black"],[1,"text-2xl","text-shadow-sm","shadow-black"],[1,"text-center","text-shadow-sm","shadow-black","mt-6"],[1,"mt-4"],["class","text-center text-shadow-sm shadow-black",4,"ngFor","ngForOf","ngForTrackBy"],[3,"routerLink"],[1,"underline","text-center","text-shadow-sm","shadow-black"],[1,"py-6","flex","flex-col","items-center","justify-center"],[1,"text-lg","mt-2","text-shadow-sm","shadow-black"],[1,"flex","gap-6","mt-2"],[1,"icon","icon-clipboard","text-white","text-3xl","text-shadow-sm","shadow-black",3,"click"],[1,"mb-4","text-shadow-sm","shadow-black"],[1,"text-center","text-shadow-sm","shadow-black"]],template:function(t,o){1&t&&(e.YNc(0,C,33,14,"ng-container",0),e.ALo(1,"async")),2&t&&e.Q6J("ngIf",e.lcZ(1,1,o.gameService.wordle$))},dependencies:[h.sg,h.O5,p.rH,h.Ov],styles:["[_nghost-%COMP%]{overflow:hidden;height:100%}"],changeDetection:0}),s})()}];let k=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[p.Bz.forChild(y),p.Bz]}),s})(),x=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({providers:[d.t],imports:[c.m,k]}),s})()}}]);