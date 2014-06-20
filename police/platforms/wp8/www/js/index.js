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

var serverIp = "http://192.168.0.20:8080/";
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        isParked();
    }
};

function isParked(){
    $("#verificationForm").submit(function(){
        console.log("yo");
        $.ajax({
            type: "POST",
            url: serverIp+"appli/isParked",
            data: $("#verificationForm").serialize(),
            success: function(data) {
                if(data.isParked){
                    $(".status:eq(0)").attr("state", "parked");
                }
                else{
                    $(".status:eq(0)").attr("state", "notParked");
                }
            }
        });
        return false;
    });    
}