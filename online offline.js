$(function() {
    $(".postprofile .username_topic").after(
        "<dt></dt><dd><span class='on' style='color:green;display: none;'>Online</span><span class='off' style='color:red;'>Offline</span></dd>");
    $(".online .on").show();
    $(".online .off").hide()
});
