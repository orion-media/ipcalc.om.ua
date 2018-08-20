String.prototype.padStart||(String.prototype.padStart=function(t,n){return t>>=0,this.length>t?String(this):(n=String(n||" "),(t-=this.length)>n.length&&(n+=n.repeat(t/n.length)),n.slice(0,t)+String(this))}),String.prototype.inet_aton=function(){let t=new ArrayBuffer(4),n=new DataView(t),e=this.split(".");for(let t=0;t<4;t++)n.setUint8(t,e[t]);return n.getUint32(0)},String.prototype.inet_wildcard=function(){return 4294967295&~this.inet_aton()},Number.prototype.inet_ntoa=function(){let t=new ArrayBuffer(4),n=new DataView(t),e=new Array;n.setUint32(0,this);for(let t=0;t<4;t++)e[t]=n.getUint8(t);return e.join(".")},Number.prototype.inet_bin=function(){return(this>>>0).toString(2).padStart(32,"0").replace(/(.{8})/g,"$1 . ").slice(0,-3)},Number.prototype.bin=function(t){return(this>>>0).toString(2)};var app=angular.module("app",["ngMaterial"]);app.config(function(t,n,e){t.theme("default").primaryPalette("blue",{default:"700"}),n.defaultFontSet("FontAwesome").fontSet("fa","FontAwesome"),e.disableWarnings()}),app.controller("controller",["$scope","$mdMedia","$mdSidenav",function(t,n,e){t.sidenav=!0,t.isLockedOpenSidenav=function(){return t.sidenav&&n("gt-md")},t.toggleSidenav=function(){n("gt-md")?t.sidenav=!t.sidenav:e("left").toggle()},t.input={ip:"192.168.0.1",mask:"255.255.255.0",bits:24},t.dec={},t.bin={},t.onChangeMask=function(){if(/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(t.input.mask)){let n=4294967295&~t.input.mask.inet_aton();t.input.bits="0"!==n.bin()?n.bin().length:0}else t.input.bits="";t.update()},t.onChangeBits=function(){let n=/^[0-9]{1,2}$/.test(t.input.bits)&&t.input.bits>=0&&t.input.bits<=32;t.input.mask=n?(4294967295<<32-parseInt(t.input.bits,10)&4294967295).inet_ntoa():"",t.update()},t.update=function(){let n=/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(t.input.ip),e=/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(t.input.mask);if(!n||!e)return t.dec={},void(t.bin={});let i=t.input.mask.inet_aton();t.dec.mask=i.inet_ntoa(),t.bin.mask=i.inet_bin();let a=4294967295&~i;t.dec.wildcard=a.inet_ntoa(),t.bin.wildcard=a.inet_bin();let r=t.input.ip.inet_aton()&i;t.dec.net=r.inet_ntoa()+" / "+(32-("0"!==a.bin()?a.bin().length:0)),t.bin.net=r.inet_bin();let o=a+1;t.dec.addresses=o;let s=a-1;s<0&&(s=0),t.dec.hosts=s.toString().split("").reverse().join("").replace(/(.{3})/g,"$1 ").trim().split("").reverse().join("");let p=r+a;if(t.dec.broadcast=p.inet_ntoa(),t.bin.broadcast=p.inet_bin(),s){let n=r+1;t.dec.min=n.inet_ntoa(),t.bin.min=n.inet_bin()}else t.dec.min="",t.bin.min="";if(s){let n=p-1;t.dec.max=n.inet_ntoa(),t.bin.max=n.inet_bin()}else t.dec.max="",t.bin.max=""},t.update()}]);