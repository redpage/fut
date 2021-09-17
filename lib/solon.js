import sha1 from './sha1.js';

// import { tsvParse, csvParse } from  "d3-dsv";
// import { timeParse } from "d3-time-format";

String.prototype.format = String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), String(arguments[i]));
    }
    return s;
};

String.prototype.trim = String.prototype.trim = function() {
	var s = this,
	trimRegex = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g;
	return s.replace(trimRegex, "");
};

String.prototype.toDate = String.prototype.toDate = function(format) {
    var str = this;
    format = format || 'Ymd';

    if(format == 'Y-m-d') {
        var y = str.substr(0,4),
            m = Number(str.substr(6,2)) -1,
            d = str.substr(8,2);
        return new Date(y,m,d);
    }
    else
    {
        var y = str.substr(0,4),
            m = Number(str.substr(4,2)) -1,
            d = str.substr(6,2);
        return new Date(y,m,d);
    }
}

Date.prototype.toString = Date.prototype.toString = function(format) {
    var yy = this.getFullYear(); 
    var mm = _PAD(this.getMonth() + 1, 2);
    var dd = _PAD(this.getDate(), 2);
    
    var hh = _PAD(this.getHours(), 2);
    var min = _PAD(this.getMinutes(), 2);
    var ss = _PAD(this.getSeconds(), 2);
    
    return format.replace('%Y', yy).replace('%m', mm).replace('%d', dd).replace("%h", hh).replace('%i', min).replace('%s', ss);
};

export const getPwd = function(data) {
    // return ("*" + crypto.createHash('sha1')
    //   .update(data, 'utf-8')
    //   .digest('HEX')).toUpperCase();


    return "*" + sha1(sha1.digest(data)).toUpperCase()
  };

export const _PAD = function(number, length) {

    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}

export const _T = function(el) {
    if (el == null || el == 'undefiend') return '';

    if (el.options) {
        return (el.options[el.selectedIndex].value || el.options[el.selectedIndex].textContent);
    }

    el = el[0] || el;

    return (el.value || el.textContent || el.innerText || "");    
}


export const _N = function(el) {
    if (typeof el == 'number') {
        return el;
    }

    var s = (typeof el == 'string') ? el : _T(el);
    var nn = "";
    for (var i = 0; i < s.length; i++) {
        var k = s.charAt(i);
        if ((k >= '0' && k <= '9') || k == '.') {
            nn += k;
        }
    }
    var n = Number(nn);
    if (s.charAt(0) == '-') { n = -1 * n; }
    return (n || 0);
}

export const _M = function(v, unit, zero) {
    var unit = unit || '';
    var zero = zero || '';

    v = String(v);
    if (v == 'undefined') {
        return "";
    }    
    
    var ps = v.split('.');
    var whole = ps[0];
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole;
    if (v.charAt(0) == '-') {
        return '-' + unit + v.substr(1);
    }
    if (v == "0") { return zero; }
    return "" + unit + v;
}

export const _JSON = function(str) {
    return eval("(" + str + ")");
}

export const _JARR = function(str) {
    if(!Array.isArray(str)) 
    {
        var ss = _JSON(str);
        if(!Array.isArray(ss)) {
            ss = _JSON(ss);
        }
        return ss;
    }
    return str;
}

export const _S = function(obj) {
    if (typeof obj == 'string') return obj;
    if (typeof obj == 'object') return JSON.stringify(obj);
    return String(obj);    
}

export const _CPY = function (src, target, op) {
    if (op == 1) {  
        //target이 가지고 있는 값만 복사한다.
        for(var k in target) {
            if(src.hasOwnProperty(k)) {
                target[k] = src[k];
            }
        }
    }
    else if (op == 2) {  
         //target이 없는 값만 복사한다.
        for(var k in src) {
            if(!target.hasOwnProperty(k)) {
                target[k] = src[k];
            }
        }
    }
    else
    {
        for(var k in src) {
            target[k] = src[k];
        }        
    }
}

export function Packet(xml) {
    this.m_xml = xml || "<PKT></PKT>";
    this.get = function (tag, dv) {
        var xml = this.m_xml;
        var s = xml.indexOf("<" + tag + ">");
        if (s != -1) {
            s = xml.indexOf(">", s + 1);
            var e = xml.indexOf("</" + tag + ">", s + 1);
            if (e != -1) {
                return xml.substr(s + 1, e - s - 1);
            }
        }
        if(!dv) dv = "";
        return dv;
    };

    this.getN = function (tag, dv) {
        var n = this.get(tag, dv);
        var v = _N(n);
        if (v == 0) return n;
        return v;
    };

    this.getV = function (tag, dv) {
        var v = this.get(tag, dv);
        return _N(v);
    };

    this.getM = function (tag, dv) {
        var v = this.getV(tag, dv);
        if (v == 0) return "&nbsp;";
        return _M(v);
    };

    this.set = function (tag, v) {
    	if(v == undefined) v = '';
        var xml = this.m_xml;
        if(xml.indexOf("<" + tag + ">") != -1)
        {
        	var vv = this.get(tag);
       		this.m_xml = xml.replace("<" + tag + ">" + vv + "</" + tag + ">", "<" + tag + ">" + v + "</" + tag + ">");
        }
        else {
            var s = xml.indexOf("</PKT>");
            if (s != -1) {
                var kk = "<" + tag + ">" + v + "</" + tag + "></PKT>";
                this.m_xml = xml.replace("</PKT>", kk);
            }
        }
    };

    this.has = function(tag) {
        var s = xml.indexOf("<" + tag + ">");
        if (s != -1) {
            return true;
        }
        return false;        
    };
}


export const _JB = function(jb) {
    var ob = {};

    if(jb.hasOwnProperty("jData")) {
        ob = _JSON(jb.jData);
        delete jb.jData;
    }

    _CPY(jb, ob, 3);

    return ob;
}

export const ToPost = function(jb) {
    return new URLSearchParams(jb);
}

export function ParamObj(procNm, rt) {
    this.obj = { "procnm":procNm, "rtype":rt||"json", "params":{} };
    this.set = function(k, v) {
        this.obj["params"][k] = v;
    };
    this.toString = function() {
        return JSON.stringify(this.obj);
    };
}

// function parseData(parse) {
// 	return function(d) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;

// 		return d;
// 	};
// }

// const parseDate = timeParse("%Y-%m-%d");

// export function getData() {
// 	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
// 		.then(response => response.text())
// 		.then(data => tsvParse(data, parseData(parseDate)))
// 	return promiseMSFT;
// }