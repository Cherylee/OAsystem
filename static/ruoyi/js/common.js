/**
 * 通用方法封装处理
 * Copyright (c) 2019 ruoyi
 */
$(function () {

    // select2复选框事件绑定
    if ($.fn.select2 !== undefined) {
        $("select.form-control:not(.noselect2)").each(function () {
            $(this).select2().on("change", function () {
                $(this).valid();
            })
        })
    }
    // checkbox 事件绑定
    if ($(".check-box").length > 0) {
        $(".check-box").iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
        })
    }
    // radio 事件绑定
    if ($(".radio-box").length > 0) {
        $(".radio-box").iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
        })
    }
    // laydate 时间控件绑定
    if ($(".select-time").length > 0) {
        layui.use('laydate', function () {
            var laydate = layui.laydate;
            var startDate = laydate.render({
                elem: '#startTime',
                max: $('#endTime').val(),
                theme: 'molv',
                trigger: 'click',
                type: 'datetime',
                done: function (value, date) {
                    // 结束时间大于开始时间
                    if (value !== '') {
                        endDate.config.min.year = date.year;
                        endDate.config.min.month = date.month - 1;
                        endDate.config.min.date = date.date;
                    } else {
                        endDate.config.min.year = '';
                        endDate.config.min.month = '';
                        endDate.config.min.date = '';
                    }
                }
            });
            var endDate = laydate.render({
                elem: '#endTime',
                min: $('#startTime').val(),
                theme: 'molv',
                trigger: 'click',
                done: function (value, date) {
                    // 开始时间小于结束时间
                    if (value !== '') {
                        startDate.config.max.year = date.year;
                        startDate.config.max.month = date.month - 1;
                        startDate.config.max.date = date.date;
                    } else {
                        startDate.config.max.year = '';
                        startDate.config.max.month = '';
                        startDate.config.max.date = '';
                    }
                }
            });
        });
    }
    // laydate time-input 时间控件绑定
    if ($(".time-input").length > 0) {
        layui.use('laydate', function () {
            var com = layui.laydate;
            $(".time-input").each(function (index, item) {
                var time = $(item);
                // 控制控件外观
                var type = time.attr("data-type") || 'datetime';
                // 控制回显格式
                var format = time.attr("data-format") || 'yyyy-MM-dd HH:mm:ss';
                // 控制日期控件按钮
                var buttons = time.attr("data-btn") || 'clear|now|confirm', newBtnArr = [];
                // 日期控件选择完成后回调处理
                var callback = time.attr("data-callback") || {};
                //mark--请假申请标注
                var mark = time.attr("data-mark")


                if (buttons) {
                    if (buttons.indexOf("|") > 0) {
                        var btnArr = buttons.split("|"), btnLen = btnArr.length;
                        for (var j = 0; j < btnLen; j++) {
                            if ("clear" === btnArr[j] || "now" === btnArr[j] || "confirm" === btnArr[j]) {
                                newBtnArr.push(btnArr[j]);
                            }
                        }
                    } else {
                        if ("clear" === buttons || "now" === buttons || "confirm" === buttons) {
                            newBtnArr.push(buttons);
                        }
                    }
                } else {
                    newBtnArr = ['clear', 'now', 'confirm'];
                }
                if (mark == '0') {
                    com.render({
                        elem: item,
                        theme: 'molv',
                        trigger: 'click',
                        type: type,
                        format: format,
                        btns: newBtnArr,
                        min: '08:30:00',
                        done: function (value, data) {
                            if (typeof window[callback] != 'undefined'
                                && window[callback] instanceof Function) {
                                window[callback](value, data, mark);
                            }
                        }
                    });

                } else {
                    com.render({
                        elem: item,
                        theme: 'molv',
                        trigger: 'click',
                        type: type,
                        format: format,
                        btns: newBtnArr,
                        done: function (value, data) {
                            if (typeof window[callback] != 'undefined'
                                && window[callback] instanceof Function) {
                                window[callback](value, data, mark);
                            }
                        }
                    });
                }

            });
        });
    }

    //laydate time-input-data 时间控件绑定
    if ($(".time-input-data").length > 0) {
        layui.use('laydate', function () {
            var com = layui.laydate;
            $(".time-input-data").each(function (index, item) {
                var time = $(item);
                // 控制控件外观
                var type = time.attr("data-type") || 'date';
                // 控制回显格式
                var format = time.attr("data-format") || 'yyyy-MM-dd';
                // 控制日期控件按钮
                var buttons = time.attr("data-btn") || 'clear|now|confirm', newBtnArr = [];
                // 日期控件选择完成后回调处理
                var callback = time.attr("data-callback") || {};
                if (buttons) {
                    if (buttons.indexOf("|") > 0) {
                        var btnArr = buttons.split("|"), btnLen = btnArr.length;
                        for (var j = 0; j < btnLen; j++) {
                            if ("clear" === btnArr[j] || "now" === btnArr[j] || "confirm" === btnArr[j]) {
                                newBtnArr.push(btnArr[j]);
                            }
                        }
                    } else {
                        if ("clear" === buttons || "now" === buttons || "confirm" === buttons) {
                            newBtnArr.push(buttons);
                        }
                    }
                } else {
                    newBtnArr = ['clear', 'now', 'confirm'];
                }
                com.render({
                    elem: item,
                    theme: 'molv',
                    trigger: 'click',
                    type: type,
                    format: format,
                    btns: newBtnArr,
                    done: function (value, data) {
                        if (typeof window[callback] != 'undefined'
                            && window[callback] instanceof Function) {
                            window[callback](value, data);
                        }
                    }
                });
            });
        });
    }
    // tree 关键字搜索绑定
    if ($("#keyword").length > 0) {
        $("#keyword").bind("focus", function focusKey(e) {
            if ($("#keyword").hasClass("empty")) {
                $("#keyword").removeClass("empty");
            }
        }).bind("blur", function blurKey(e) {
            if ($("#keyword").val() === "") {
                $("#keyword").addClass("empty");
            }
            $.tree.searchNode(e);
        }).bind("input propertychange", $.tree.searchNode);
    }

    // tree表格树 展开/折叠
    var expandFlag;
    $("#expandAllBtn").click(function () {
        var dataExpand = $.common.isEmpty($.table._option.expandAll) ? true : $.table._option.expandAll;
        expandFlag = $.common.isEmpty(expandFlag) ? dataExpand : expandFlag;
        if (!expandFlag) {
            $('#' + $.table._option.id).bootstrapTreeTable('expandAll');
        } else {
            $('#' + $.table._option.id).bootstrapTreeTable('collapseAll');
        }
        expandFlag = expandFlag ? false : true;
    })
    //默认显示当前时间
    if ($('.currentTime').length > 0) {
        $(".currentTime").each(function (index, item) {
            var thisObj = $(item);
            currentDate(thisObj)
        })
    }
    //默认显示不带时分秒的当前时间
    if ($('.currentDate').length > 0) {
        $(".currentDate").each(function (index, item) {
            var thisObj = $(item);
            currentDate(thisObj, true)
        })
    }


});

/** 刷新选项卡 */
var refreshItem = function () {
    var topWindow = $(window.parent.document);
    var currentId = $('.page-tabs-content', topWindow).find('.active').attr('data-id');
    var target = $('.RuoYi_iframe[data-id="' + currentId + '"]', topWindow);
    var url = target.attr('src');
    target.attr('src', url).ready();
}

/** 关闭选项卡 */
var closeItem = function (dataId) {
    var topWindow = $(window.parent.document);
    if ($.common.isNotEmpty(dataId)) {
        window.parent.$.modal.closeLoading();
        // 根据dataId关闭指定选项卡
        $('.menuTab[data-id="' + dataId + '"]', topWindow).remove();
        // 移除相应tab对应的内容区
        $('.mainContent .RuoYi_iframe[data-id="' + dataId + '"]', topWindow).remove();
        return;
    }
    var panelUrl = window.frameElement.getAttribute('data-panel');
    $('.page-tabs-content .active i', topWindow).click();
    if ($.common.isNotEmpty(panelUrl)) {
        $('.menuTab[data-id="' + panelUrl + '"]', topWindow).addClass('active').siblings('.menuTab').removeClass('active');
        $('.mainContent .RuoYi_iframe', topWindow).each(function () {
            if ($(this).data('id') == panelUrl) {
                $(this).show().siblings('.RuoYi_iframe').hide();
                return false;
            }
        });
    }
}

/** 创建选项卡 */
function createMenuItem(dataUrl, menuName) {
    var panelUrl = window.frameElement.getAttribute('data-id');
    dataIndex = $.common.random(1, 100),
        flag = true;
    if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;
    var topWindow = $(window.parent.document);
    // 选项卡菜单已存在
    $('.menuTab', topWindow).each(function () {
        if ($(this).data('id') == dataUrl) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $('.page-tabs-content').animate({marginLeft: ""}, "fast");
                // 显示tab对应的内容区
                $('.mainContent .RuoYi_iframe', topWindow).each(function () {
                    if ($(this).data('id') == dataUrl) {
                        $(this).show().siblings('.RuoYi_iframe').hide();
                        return false;
                    }
                });
            }
            flag = false;
            return false;
        }
    });
    // 选项卡菜单不存在
    if (flag) {
        var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '" data-panel="' + panelUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        $('.menuTab', topWindow).removeClass('active');

        // 添加选项卡对应的iframe
        var str1 = '<iframe class="RuoYi_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" data-panel="' + panelUrl + '" seamless></iframe>';
        $('.mainContent', topWindow).find('iframe.RuoYi_iframe').hide().parents('.mainContent').append(str1);

        // window.parent.$.modal.loading("数据加载中，请稍后...");
        $('.mainContent iframe:visible', topWindow).load(function () {
            window.parent.$.modal.closeLoading();
        });

        // 添加选项卡
        $('.menuTabs .page-tabs-content', topWindow).append(str);
    }
    return false;
}

//日志打印封装处理
var log = {
    log: function (msg) {
        console.log(msg);
    },
    info: function (msg) {
        console.info(msg);
    },
    warn: function (msg) {
        console.warn(msg);
    },
    error: function (msg) {
        console.error(msg);
    }
};

/** 设置全局ajax处理 */
$.ajaxSetup({
    complete: function (XMLHttpRequest, textStatus) {
        if (textStatus == 'timeout') {
            $.modal.alertWarning("服务器超时，请稍后再试！");
            $.modal.closeLoading();
        } else if (textStatus == "parsererror") {
            $.modal.alertWarning("服务器错误，请联系管理员！");
            $.modal.closeLoading();
        }
    }
});
layer.config({
    extend: 'moon/style.css',
    skin: 'layer-ext-moon'
});

//下载附件
function downFile() {
    $(".kv-file-down").on('click', function () {
        var str = $(this).data('key');
        var reg = new RegExp('/', 'g');
        var newstr = str.replace(reg, '|');//由于转义字符发送请求会报错400，故先把/替换成|再去后台替换回来
        location.href = ctx + "system/sysCredentials/downloadFileByFileName/" + newstr;
        layer.msg('下载成功，正在生成文件请稍后…', {icon: 1});
    });
    // $(".kv-file-eye").on('click',function(){
    // 	var str = $(this).data('key');
    // 	var reg = new RegExp('/','g');
    // 	var newstr = str.replace(reg,'|');//由于转义字符发送请求会报错400，故先把/替换成|再去后台替换回来
    // 	$.modal.openTab("附件预览", ctx + "common/filePreview/"+newstr);
    // });

};
//将表单数据序列化为一个json对象，例如 {"name":"zs", "age":10}
// 使用：var jsonObj = $("#formId").serializeObject();
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();

    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');

        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//判断文件是否为图片类型
function isAssetTypeAnImage(fileFullPath) {
    //获取最后一个.的位置
    var index = fileFullPath.lastIndexOf(".");
    //获取后缀
    var ext = fileFullPath.substr(index + 1);
    return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
}

//表格置空
function clearForm(form) {
    // iterate over all of the inputs for the form
    // element that was passed in
    $(':input', form).each(function () {
        var type = this.type;
        var tag = this.tagName.toLowerCase(); // normalize case
        // it's ok to reset the value attr of text inputs,
        // password inputs, and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'number')
            this.value = "";
        // checkboxes and radios need to have their checked state cleared
        // but should *not* have their 'value' changed
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        // select elements need to have their 'selectedIndex' property set to -1
        // (this works for both single and multiple select elements)
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};
//将josn对象赋值给form
$.fn.loadData = function (obj) {
    var key, value, tagName, type, arr;
    for (var x in obj) {
        if (obj.hasOwnProperty(x)) {
            key = x;
            value = obj[x];
            var this_ = this
            this.find("[name='" + key + "'],[name='" + key + "[]']").each(function (index, item) {
                tagName = $(this)[0].tagName.toUpperCase();
                type = $(this).attr('type');

                if (tagName == 'INPUT') {
                    if (type == 'radio') {
                        if ($(this).val() == value) {
                            $(this).attr('checked', true);
                        }
                    } else if (type == 'checkbox') {
                        arr = value.split(',');
                        for (var i = 0; i < arr.length; i++) {
                            if ($(this).val() == arr[i]) {
                                $(this).attr('checked', true);
                                break;
                            }
                        }
                    } else {
                        if ($.isArray(value)) {
                            $(this).val('');
                        } else {
                            $(this).val(value);
                        }

                    }
                } else if (tagName == 'SELECT' || tagName == 'TEXTAREA') {
                    $(this).val(value);
                }
            });
        }
    }
}

//当前时间
function currentDate(obj, flag) {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    if (mon < 10) {
        mon = "0" + mon;
    }
    var date = myDate.getDate(); //获取当前日
    if (date < 10) {
        date = "0" + date;
    }
    var h = myDate.getHours();//获取当前小时数(0-23)
    if (h < 10) {
        h = "0" + h;
    }
    var m = myDate.getMinutes();//获取当前分钟数(0-59)
    if (m < 10) {
        m = "0" + m;
    }
    var s = myDate.getSeconds();//获取当前秒
    if (s < 10) {
        s = "0" + s;
    }
    /* var week = myDate.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "

星期四", "星期五", "星期六"]; */
    /*  console.log(year + "-" + mon + "-" + date) */
    if (flag) {
        obj.val(year + "-" + mon + "-" + date);
    } else {
        obj.val(year + "-" + mon + "-" + date + ' ' + h + ':' + m + ':' + s);
    }

}

/*用户管理-新增-选择部门树*/
var divDeptId = null
var divDeptName = null
var divDeptCode = null

function selectDeptTree(id, deptName, code) {//code=0-表示公司 code=1-表示部门 code=2-表示部门多选
    divDeptId = id;
    divDeptName = deptName;
    divDeptCode = code
    var treeId = $("#" + id).val();
    var deptId = $.common.isEmpty(treeId) ? "100" : $("#" + id).val();
    var url = ctx + "system/dept/selectDeptTree/" + deptId;
    var options = {
        title: '选择部门',
        width: "380",
        url: ctx + "system/dept/selectDeptTree/" + deptId,
        callBack: doSubmitDept
    };
    $.modal.openOptions(options);
}

function doSubmitDept(index, layero) {
    var tree = layero.find("iframe")[0].contentWindow.$._tree;
    if (divDeptCode == '0') {
        if ($.tree.notAllowLastLevel(tree)) {
            var body = layer.getChildFrame('body', index);
            $("#" + divDeptId).val(body.find('#treeId').val());
            $("#" + divDeptName).val(body.find('#treeName').val());
            layer.close(index);

        }
    } else if (divDeptCode == '1') {
        if ($.tree.notAllowParents(tree)) {
            var body = layer.getChildFrame('body', index);
            $("#" + divDeptId).val(body.find('#treeId').val());
            $("#" + divDeptName).val(body.find('#treeName').val());
            layer.close(index);

        }
    } else if (divDeptCode == '2') {
        if ($.tree.notAllowParents(tree)) {
            var body = layer.getChildFrame('body', index);
            var deptHtml = '';
            deptHtml += '<span>' + body.find("#treeName").val() + ' <i class="fa fa-close closeDept"></i><input type="hidden" name="deptId" value="' + body.find('#treeId').val() + '"></span> '
            $("#" + divDeptId).append(deptHtml);
            layer.close(index);
            $('.closeDept').click(function () {
                $(this).parent().remove();
                event.stopPropagation();
            })
        }
    }
}

//弹框选择人员
/* 单选用户 */
var domId = null;
var domName = null;
var domList = null;

function selectUserById(id, name, idList) {
    domId = id;
    domName = name;
    domList = idList;
    var options = {
        title: '选择用户',
        width: "1200",
        url: ctx + "oa/oaApplyTemplate/selectUser",
        callBack: doSubmitUserM
    };
    $.modal.openOptions(options);
}

function doSubmitUserM(index, layero) {
    var iframeWin = layero.find('iframe')[0];
    var result = iframeWin.contentWindow.submitHandler();
    var data = result.data;
    if (domList) {
        for (var i = 0; i < domList.length; i++) {
            $('#' + domList[i]).val(eval("data." + domList[i]))
        }
    }

    $('#' + domId).val(data.userId)
    $('#' + domName).val(data.userName)
}

/* 多选用户 */
var UId = null;
var UName = null;
var Utype = null;
var USendId = null;
var Uurl = null;
var UFlag = null;

function selectUser(id, name, type, sendId, url, flag) {
    UId = id;
    UName = name;
    Utype = type;
    USendId = sendId;
    Uurl = url;
    UFlag = flag
    var options = {
        title: '选择用户',
        width: "1200",
        url: ctx + "oa/oaApplyTemplate/selectUser",
        callBack: doSubmitUser
    };
    $.modal.openOptions(options);
}

function doSubmitUser(index, layero) {
    var iframeWin = layero.find('iframe')[0];
    if (Utype == '0') {
        var result = iframeWin.contentWindow.submitHandlerMore1();
        var data = result;
        var dataSend = {}
        dataSend.id = USendId
        dataSend.copyUserList = data
        if (UFlag) {
            $.operate.saveJson(ctx + Uurl, dataSend);
        } else {
            $.operate.saveJsonTab(ctx + Uurl, dataSend);
        }

    } else {
        var result = iframeWin.contentWindow.submitHandlerMore();
        var data = result;
        $('#' + UId).val(data.idArry)
        $('#' + UName).val(data.namesArry)
    }
}

//查询流程
function selectActProcessList(data, id) {
    if ($.common.isEmpty(id)) {
        id = "bootstrap-table";
    }
    var options = {
        id: id,
        uniqueId: "taskId",
        url: prefix + "/processList",
        modalName: "流程信息",
        search: false,
        showSearch: false,
        showExport: false,
        showRefresh: false,
        showColumns: false,
        showToggle: false,
        contentType: "application/json;charset=UTF-8",
        queryParams: data,
        columns: [{
            checkbox: false
        },
            {
                field: 'taskId',
                title: '任务id',
                visible: false
            },
            {
                field: 'actName',
                title: '流程名称'
            },
            {
                field: 'startTime',
                title: '开始时间'
            },
            {
                field: 'message',
                title: '审批信息'
            },
            {
                field: 'endTime',
                title: '审核时间'
            }]
    };
    $.table.init(options);
}

function serverPush(url, id, judge) {
    /**
     * 构造方法中传入服务端的接口
     获取客户端连接对象
     * @type {EventSource}
     */
    var sourse = new EventSource(url);
    //连接成功时触发该事件监听器
    sourse.onopen = function (event) {
        //console.log("客户端与服务端连接成功……");
    }
    //事件监听器： 服务端响应客户端时（推送消息）时触发事件监听器
    //如果服务端指定 event: 事件类型时;  客户端需要设置该事件类型的监听器。
    sourse.onsseMessage = function (event) {
        // console.log(event);
        // console.log("推送消的消息====="+event.data); //推送的消息
    }
    // 如果服务端不指定 event: 事件类型时; 客户端则使用默认的事件监听器message
    sourse.onmessage = function (event) {
        var json = eval('(' + event.data + ')');
        if (judge == null || judge == 'undefined') {
            var rows = $("#" + id).bootstrapTable("getOptions").totalRows;//获取表格所有的记录与服务端推送过来的记录对比，若不一致则刷新表格
            //条数不一样，说明有人又提交审批了
            if (rows > 0 && rows != json.total) {
                $.table.refresh();
            }
        } else {
            $(judge(json));
        }
    }
    //执行出错时触发该事件监听器
    sourse.οnerrοr = function (event) {
        // console.log(event);
        //console.log("执行出错……");
    }
}

////催办
function urge() {
    $.operate.saveTab(prefix + "/urge/" + lastNodeId);
}

///对多位小数进行四舍五入
//num是要处理的数字  v为要保留的小数位数
function decimal(num, v) {
    var vv = Math.pow(10, v);
    return Math.round(num * vv) / vv;
}

//选择项目
var pId = null;
var pName = null;

function selectPro(id, name) {
    pId = id;
    pName = name;
    var options = {
        title: '选择工程',
        width: "1200",
        url: ctx + "oa/oaProject",
        callBack: doSubmitPro
    };
    $.modal.openOptions(options);
}

function doSubmitPro(index, layero) {
    var iframeWin = layero.find('iframe')[0];
    var result = iframeWin.contentWindow.submitHandler();
    var data = result;
    $('#' + pId).val(data.id)
    $('#' + pName).val(data.projectName)
    if ('.if-pro') {
        $('.if-pro').removeClass('hide')
    }
}

//选择合同
var pId = null;
var pName = null;

function selectContract(id, name) {
    pId = id;
    pName = name;
    var options = {
        title: '关联合同',
        width: "1200",
        url: ctx + 'oa/oaContract',
        callBack: doContractCallBack
    };
    $.modal.openOptions(options);
}

function doContractCallBack(index, layero) {
    var iframeWin = layero.find('iframe')[0];
    var result = iframeWin.contentWindow.submitHandler();
    var data = result;
    $('#' + pId).val(data.id)
    $('#' + pName).val(data.contractName)
}

//金额自动转换大写文字
function coverUpper(sourceInput, tarInput) {
    $("input#" + sourceInput).bind("input propertychange",
        function () {//监控输入框的变化
            var num = $(this).val()
            var a = parseFloat(num)
            var config = {
                url: ctx + "common/converMoneyToCN/" + a,
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result.code == '0') {
                        $("input#" + tarInput).val(result.msg)
                    }
                }
            };
            $.ajax(config)
        });
}

//金额自动转换大写文字（无事件）
function coverUpperWithoutCase(num, tarInput) {
    var config = {
        url: ctx + "common/converMoneyToCN/" + num,
        type: "get",
        dataType: "json",
        success: function (result) {
            if (result.code == '0') {
                $("input#" + tarInput).val(result.msg);
            }
        }
    };
    $.ajax(config);
}

//撤回操作
function withdrawTask(procInstId) {
    $.modal.confirm("确定撤回吗？", function () {
        $.operate.get(prefix + "/withdrawTask/" + procInstId);
    });
}

//获取缓存更新标记
function getCacheUpdateFlag(type) {
    var config = {
        url: ctx + "oa/task/searchCacheFlag/" + type,
        type: "get",
        dataType: "json",
        success: function (result) {
            if (result.code == '0') {
                var flag = result.data;
                if (flag) {
                    $.table.refresh();
                }
            }
        }
    };
    $.ajax(config);
}

//查询字典值，在页面显示
function selectDictionary(dictionary, list, type, value) {
    for (var i = 0; i < list.length; i++) {
        var valueText = $.table.selectDictLabel(dictionary, list[i][type][value]);
        $('.' + value + i).html(valueText)
    }
}

//明细查询字典值，在页面显示
function selectDetailDictionary(dictionary, list, detailName, value) {
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i][detailName].length; j++) {
            var valueText = $.table.selectDictLabel(dictionary, list[i][detailName][j][value]);
            $('.' + value + i + j).html(valueText)
        }
    }
}

//动态添加时间input注册方法
function dynamicDate() {
    if ($(".time-input").length > 0) {
        layui.use('laydate', function () {
            var com = layui.laydate;
            $(".time-input").each(function (index, item) {
                var time = $(item);
                // 控制控件外观
                var type = time.attr("data-type") || 'datetime';
                // 控制回显格式
                var format = time.attr("data-format") || 'yyyy-MM-dd HH:mm:ss';
                // 控制日期控件按钮
                var buttons = time.attr("data-btn") || 'clear|now|confirm', newBtnArr = [];
                // 日期控件选择完成后回调处理
                var callback = time.attr("data-callback") || {};
                //水泥混凝土抗压强度试验检测记录表
                var mark = time.attr("data-mark");
                newBtnArr = ['clear', 'now', 'confirm'];

                com.render({
                    elem: item,
                    theme: 'molv',
                    trigger: 'click',
                    type: type,
                    format: format,
                    btns: newBtnArr,
                    done: function (value, data) {
                        if (typeof window[callback] != 'undefined'
                            && window[callback] instanceof Function) {
                            window[callback](value, data);
                        }
                        if (mark === '0') {
                            var manufactureDate = new Date(value).getTime();
                            var trialDate = new Date(time.parent().parent().parent().find("input[name='trialDate']").val()).getTime();
                            var ms = Math.abs(trialDate - manufactureDate) / 1000 / 60 / 60 / 24;
                            time.parent().parent().parent().find("input[name='age']").val(ms.toFixed(2));
                        } else if (mark === '1') {
                            var trialDate = new Date(value).getTime();
                            var manufactureDate = new Date(time.parent().parent().parent().find("input[name='manufactureDate']").val()).getTime();
                            var ms = Math.abs(trialDate - manufactureDate) / 1000 / 60 / 60 / 24;
                            time.parent().parent().parent().find("input[name='age']").val(ms.toFixed(2));
                        }
                    }
                });
            });
        });
    }
}

//记录表根据尺寸返回对应系数和面积
function getArea(index) {
    if (index == '5') {
        return 10000
    } else if (index == '0') {
        return 22500
    } else {
        return 40000
    }
}

function getCoefficient(index) {
    if (index == '5') {
        return 1.0
    } else if (index == '0') {
        return 0.95
    } else {
        return 1.05
    }
}

//四舍六入五成双
function evenRound(num, decimalPlaces) {
    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8);
    var i = Math.floor(n), f = n - i;
    var e = 1e-8;
    var r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}

// 数字转换 金额格式 万 亿 并保留两位小数
var numberFormat = function (value) {
    var param = {};
    var k = 10000,
        sizes = ['', '万', '亿', '万亿'],
        i;
    if (value < k) {
        param.value = value
        param.unit = ''
    } else {
        i = Math.floor(Math.log(value) / Math.log(k));

        param.value = ((value / Math.pow(k, i))).toFixed(2);
        param.unit = sizes[i];
    }
    return param;
}
