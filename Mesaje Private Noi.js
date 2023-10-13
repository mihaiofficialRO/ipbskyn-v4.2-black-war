$(function(){
	$('a[href="/privmsg?folder=inbox"]').each(function() {
		var pms = $(this).text().match(/\d+/g);
		if(pms && pms.length > 0) { $('a.mainmenu[href="/privmsg?folder=inbox"]').attr('style', 'font-size: 10px !impotant').addClass('new-pm').html('<b>'+ pms +' </b>mesaje noi'); $(this).addClass('new-pm').html('<b>'+ pms +' </b>mesaje noi'); } else $(this).html('Mesagerie');
	});
});
