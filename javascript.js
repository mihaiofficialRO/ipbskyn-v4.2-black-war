$(function() {
    var u = _userdata,
        l = _lang;
    var content = $('html').get();
    for (i = 0; i < content.length; i++) {
        content[i].innerHTML = content[i].innerHTML.replace(/\{IM_ONLINE\}/g, u.session_logged_in).replace(/\{USER_NAME\}|\{.USER_NAME\}/g, u.username)
            .replace(/\{AVATAR\}|\{.AVATAR\}/g, u.avatar).replace(/\{USER_PRIVATE_MSG\}|\{.USER_PRIVATE_MSG\}/g, u.user_nb_privmsg).replace(
                /\{USER_REPUTATION\}|\{.USER_REPUTATION\}/g, u.point_reputation).replace(/\{USERID\}|\{.USERID\}/g, "/u" + u.user_id).replace(
                /\{USER_POST\}|\{.USER_POST\}/g, u.user_posts).replace(/\{USER_LEVEL\}|\{.USER_LEVEL\}/g, u.user_level).replace(
                /\{RANK_TITLE\}|\{.RANK_TITLE\}/g, l.rank_title)
    }
});
document.addEventListener("DOMContentLoaded", function() {
    $("img[src='https://2img.net/i/fa/prosilver/button_topic_new_en.png']").replaceWith('<span class="topicuri" id="start">start new topic</span>');
    $("img[src='https://2img.net/i/fa/prosilver/button_topic_reply_en.png']").replaceWith(
        '<span class="topicuri" id="reply">reply to this topic</span>');
    $("img[src='https://2img.net/i/fa/prosilver/button_topic_locked_en.png']").replaceWith('<span class="topicuri" id="lock">topic is lock</span>')
});
$(function() {
    c = $('#main #main-content:has(table.frannnta") table.frannnta tr .subforum a');
    for (a = 0; a < c.length; a += 2) {
        b = $("<span />", {
            "class": "list-forums"
        }), c.slice(a, a + 2).wrapAll(b)
    }
    for (a = 0; a < c.length; a++) {
        var x = $(c[a]).parent();
        $('a:has("img")', x).addClass('hide');
        y = $('a.hide img', x).attr("alt");
        if (/Nu sunt mesaje noi | Acest forum este blocat,/.test(y) || y == "Nu sunt mesaje noi") $('a:has("img") + a', x).addClass(' _not-new');
        else if (y == "This forum is locked, you cannot post, create, reply or edit topics") $('a:has("img") + a', x).addClass(' _has-block');
        else $('a:has("img") + a', x).addClass(' _has-new')
    }
});
$(function() {
    $('a[href="/privmsg?folder=inbox"]').each(function() {
        var pms = $(this).text().match(/\d+/g);
        if (pms && pms.length > 0) {
            $('a.mainmenu[href="/privmsg?folder=inbox"]').attr('style', 'font-size: 10px !impotant').addClass('new-pm').html('<b>' + pms +
                ' </b>mesaje noi');
            $(this).addClass('new-pm').html('<b>' + pms + ' </b>new messages')
        } else $(this).html('Messaging')
    })
});
$(function() {
    if (/\/t/.test(window.location.href) !== true) return;
    for (var i = 0; i < $(".postprofile").length; i++) {
        $post_link = $(".postprofile:eq(" + i + ") dt:first-child a").attr("href");
        $.ajax({
            url: $post_link + 'stats',
            type: "GET",
            cache: true,
            success: function(data) {
                $thanks_received = $(".panel .stats-field.genmed:nth-child(3) ul li:nth-child(5)", data).text().replace(/[^0-9]+/g, '');
                $thanks = $(".panel .stats-field.genmed:nth-child(3) ul li:nth-child(2)", data).text().replace(/[^0-9]+/g, '');
                $(".postprofile:eq(0) dl dd:eq(3)").before(
                    '<dd><span class="label"><span style="color:#F70000;">Multumiri primite</span> : ' + $thanks +
                    '</span></span><br /><span class="label"><span style="color:#F70000;">Thanks granted</span> : ' +
                    $thanks_received + '</span></span></dd>')
            }
        })
    }
});
console.clear();
$(function() {
    var globalURL = 'https://147.ip-51-255-166.eu/ssyt_cdn/frannnta-design/like/getdata.php';
    if (/\/u(\d+)rpg/g.test(window.location.pathname)) {
        $('div#profile-advanced-details').each(function() {
            var a = $(this);
            var user = $('td ul#navstrip:last li');
            $('.box-content.profile h4.subtitle', a).html('Thanks to <span style="' + (user.attr('style') ? user.attr('style') :
                '') + '">' + user.html() + '</span>');
            $.get(globalURL + '?userName=' + encodeURIComponent(user.text())).complete(function(result) {
                var $result = '<ul id="like_list">' + result.responseText + '</ul>';
                $('.ipbform2.clearfix', a).html($result)
            })
        })
    }(/\/t(\d+)-|\/t(\d+)p(\d*)-/g.test(window.location.pathname)) && $('#main table.viewtopic_body').each(function() {
        var p = this;
        var btn = $('td.postbody_content div[id^="like_topic"] > span.like_topic', this);
        if (btn.attr('class') != undefined) {
            btn.click(function(d) {
                var x = $(this);
                jQuery.post(globalURL, {
                    likeData_user: encodeURIComponent(_userdata.username),
                    likeData_uID: _userdata.user_id,
                    likeData_tPoster: encodeURIComponent(x.attr('data-author')),
                    likeData_tID: x.attr('data-id'),
                    likeData_tURL: $('td.postbody_top .post-header h3 a', p).attr('href')
                }).complete(function(result) {
                    if (/Succesful/.test(result.responseText)) {
                        var notif_array = {
                            'user': _userdata.username,
                            'useri': _userdata.user_id,
                            'userLike': x.attr('data-author'),
                            'userID': -1,
                            'commentData': "like your post [ID #" + x.attr('data-id') + "]",
                            'turl': $('td.postbody_top .post-header h3 a', p).attr('href')
                        };
                        FA_Notifications.add_user_notifications(notif_array);
                        jQuery.get(globalURL + '?post_id=' + x.attr('data-id') + '&user=' + encodeURIComponent(_userdata
                            .username) + '').complete(function(data) {
                            $('#like_topic_' + x.attr('data-id')).html(data.responseText);
                            $('.like_topic', $('#like_topic_' + x.attr('data-id'))).attr({
                                'data-id': x.attr('data-id'),
                                'data-author': encodeURIComponent(x.attr('data-author'))
                            });
                            if ($('span#user_likes', $('#like_topic_' + x.attr('data-id'))).text() === " like this") {
                                $('span#user_likes', $('#like_topic_' + x.attr('data-id'))).remove()
                            }
                            if (_userdata.username === $(this).attr('data-author')) {
                                $('.like_topic', $('#like_topic_' + x.attr('data-id'))).remove()
                            }
                        })
                    }
                })
            })
        }
    })
});
console.clear();
(function() {
    var FA = 'http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
        a = document.createElement('LINK');
    a.rel = 'stylesheet';
    a.type = 'text/css';
    a.href = FA;
    document.getElementsByTagName('HEAD')[0].appendChild(a)
})();
