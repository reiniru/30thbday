
async function typeDialog(dialog, element, delay = 100) {
	const letters = dialog.split("");
	for (const letter of letters) {
		await waitFor(delay);
		$(element).text($(element).text() + letter);
	}
}

function waitFor(duration) {
	return new Promise(resolve => setTimeout(resolve, duration))
}

$(function() {
	runIntroDialog();
	unMuteMusic();
	$("#musicIcon").click(function() {
		if (isMusicMuted()) {
			unMuteMusic();
		} else {
			muteMusic();
		}
	});
	
	$("#actionWhen").click(function() {
		runWhenDialog();
	});
	
	$("#actionWhere").click(function() {
		runWhereDialog();
	});
});

function unMuteMusic() {
	$("#music").get(0).volume = 1;
	$("#music").get(0).muted = false;
	$("#musicIcon").removeClass("musicOff");
	$("#musicIcon").addClass("musicOn");
	$("#musicIcon").attr('src', musicOnIconSrc);
}

function muteMusic() {
	$("#music").get(0).volume = 0;
	$("#music").get(0).muted = true;
	$("#musicIcon").removeClass("musicOn");
	$("#musicIcon").addClass("musicOff");
	$("#musicIcon").attr('src', musicOffIconSrc);
}

function isMusicMuted() {
	return $("#music").get(0).muted === true;
}

function isMusicIconOn() {
	return $("#musicIcon").hasClass('musicOn') === true;
}

$(window).click(function() {
	if (isMusicIconOn()) {
		$("#music").get(0).play();
	}
})

async function runIntroDialog() {
	await typeDialog(dialogIntroPart1, "#dialog-text");
	await waitFor(800);
	await typeDialog(dialogIntroPart2, "#dialog-text");
	enableActionDialog();
}

async function runWhenDialog() {
	disableActionDialog();
	disableActionDialog();
	clearDialog();
	await typeDialog(dialogWhen, "#dialog-text");
	enableActionDialog();
}

async function runWhereDialog() {
	disableActionDialog();
	clearDialog();
	await typeDialog(dialogWhere, "#dialog-text");
	showMap();
	enableActionDialog();
}

function clearDialog() {
	$("#dialog-text").text("");
	$("#mapContainer").html("");
}

function enableActionDialog()  {
	$("#dialog-action").attr("hidden", false);
}

function disableActionDialog()  {
	$("#dialog-action").attr("hidden", true);
}

function showMap() {
	$("#mapContainer").html(iframeMap);
}
