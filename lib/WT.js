import React from 'react';
import {Packet, _JB, _CPY, _JSON, sha1, ToPost} from "./solon.js";
import { PacketV } from './PacketV.js';

const onRecv = (event) => {
  //console.log(event);  
  var obj = _JSON(event);
  WT.onRecv(obj);

};

const pako = require('pako');

export const WT = {
    theApp:null,
    IP:'192.168.100.239',
    PORT:12001,
    _ws:null,
    //escapable:/[\x00-\x1f\ud800-\udfff\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g,
    escapable:/([\ud83c\udf00-\udfff])/g,
    AjaxUrl:"http://jt1.stocktest.shop/ajax_dev.aspx",
    //AjaxUrl:"http://smgr.winnerit.co.kr/www/talk.winnerstock.co.kr/w4x/atx_debug.php",
    CP:0,
    CPObj:null,
    Mbrno:0,
    Mbrid:'',
    HomeTab:null,
    NAVs:[],
    LoginInfo: {id:'', pwd:'', autoLogin:false, saveID:false},
    sLoginInfo: {id:'', pwd:'', cert:'' , autoLogin:false, saveID:false},
    ACCTs:[{label:'계좌선택', value:'0'},{label:'1-111', value:"1111"}, {label:'2-222', value:"2222"}],
    ACCT:{},
    JANs:[],
    MSTs:[],
    event_idx:0,
    eventListeners : [],

    is_mobile : function() {
        //http://detectmobilebrowsers.com/
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    },  
    
    filterUnicode: function(quoted){
        var self = this;
        self.escapable.lastIndex = 0;
        if( !self.escapable.test(quoted)) return quoted;
        return quoted.replace( self.escapable, function(a){
            return '';
        });
    },

    WTConnect: function() {
        var self = this;
        if ("WebSocket" in window) {
            // WP.WTClose();
            self._ws = new WebSocket("ws://" + self.IP + ":" + self.PORT + "/fut");

            self._ws.onopen = function() {
                setTimeout(function(){
                    let pp = new Packet();
                    pp.set("GBN", PacketV.PKT_FUT_LOGIN);
                    pp.set("MBRNO", self.Mbrno);
    
                    self.WTSend(pp);
                }, 100);
            };
    
            self._ws.onmessage = function (evt) {
                try {
                    console.log(evt);
                    var p = new Packet(self.filterUnicode(evt.data));
                    self.WTRecv(p);


                } catch (error) {
                    //console.log(evt);
                    //console.log(error);
                }
            };
    
            self._ws.onclose = function() {
                self.fire("disconnected");
                // websocket is closed.
                //console.log("Connection is closed... retry connect");
				//console.log("WP._ws.onclose");
                // setTimeout(function(){
                //     WP.WTConnect();
                // }, 1000);
            };

            self._ws.onerror = function(evt) {
				self.fire("socketerror");
				//console.log(evt);
//                setTimeout(function(){
//                    WP.WTConnect();
//                }, 10 * 1000);
            }
        } else {
            alert("WebSocket NOT supported by your Browser!");
        }   
    },

    WTRecv: function(p) {
        console.log("recv", p);
    },

    WTSend: function(p) {
        let self = this;
        if(self._ws != null)
        {
            try {
                self._ws.send(p.m_xml);
            } 
            catch(err) {
                console.log(p.m_xml, err);
            }
        }
    },

    loadConfig:function() {
        var self = this;
        fetch(this.AjaxUrl + "?aid=load-config")
        .then(res => res.json())
        .then(
            (res) =>{
                var obj = _JB(res);
                self.CPObj = obj;
                self.CP = self.CPObj.seq;
                self.CPNM = self.CPObj.nm;
                
                self.fire("load-config", obj);
            },
            (error) => {

            }
        )        
    },

    get_w4x_data: function(key) {
        fetch(this.AjaxUrl , {
            method:'POST',
            cache: 'no-cache',
            body:ToPost({q:'get_w4x', gbn:key})
        })
        .then(res => res.json())
        .then(
            (res) => {
                switch(key)
                {
                    case "MY":
                        break;
                    case "GRIDHDR":
                        break;
                    case "_JU":
                        break;
                    case "_ETC":
                        break;
                    default:
                        console.log(key, res);
                        break;
                }
            },
            (error) => {
                console.log(key, error);
            }
        )
    },

    getMst: function(shcode) {
        for(let i=0; i < this.MSTs.length; i++) {
            if(shcode == this.MSTs[i]["shcode"]) {
                return this.MSTs[i];
            }
        }

        return null;
    },
    navX: function(k) {
        if(k) {
            this.NAVs.push(k);
        } else {
            var len = this.NAVs.length;
            if(len > 0) {
                return this.NAVs[len-1];
            }
            return "ORDER";    
        }
    },
    loadMst: function() {
        let self = this;

        fetch(this.AjaxUrl + "?gb=master")
        .then( res => res.json() )
        .then( 
            (jObj) => {
                console.log(jObj);
            },
            (err) => {

            }
        );
/*        
        axios.get('https://talk.winnerstock.co.kr/w4x/atx.php?q=MASTER_STRING_ZIP')
        .then(function(res){
            var dd = base64.decode(res.data);
            var cd = dd.split('').map(function(x){return x.charCodeAt(0);});
            var bd = new Uint8Array(cd);
            var jj = pako.ungzip(bd, {to:'string'});
            console.log(jj);
            //self.MSTs = JSON.parse(jj);
            //console.log(self.MSTs);
        })
*/            
    },
    on : function (eventType, handler) {
        this.event_idx++;
        var idx = this.event_idx;
        this.eventListeners.push({
            eventType: eventType,
            handler: handler,
            idx:idx
        });
        return idx;
    },

    off : function (idx) {
        var self = this;
        for (var i = 0; i < this.eventListeners.length; i++) {
            var evt = this.eventListeners[i];
            if(evt.idx == idx) {
                self.eventListeners.splice(i, 1);
                break;
            }
        }
    },

    offA : function (eventType) {
        var self = this;
        for (var i = 0; i < this.eventListeners.length; i++) {
            var evt = this.eventListeners[i];
            if (evt.eventType === eventType) {
                self.eventListeners.splice(i, 1);
                self.offA(eventType); //recursive
                break;
            }
        }
    },    

    fire : function (eventType, evt) {
        evt = evt || {};
        evt.currentTarget = this;
        evt.type = eventType;

        for (var i = 0; i < this.eventListeners.length; i++) {
            var event = this.eventListeners[i];
            if (event.eventType === eventType) {
                try {
                    event.handler.call(this, evt);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        evt = null;
    },
    
    onRecv: function(ob) {
        let cmd = ob["cmd"];
        switch(cmd) {

            default:
                break;
        }

        this.fire("recv", ob);
    },

    startTest: function(cnt) {
        cnt = cnt || 10000;
        this.fire("test", {xx:Math.floor(Math.random() * cnt)});
    }  

};

export const WTContext = React.createContext(
    WT
);