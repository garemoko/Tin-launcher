/*
=============COPYRIGHT============ 
Tin Launcher - Launches xAPI Packages, a technical demo. 
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



//Create an instance of the Tin Can Library
var myTinCan = new TinCan();
myTinCan.DEBUG = 1;


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

    // Launch the activity.
    $('#launchActivity').click(launchActivity);

     //Set debug defaults
    var setDebugDefaults = true;
    
    if (setDebugDefaults){
        $('#endpoint0').val('https://sandbox.watershedlrs.com/api/organizations/XXXX/lrs/');
        $('#basicLogin0').val('key');
        $('#basicPass0').val('secret');
        $('#actorAgentName1').val('Actor name');
        $('#actorAgentFunctionalIdentifier1').val('actor@example.com');
        $('#launchURL').val('http://xapigo.com/golf/');
        $('#registration').val(TinCan.Utils.getUUID);
    }
});
/*============END DOCUMENT READY==============*/


/*============SEND STATEMENT==============*/
function launchActivity()
{

    
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
    launchLink += '&actor=' + JSON.stringify(myActor.asVersion('1.0.0'));
    if ($('#registration').val()){
        launchLink += '&registration=' + $('#registration').val();
    }
    window.open(launchLink);
}

