import {Packet} from "./solon.js";

export function PSocket() {
    this.socket = null;
    this.connected = false;
    this.eventListeners = [];

    this.on = function (ct, eventType, handler) {
        //중복방지
        var self = this;
        for (var i = 0; i < self.eventListeners.length; i++) {
            var evt = self.eventListeners[i];
            if (evt.ct === ct && evt.eventType === eventType) {
                return;
            }
        }

        this.eventListeners.push({
            ct: ct,
            eventType: eventType,
            handler: handler
        });
    };


    this.off = function (ct, eventType) {
        var self = this;
        for (var i = 0; i < self.eventListeners.length; i++) {
            var evt = self.eventListeners[i];
            if (evt.ct === ct && evt.eventType === eventType) {
                self.eventListeners.splice(i, 1);
                break;
            }
        }
    };
    
    this.fire = function (eventType, evt) {
        // evt = evt || {};
        // evt.currentTarget = this;
        // evt.type = eventType;

        for (var i = 0; i < this.eventListeners.length; i++) {
            var event = this.eventListeners[i];
            if (event.eventType === eventType) {
                try {
                    event.handler.call(this, evt);
                } catch (error) {
                    console.log(error);
                    this.eventListeners.splice(i, 1);
                }
            }
        }
        evt = null;
    }; 
    
    this.filterUnicode = function (quoted) {
        var escapable = /([\ud83c\udf00-\udfff])/g;
        escapable.lastIndex = 0;

        if (escapable.test(quoted)) return quoted;
        return quoted.replace(escapable, function (a) {
            return '';
        });
    };    

    this.disconnect = function() {
        if(this.socket) {
            try {
                this.socket.close();
            } catch (error) {
                console.log(error);
            }
        }
    }

    this.connect = function(ip, port, path) {
        this.socket = new WebSocket("ws://{0}:{1}/{2}".format(
            ip, port, path || 'mt'
        ));

        var self = this;
        var ws = this.socket;

        ws.onopen = function(evt) {
            self.connected = true;
            self.fire('CONN',self);
        };

        ws.onmessage = function(evt) {
            try {
                //console.log(evt.data);
                var p = new Packet(self.filterUnicode(evt.data));
                self.fire("RECV", p);
            } catch (error) {
                console.log("========== RECV ERROR =============");
                console.log(evt);
                console.log(error);
            }            
        };

        ws.onerror = function(evt) {
            self.connected = false;
            self.fire('ERR', evt);
        };

        ws.onclose = function() {
            self.connected = false;
            self.fire("DISCONN", self);
        };
    }

    this.sendPacket = function(p) {
        if(this.socket && this.connected) {
            this.socket.send(p.m_xml);
        }
    };

    this.sendString = function(s) {
        if(this.socket && this.connected) {
            this.socket.send(s);
        }
    };
}