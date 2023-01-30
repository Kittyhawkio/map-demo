const userAgent = window.navigator.userAgent;
const isIE10OrOlder = userAgent.indexOf('MSIE') > 0;
const isIE11 = userAgent.indexOf('Trident/') > 0;

if (isIE10OrOlder || isIE11) {
	//IE is unsupported by mapbox 2.0+
	window.alert(
		'Sorry, Internet Explorer is not supported. Please access B4UFLY from a different browser.'
	);
}
