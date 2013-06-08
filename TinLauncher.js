/*
=============COPYRIGHT============ 
Tin Statement Sender - An I-Did-This prototype for Tin Can API 0.95
Copyright (C) 2012  Andrew Downes

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
<http://www.gnu.org/licenses/>.
*/






/*============DOCUMENT READY==============*/
$(function(){
	
	
	//Set Up LRS
	//Add one blank LRS to the page by default
	appendLRS();
	
	
	//Set up Actor
	appendGroup('actorAgent').addClass('displayNone');
	appendAgent('actorAgent');
	$('#actorObjectType').change({elementId: 'actor'},ObjectTypeChanged);
	$('#actorAgentAdd').click({elementId: 'actorAgent'},appendAgentOnEvent);
	$('#actorAgentRemove').click({elementId: 'actorAgent', propertyClass: 'agent', minimum:0},removeProperty);
	
	//send statement
	$('#sendStatement').click(launchCaptivate);
	
	
		//Set debug defaults
	var setDebugDefaults = true;
	
	if (setDebugDefaults){
		$('#endpoint0').val('http://cloud.scorm.com/ScormEngineInterface/TCAPI/public/');
		$('#basicLogin0').val('x');
		$('#basicPass0').val('x');
		$('#actorAgentName1').val('Andrew Downes');
		$('#actorAgentFunctionalIdentifier1').val('andrew@tincanapi.co.uk');
		$('#launchURL').val('file:///D:/Data/Documents/My%20Adobe%20Captivate%20Projects/untitled1/index_TinCan.html');
	}
	
});
/*============END DOCUMENT READY==============*/


/*============SEND STATEMENT==============*/
function launchCaptivate()
{
	//Create an instance of the Tin Can Library
	var myTinCan = new TinCan();
	
	myTinCan.DEBUG = 1;
	
	var launchLink = $('#launchURL').val();
	launchLink += '?endpoint=' + $('.endpoint').val();
	launchLink += '&auth=Basic ' + Base64.encode($('.basicLogin').val() + ':' + $('.basicPass').val());
	
	
	var myActor;
	switch($('#actorObjectType').val())
	{
		case 'Agent':
			myActor = getActor($('#actor').find('.agent:first'));
		break;
		case 'Group':
			myActor = getActor($('#actor').find('.group:first'), 'Group');
			console.log(JSON.stringify(myActor));
			 $('#actor').find('.agent').each(function(index){
			 	var agentToAddToGroup = getActor($(this));
				myActor.member.push(agentToAddToGroup);
			 });
		break;
	}
	

	launchLink += '&actor=' + JSON.stringify(myActor);
	launchLink += '&registration=' + $('registration').val();

	window.open(launchLink);

	
	
	
	
}

