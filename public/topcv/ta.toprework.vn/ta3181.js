const PAGEVIEW = 'pageview';
const WEB_SQL_DATABASE_NAME = 'ta_db';
const INIT = 'init';
const TRACKING_SOURCE_KEY = 'ta_source';
const TRACKER_ID = 'topcv_vn';
const COLLECT_ROUTE = 'https://ta.toprework.vn/collect';
var impressStack = [];
(function () {
  // Pop the call queue...
    class ID {
        static make(length = 10) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result + '.' + new Date().getTime();
        }
        static makeid(length = 10) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    }

    class Client {
        static getId() {
            let cookieName = '_taid';
            let clientId = Cookie.get(cookieName);
            if (!clientId) {
                clientId = ID.make();
            }
            window.clientId = clientId;
            Cookie.set(cookieName, clientId, 1);
            return clientId;
        }

        static getInfo() {
            let clientId = Client.getId();
            let host = location.host;
            let origin = location.origin;
            let href = location.href;
            let pathname = location.pathname;
            let search = location.search.substring(1);
            let query = {};
            let queries = search.split('&');
            queries.forEach((queryItem) => {
                var querySegment = queryItem.split('=');
                if (querySegment.length == 2) {
                    query[querySegment[0]] = querySegment[1];
                }
            })
            return {
                c_id: clientId,
                w: this.getWidth(),
                h: this.getHeight(),
                p_f: navigator.platform,
                a_v: navigator.appVersion,
                host,
                hrf: href,
                o: origin,
                p_n: pathname,
                q: query,
            }
        }

        static getWidth() {
            return window.screen.width;
        }

        static getHeight() {
            return window.screen.height;
        }
    }
    class Cookie {
        static set(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }

        static get(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
    }


    class Tracker {

        constructor(id) {
            this.id = id
            this.tabId = ID.makeid();
        }

        getId() {
            return this.id
        }

        getTabId() {
            return this.tabId
        }

        sendHttpRequest(params) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", COLLECT_ROUTE, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(params));
        }

        send(hitType = 'pageview', options) {
            let clientInfos = Client.getInfo();
            let loggedInId = window.topcvUser.id;
            let header = window.header;
            let trackingSource = window.trackingSource;
            let params = {...options, ...header, ...clientInfos, ...{type: hitType, u_id: loggedInId, id: this.id, src: trackingSource, tab_id: this.getTabId()}}
            // var db = openDatabase(WEB_SQL_DATABASE_NAME, '2.0', 'Ta', 10000 * 1024 * 1024);

            let impressionKey = [
                'JobInViewPort',
                'JobOutViewPort',
            ]
            if (impressionKey.includes(hitType)) {
                params = {...options, ...{type: hitType}}
                impressStack.push(params);
                // db.transaction(function (tx) {
                //     tx.executeSql('CREATE TABLE IF NOT EXISTS IMPRESSIONS (requestid unique,log)');
                //     let randomId = ID.make();
                //     tx.executeSql('INSERT INTO IMPRESSIONS (requestid, log) VALUES (?, ?)', [randomId, JSON.stringify(params)]);
                // });
                return;
            }

            this.sendHttpRequest(params);
        }
    }

    setInterval(() => {
        // var db = openDatabase(WEB_SQL_DATABASE_NAME, '2.0', 'Ta', 1000 * 1024 * 1024);

        // db.transaction(function (tx) {
        //     tx.executeSql('SELECT * FROM IMPRESSIONS', [], function (tx2, results) {
        //         let len = results.rows.length, i;
        //         let logs = [];
        //         for (i = 0; i < len; i++) {
        //             logs.push(JSON.parse(results.rows.item(i).log));
        //             tx.executeSql('DELETE FROM IMPRESSIONS WHERE requestid = ?', [results.rows.item(i).requestid]);
        //         }
        //         if (logs.length) {
        //             ta('Impressions', {
        //                 imprs: logs
        //             })
        //         }
        //     }, null);
        // });
        if (impressStack.length > 0) {
            let logs = impressStack;
            ta('Impressions', {
                imprs: logs
            })
            impressStack = [];
        }


    }, 2000)
    var taTracker = new Tracker(TRACKER_ID);
    let taEvent = (...args) => {
        let event, options;
        if (args.length == 1) {
            event = args[0][0];
            options = args[0][1];
        } else {
            event = args[0];
            options = args[1];
        }
        if (event == INIT) {
            console.log('Event Init', options);
            taTracker = new Tracker(options);
            return;
        }
        taTracker.send(event, options);
    }

    q = window['ta'].q ? window['ta'].q : [];
    while(a = q.shift()){
        taEvent(a);
    }
    ta = taEvent;
})();
