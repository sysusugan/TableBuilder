/**
 * author: Su Gan
 * Date: 2013-4-3
 * email: sugan@foxmail.com
 */


var TableBuilder = (function () {

    function Table() {
        this.keys = [];
        this.headerStr = "";
        this.dataStr = "";
    }

    Table.prototype.getTableStr = function () {
        return this.headerStr + this.dataStr;
    }
    Table.prototype.clearAll = function () {
        this.keys = [];
        this.headerStr = "";
        this.dataStr = "";
    }

    Table.prototype.setDataObj = function (data) {
        if (typeof data == 'string') {
            try {
                data = JSON.parse(data);
            }
            catch (e) {
                throw e;
            }
        }
        var i , key, tmpRow = '';
        var dataStr = '';
        for (var l in data) {
            tmpRow += "<tr>";

            var line = data[l];
            for (i in this.keys) {
                key = this.keys[i];
                if (key in line) {
                    tmpRow += "<td>" + line[key] + "</td>"
                }

            }
            tmpRow += "</tr>";
        }
        this.dataStr = tmpRow;
        return tmpRow;
    }

    Table.prototype.setHeaderObj = function (header) {
        if (typeof header == 'string') {
            try {
                header = JSON.parse(header);
            }
            catch (e) {
                throw e;
            }
        }
        var colName = '', rowSpan = '', colSpan = '', firstRow = '', secondRow = '', secondRowArr = [], bgColor;
        var retStr = '';
        var subFlag = false;
        var maxcount = 0;
        var keys = [];
        for (colName in header) {
            bgColor = header[colName]['color'] || '';
            if (!!header[colName]['sub']) {
                subFlag = true;
                var count = 0, bgColor;
                for (var i in header[colName]['sub']) {
                    secondRowArr.push(header[colName]['sub'][i]);
                    count++;
                    keys.push(i || '');
                }
                firstRow += "<td colspan='" + count + "' rowspan='1' bgcolor='" + bgColor + "'>" + header[colName]['name'] + "</td>";
                maxcount = maxcount < count ? count : maxcount;

            }
            else {
                firstRow += "<td colspan='1' rowspan='{*2*}' bgcolor='" + bgColor + "'>" + header[colName]['name'] + "</td>"; //
                keys.push(colName || '');
            }
        }

        if (!!subFlag) {
            for (var i in secondRowArr) {
                var tmpName = secondRowArr[i]['name'];
                bgColor = secondRowArr[i]['color'] || '';
                secondRow += "<td colspan='1' rowspan='1' bgcolor='" + bgColor + "'>" + tmpName + "</td>"; //
            }

        }

        retStr = "<tr>" + firstRow + "</tr>"
            + "<tr>" + secondRow + "</tr>";
        console.log(retStr)
        if (!!subFlag) {
            retStr = retStr.replace(/\{\*2\*\}/g, '2');
        }
        console.log(retStr)
        this.keys = keys;
        this.headerStr = retStr;
        return retStr
    }

    return Table;
})()

window.TableBuilder = TableBuilder;

/**
 使用示例：


 var objHeader = {
        'riqi': {
            name: '日期',
            color: "green"
        },
        'online': {
            name: '在线',
            'sub': {
                'onlineRow': {
                    name: '当前在线',
                    color: 'red'
                },
                'onlineRow2': {
                    name: '峰值',
                    color: 'red'
                },
                'onlineRow3': {
                    name: '峰值',
                    color: 'red'
                }
            },
            color: "green"
        },
        'online2': {
            name: '在线2',
            'sub': {
                'onlineRow': {
                    name: '当前在线',
                    color: 'red'
                }
            },
            color: "green"
        }
    }

 var objData = {
        '0': {
            riqi: '日期',
            onlineRow: "1",
            onlineRow2: "11",
            onlineRow3: "111",
            onlineRow: "1111"
        },
        '1': {
            riqi: '日期2',
            onlineRow: "2",
            onlineRow2: "22",
            onlineRow3: "222",
            onlineRow: "2222"
        }

    }


 var tbl = new TableBuilder();
 tbl.setHeaderObj(objHeader);
 tbl.setDataObj(objData);

 var t = tbl.getTableStr();
 $('#tbl').html(t)


 */








