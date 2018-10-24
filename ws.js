var ws=require("nodejs-websocket");
console.log("start connect");
var clients = [];
var game1 = null, game2 = null, game1Ready = false, game2Ready = false;
var server = ws.createServer(function (conn) {
    conn.on('open', function(x) {
        var b = 0;
    });
    
    conn.on("text", function (str) {
        clients.push({client: conn, state: true})
        console.log("收到的信息为:" + str);
        if (str === "game1") {
            game1 = conn;
            game1Ready = true;
            // yyconn.sendText("success");
        }
        if (str === "game2") {
            game2 = conn;
            game2Ready = true;
            //conn.sendText("success");
        }
        if (game1Ready && game2Ready) {
            if (str === "game1" || str === "game2") {
                console.log(str)
                game1.sendText("success");
                game2.sendText("success");
            }
            else {
                game1.sendText(str);
                game2.sendText(str);
            }

        }
    })
        conn.on("close", function (code, reason) {
            console.log("关闭连接")
        });
        conn.on("error", function (code, reason) {
            console.log("异常关闭")
        });
    }).listen(8080)
    console.log("WebSocket建立完毕");
