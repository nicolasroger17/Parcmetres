/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var serverIp = "http://localhost:8080/";
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        amIConnected();
        connexion();
        $("#myInformationsBtn").click(function(){myInformations();});
        modifyMyInformations();
        $("#myCarsBtn").click(function(){myCars();});
        $("#chooseCar").click(function(){
            if($(this).attr("parked")=="false"){
                chooseCar();
            }
            else{
                stop();
            }            
        });
        chooseLocation();
        start();
    }
};

var cookie = "";

function amIConnected(){
    console.log("cookie before send");
    console.log(cookie);
    $.ajax({
        type: "GET",
        url: serverIp+"appli/amIConnected",
        data: {
            cookie: cookie
        },
        success: function(data) {
            if(data.iAmConnected){
                location.href = "#home";
            }
            else{
                location.href = "#connexion";
            }
        }
    });
}

function connexion(){
    $("#connexionForm").submit(function(){
        $.ajax({
            type: "POST",
            url: serverIp+"appli/connexion",
            data: {
                emailAddress: $("input[name='emailAddress']:eq(0)").val(),
                password: sha1($("input[name='password']:eq(0)").val())
            },
            success: function(data) {
                cookie = data.cookie;
                console.log(cookie);
                if(data.isConnected)
                    home();
            }
        });
        return false;
    });
}

function home(){
    $.ajax({
        type: "GET",
        url: serverIp+"appli/amIParked",
        data: {
            cookie : cookie
        },
        success: function(data) {
            if(data.amIParked){
                $("#chooseCar").attr("parked", "true");
                $("#chooseCar").html("Arrêter");
            }
            else{
                $("#chooseCar").attr("parked", "false");
                $("#chooseCar").html("Démarrer");
            }
            location.href = "#home";
        }
    });
}

function myInformations(){
    $.ajax({
        type: "GET",
        url: serverIp+"appli/myInformations",
        data: {
            cookie: cookie
        },
        success: function(data) {
            if(data.err == undefined){
                $("input[name='emailAddress']").val(data.emailAddress);
                $("input[name='lastName']").val(data.lastName);
                $("input[name='firstName']").val(data.firstName);
                $("input[name='address']").val(data.address);
                $("input[name='zipCode']").val(data.zipCode);
                $("input[name='phone']").val(data.phone);
                location.href = "#myInformations";
            }
            else{
                home();
            }
        }
    });
}

function modifyMyInformations(){
    $("#myInformtionsForm").submit(function(){
        console.log("submit my informations");
        var infos = $("#myInformtionsForm").serialize() + "&cookie="+cookie;
        console.log(infos);
        $.ajax({
            type: "POST",
            url: serverIp+"appli/modifyMyInformations",
            data: infos,
            success: function(data) {
                console.log(data);
            }
        });
        return false;
    });
}

function myCars(){
    $.ajax({
        type: "GET",
        url: serverIp+"appli/myCars",
        data: {
            cookie: cookie
        },
        success: function(data) {
            if(data.err == undefined){
                var html = "";
                for(car in data){
                    html += "<div class='myCars'>"+
                                "<img style='width: 200px;margin: auto;' src='"+serverIp+"webroot/images/"+data[car]['id']+"/photo.jpg'>"+
                                "<p>"+data[car]['name']+"</p>"+
                                "<p>"+data[car]['id']+"</p>"+
                            "</div>";
                }
                $("#myCarsContainer").html(html);
                location.href = "#myCars";
            }
            else{
                home();
            }
        }
    });
}

var chosenCarId = "";
function chooseCar(){
    $.ajax({
        type: "GET",
        url: serverIp+"appli/myCars",
        data: {
            cookie: cookie
        },
        success: function(data) {
            if(data.err == undefined){
                var html = "";
                for(car in data){
                    html += "<div class='chooseCar' car_id='"+data[car]['id']+"' car_name='"+data[car]['name']+"'>"+
                                "<img style='width: 200px;margin: auto;' src='"+serverIp+"webroot/images/"+data[car]['id']+"/photo.jpg'>"+
                                "<p>"+data[car]['name']+"</p>"+
                                "<p>"+data[car]['id']+"</p>"+
                            "</div>";
                }
                $("#chooseCarContainer").html(html);
                $(".chooseCar").each(function(){
                    $(this).click(function(){
                        $("#start_car_id").val($(this).attr("car_id"));
                        $("#start_car_name").html($(this).attr("car_name"));
                        $("#start_img").attr("src", serverIp+"webroot/images/"+$(this).attr("car_id")+"/photo.jpg");
                        location.href = "#chooseLocation";
                        setTimeout(function(){
                            startMap();
                        }, 500);
                    });
                });
                location.href = "#chooseCar";
            }
            else{
                home();
            }
        }
    });
}

function chooseLocation(){
    $("#chooseLocationForm").submit(function(){
        location.href="#start";
        getAddress();
        return false;
    });
}

function getAddress(){
    $.ajax({
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+$("input[name='locationX']").val()+","+$("input[name='locationY']").val()+"&sensor=true",
        success: function(data) {
            $("#position").html(data['results'][0]['formatted_address']);
        }
    });
}

function start(){
    $("#startForm").submit(function(){
        $.ajax({
            type: "POST",
            url: serverIp+"appli/startSession",
            data: $("#startForm").serialize() + "&cookie="+cookie,
            success: function(data) {
                home();
            }
        });
        return false;
    });
}

function stop(){
    $.ajax({
        type: "POST",
        url: serverIp+"appli/stop",
        data: {
            cookie: cookie
        },
        success: function(data) {
            if(!data.amIParked){
                $("#chooseCar").attr("parked", "false");
                $("#chooseCar").html("Démarrer");
            }
        }
    });
}

function startMap(){
    $('#map-canvas').gmap().bind('init', function(evt, map) {
        $('#map-canvas').gmap('getCurrentPosition', function(position, status) {
            if ( status == "OK" ) {
                var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                $('#map-canvas').gmap('addMarker', {'position': clientPosition, 'bounds': true});
                $("input[name='locationX']").val(position.coords.latitude);
                $("input[name='locationY']").val(position.coords.longitude);
            }
        });   
    });
}

function sha1(e){
    function t(e,t){var n=e<<t|e>>>32-t;return n}function n(e){var t="";var n;var r;var i;for(n=0;n<=6;n+=2){r=e>>>n*4+4&15;i=e>>>n*4&15;t+=r.toString(16)+i.toString(16)}return t}function r(e){var t="";var n;var r;for(n=7;n>=0;n--){r=e>>>n*4&15;t+=r.toString(16)}return t}function i(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t}var s;var o,u;var a=new Array(80);var f=1732584193;var l=4023233417;var c=2562383102;var h=271733878;var p=3285377520;var d,v,m,g,y;var b;e=i(e);var w=e.length;var E=new Array;for(o=0;o<w-3;o+=4){u=e.charCodeAt(o)<<24|e.charCodeAt(o+1)<<16|e.charCodeAt(o+2)<<8|e.charCodeAt(o+3);E.push(u)}switch(w%4){case 0:o=2147483648;break;case 1:o=e.charCodeAt(w-1)<<24|8388608;break;case 2:o=e.charCodeAt(w-2)<<24|e.charCodeAt(w-1)<<16|32768;break;case 3:o=e.charCodeAt(w-3)<<24|e.charCodeAt(w-2)<<16|e.charCodeAt(w-1)<<8|128;break}E.push(o);while(E.length%16!=14)E.push(0);E.push(w>>>29);E.push(w<<3&4294967295);for(s=0;s<E.length;s+=16){for(o=0;o<16;o++)a[o]=E[s+o];for(o=16;o<=79;o++)a[o]=t(a[o-3]^a[o-8]^a[o-14]^a[o-16],1);d=f;v=l;m=c;g=h;y=p;for(o=0;o<=19;o++){b=t(d,5)+(v&m|~v&g)+y+a[o]+1518500249&4294967295;y=g;g=m;m=t(v,30);v=d;d=b}for(o=20;o<=39;o++){b=t(d,5)+(v^m^g)+y+a[o]+1859775393&4294967295;y=g;g=m;m=t(v,30);v=d;d=b}for(o=40;o<=59;o++){b=t(d,5)+(v&m|v&g|m&g)+y+a[o]+2400959708&4294967295;y=g;g=m;m=t(v,30);v=d;d=b}for(o=60;o<=79;o++){b=t(d,5)+(v^m^g)+y+a[o]+3395469782&4294967295;y=g;g=m;m=t(v,30);v=d;d=b}f=f+d&4294967295;l=l+v&4294967295;c=c+m&4294967295;h=h+g&4294967295;p=p+y&4294967295}var b=r(f)+r(l)+r(c)+r(h)+r(p);return b.toLowerCase()
}