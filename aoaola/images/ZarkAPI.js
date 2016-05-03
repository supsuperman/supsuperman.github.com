(function(){
    var isFunction = function( fn ) {
        return !!fn && typeof fn != "string" && !fn.nodeName &&
            fn.constructor != Array && /function/i.test( fn + "" );
    }
    var buildURL = function(url, params){
        var tmp = url.split("?");
        var uri = tmp[0];
        var ps = null;
        if (tmp.length > 1) ps = tmp[1].split("&");
        var pnames = uri.match(/{\w+}/g);
        if (pnames != null) {
            for (var i=0; i<pnames.length; ++i){
                var pn = pnames[i];
                var ppn = pnames[i].match(/{(\w+)}/)[1];
                if (!params[ppn]) return null;
                else uri = uri.replace(pn, params[ppn]);
            }
        }
        if (!ps) return uri;
        var re_ps = [];
        for (var i=0; i<ps.length; ++i) {
            var tmp = ps[i].match(/{(\w+)}/);
            if (tmp==null) re_ps.push(ps[i]);
            else {
                var pn = tmp[0];
                var ppn = tmp[1];
                if (params[ppn]) re_ps.push(encodeURI(ps[i].replace(pn, params[ppn])));
            }
        }
        if (re_ps.length>0) return [uri, re_ps.join("&")].join("?");
        else return uri;
    }
    var jsc = (new Date).getTime();
    var buildTempFunction = function(cb){
        var jsonp = "jsonp" + jsc++;
        window[ jsonp ] = function(data){
            cb(data);
            // Garbage collect
            window[ jsonp ] = undefined;
            try{ delete window[ jsonp ]; } catch(e){}
        };
        return jsonp;
    }
    var sendScriptRequest = function(url){
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = url;
        script.charset = 'utf-8';
        head.appendChild(script);
    }
    var formatParams = function(params) {
        if (isFunction(params.callback)) params.callback = buildTempFunction(params.callback);
        return params;
    }
    var send = function(url, params){
        var url = buildURL(url, params);
        if (url!=null) sendScriptRequest(url);
    }

    var namespace = 'ZarkAPI';
    var cp = 'callback={callback}';
    var testing = 'test={test}';
    var successcallback = 'successcallback={successcallback}';
    var apis = {
        getPages: {url:'getpages'},
        isLogin: {url:'profile?action=islogin'},
        //isEmailExists: {url:'profile?action=is_name_exists&name'},
        isActivated: {url:'profile?action=isactivated'},
        login: {url:'profile?action=login&email={email}&password={password}&rememberme={rememberme}'},
        getMissMedals: {url:'medal?action=getmissmedals&event_id={event_id}'},
        getExchangeMedals: {url:'exchange-medal?action=getmedals&ex_id={ex_id}'},
        postExchangeBuy: {url:'exchange-buy?ex_id={ex_id}'},
        deleteMakeup: {url:'delete?model_name=Makeup&model_id={makeup_id}'},
        isEventWin: {url:'joinevent?action=is_win&event_id={event_id}'},
        updateSignature: {url:'profile?action=update_signature&sign_content={sign_content}'},
        wanted:{url:'wanted?action=add&Makeupid={makeup_id}'},
        bought:{url:'bought?action=add&Makeupid={makeup_id}'},
        topicCollect:{url:'topic-collect?action=add&Topicid={topic_id}'},
        untopicCollect:{url:'topic-collect?action=del&Topicid={topic_id}'},
        postFeedComment:{url:'feed-comment?action=add&feed_type={feed_type}&feed_id={feed_id}&content={content}'},
        getMoreFeeds:{url:'feed?action=getMoreFeeds&page_num={page_num}&type={type}&user_id={user_id}'},
        passSinsitive:{url:'sinsitive?action=pass&model_name={model_name}&model_id={model_id}'},
        follow:{url:'follow?action=add&Followedid={followed_id}'},
        nofollow:{url:'follow?action=del&Modelid={model_id}'},
        shareToFriendsByOAuth:{url:'share-link?action=share_by_oauth&site={site}'},
        shareToFriendsByEmail:{url:'share-link?action=share_by_email&email={email}'},
        selfdomain:{url:'selfdomain?domain_value={domain_value}'},
        getUseridByName:{url:'getuseridbyname?user_name={user_name}'},
        vote: {url:'vote?action=up&item_type={item_type}&item_id={item_id}'},
        emptyNoticeNum: {url:'manage-notice?target=empty_num'},
        delAllNotices: {url:'manage-notice?target=del_all'},
        delOneNotice: {url:'manage-notice?target=del_one&notice_id={notice_id}'},
        getNoticeNum: {url:'manage-notice?target=get_num'},
        joinGroup: {url:'join-group?action=join&Groupsid={group_id}'},
        quitGroup: {url:'join-group?action=quit&Groupsid={group_id}'},
        brandSearch: {url:'brand-search?query_word={query_word}'},
        likeBrand:{url:'like-brand?action=add&brand_id={brand_id}'},
        quitLikeBrand:{url:'like-brand?action=quit&Modelid={model_id}'},
        userSign:{url:'user-sign'},
        getMoreBrandReviews:{url:'get-brand-review?page_num={page_num}&brand_id={brand_id}'}

    };
    var base_uri = '/aoaolaapi/';
    for (var name in apis) {
        if (apis[name].url.search(/\?/)!=-1) apis[name].url = base_uri + apis[name].url + '&' + cp + '&' + testing;
        else apis[name].url = base_uri + apis[name].url + '?' + cp + '&' + testing;
    }

    if (!window[namespace]) window[namespace] = {};
    var api_obj = window[namespace];
    for (var name in apis) {
        api_obj[name] = (function(url){
            return function(params){
                if (params === undefined) {
                    params={}; t
                };
                send(url, formatParams(params));
            };
        })(apis[name].url)
    }
})()
