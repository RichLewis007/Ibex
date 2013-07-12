// This file was generated by Dashcode from Apple Inc.
// You may edit this file to customize your Dashboard widget.

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    setupParts();
	bgn();
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
	bgn();
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}


function bgn(event)
{
// Values you provide
//var feedURL = "http://i.i/ext.rexx/global/leaderboard.csv";
var feedURL = "http://hexibex.us/engine/ext.rexx/global/leaderboard.csv";
var onloadHandler = function() { xmlLoaded(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

// XMLHttpRequest setup code
var xmlRequest = new XMLHttpRequest();
xmlRequest.onload = onloadHandler;
xmlRequest.open("GET", feedURL);
xmlRequest.setRequestHeader("Cache-Control", "no-cache");
xmlRequest.send(null);

}

// Called when an XMLHttpRequest loads a feed; works with the XMLHttpRequest setup snippet
function xmlLoaded(xmlRequest) 
{
	if (xmlRequest.status == 200) {
		// Parse and interpret results
		// XML results found in xmlRequest.responseXML
		// Text results found in xmlRequest.reponseText
		var r=xmlRequest.responseText;
		var a=r.split('\n');
		var n=a.length;
		var i,l,b;
		for (i=0;i<n;i++)
		{
			l=a[i];
			if (l.length>0)
			{
				b=l.split(',');
				if (b[0]=='might')
					document.getElementById('txtMight').innerText=b[2]+'\n'+b[3]+' '+b[4];
				if (b[0]=='expand')
					document.getElementById('txtExpand').innerText=b[2]+'\n'+b[3]+' '+b[4];
				if (b[0]=='wealth')
					document.getElementById('txtWealth').innerText=b[2]+'\n'+b[3]+' '+b[4];
			}
		}
	}
	else {
		alert("Error fetching data: HTTP status " + xmlRequest.status);
	}
}