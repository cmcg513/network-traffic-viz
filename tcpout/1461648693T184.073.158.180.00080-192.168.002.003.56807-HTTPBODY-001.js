
            (function() {
                // Dynamic values from page request
                
            var script = document.getElementById("celtra-script-1");
            if (!script || script.tagName.toLowerCase() !== 'script')
               throw 'Element with id equal to scriptId does not exist or is not a script.';
        
                var runtimeParams = {"deviceInfo":{"platformVersion":"5.0.1","model":"6525LVW","browserVersion":"38.0.2125.509","deviceType":"Phone","browserName":"Chrome Mobile","primaryHardwareType":"Mobile Phone","browserRenderingEngine":"WebKit","osName":"Android","osVersion":"5.0.1","mobileDevice":true,"platform":"Android","vendor":"Verizon"},"ipDmaCode":501,"authToken":"44464f1b76fdc06761b3fafecf77b2e6","externalLineItemId":"455897058","ipCity":"New York","externalSiteId":"60390618","ipCountryCode":"US","gpsLat":"","customAudiences":{},"track.creativeLoads":"https:\/\/w.swarmdsp.com\/img\/t\/t.png?jmn_li=25354&jmn_crid=107785&jmn_au=117581459","clientTimeZoneOffsetInMinutes":240,"externalPlacementId":"90139458","preferredClickThroughWindow":"","ipRegionName":"New York","track.openWebsite":{"Dior Addict Lip Gloss Website":"https:\/\/w.swarmdsp.com\/img\/t\/t.png?jmn_clk=1&jmn_li=25354&jmn_crid=107785&jmn_au=117581459"},"ipAreaCode":212,"accountId":"8589122f","derivedAudiences":{},"ipPostalCode":"10011","purpose":"live","externalAdServer":"DFPPremium","authBasis":"1461648694170,80e49758,de5b1b37","gpsLng":"","neustarSegment":null,"variantChoices":{},"scriptId":"celtra-script-1","language":"en","ipLat":40.74209,"ipCountryName":"United States","pippioId":null,"ipMetroCode":501,"sessionId":"s1461648694xb830dc67f46c68x58543957","clickUrl":"https:\/\/adclick.g.doubleclick.net\/aclk?sa=L&ai=B0EBQNf0eV8r6HZWF3QGw0JSwDqLd1Z9EAAAAEAEgADgAWLL1-4eRA2DJxqmLwKTYD4IBF2NhLXB1Yi0yOTE3MjkzODI4NTc4MzAzsgELd3d3LmJiYy5jb226AQlnZnBfaW1hZ2XIAQnaAS1odHRwOi8vd3d3LmJiYy5jb20vbmV3cy93b3JsZC1ldXJvcGUtMzQ4OTc2NDWYAtg2wAIC4AIA6gI2LzQ4MTcvYmJjY29tLmxpdmUuc2l0ZS5tb2JpbGUubmV3cy9uZXdzX2V1cm9wZV9jb250ZW50-AL80R6QA-ADmAOMBqgDAeAEAdIFBhDi37HZAZAGAaAGINgGAtgHAOAHCw&num=0&cid=CAASEuRobOYsDMzOqXp7AH2I6j8X8w&sig=AOD64_0HM9-ODxsHclQqdbnZEKZNodx1Cg&client=ca-pub-2917293828578303&adurl=","clientTimestamp":"1461648694.828","expandDirection":"undefined","weather":{"windy":null,"currentCondition":"sunny","apparentTemperature":14},"ipTimeZone":"America\/New_York","ipRegionCode":"NY","tagVersion":"3","ipLng":-74.0018,"clickEvent":"firstInteraction","secure":0,"platformAdvIdTrackingLimited":null,"platformAdvId":null,"customIdentifiers":{},"externalCreativeId":"107659328178","placementId":"de5b1b37","firstPage":1,"monotypeProjectId":"c46ed090-3671-4163-a85b-b06b4038ae38","iosAdvId":null,"iosAdvIdTrackingLimited":null,"androidAdvId":null,"androidAdvIdTrackingLimited":null};
                runtimeParams.redirectJsClientTimestamp = new Date() / 1000;
                
                var macros = function (x) {
                    if (x instanceof Array) {
                        return x.map(macros);
                    } else {
                        var macroTags = [['{celtraPlacementId}', "de5b1b37"],
                                         ['{celtraCreativeId}', "80e49758"],
                                         ['{celtraAccountId}', "8589122f"],
                                         ['{celtraCampaignId}', "57d48ea8"],
                                         ['{celtraSupplierId}', "5d6de3e3"],
                                         ['{celtraProto}',"http"],
                                         ['{celtraRandom}', (Math.random()+'').slice(2)],
                                         ['{celtraPlatformAdvId}', null],
                                         ['{celtraPlatformAdvIdTrackingLimited}', ""],
                                         ['{celtraSessionId}', "s1461648694xb830dc67f46c68x58543957"],
                                         ['{celtraIosAdvId}', null],
                                         ['{celtraIosAdvIdTrackingLimited}', ""],
                                         ['{celtraIosAdvIdTrackingLimitedBoolStr}', ""],
                                         ['{celtraAndroidAdvId}', null],
                                         ['{celtraAndroidAdvIdTrackingLimited}', ""],
                                         ['{celtraAndroidAdvIdTrackingLimitedBoolStr}', ""],
                                         ['%s', "http"],
                                         ['%n', (Math.random()+'').slice(2)],
                                         ['{celtraCreativeId:int}', 2162464600],
                                         ['{celtraPlacementId:int}', 3730512695],
                                         ['{celtraCampaignId:int}', 1473547944],
                                         ['{celtraSupplierId:int}', 1567482851]
                                        ];
                        return macroTags.reduce(function(str, replacementRule, idx, arr) {
                            return str.replace(new RegExp(replacementRule[0], 'ig'), replacementRule[1] ? replacementRule[1] : '');
                        }, x);
                    }
                };
        
                
                // Dynamic values that we do not want to pass forward in urls,
                // so we look them up on every page request based on runtimeParams
                var openWebsiteOverrideUrls = {"Dior Addict Lip Gloss Website":"https:\/\/ad.doubleclick.net\/ddm\/clk\/303298245;130374120;s"};
                var getAppOverrideUrls      = {};
                
                // Less dynamic values for payload request
                var payloadBase = "http:\/\/cache.celtra.com\/api\/creatives\/80e49758\/compiled\/web.js";
                var cacheParams = {"v": "5-65ed772b2e", "secure": 0};
                
                var trackers = (function() {
            return [

        // 3rd-party tracker (regular)
        function(event) {
            if (event.name == 'adLoading')
                return {urls: macros(["https:\/\/ad.doubleclick.net\/ddm\/ad\/N884.283670MOBEXT47\/B9605104.130374120;sz=1x1;ord=%n;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?"])};

            if (event.name == 'firstInteraction')
                return {urls: macros([])};

            if (event.name == 'creativeLoaded')
                return {urls: macros(["https:\/\/w.swarmdsp.com\/img\/t\/t.png?jmn_li=25354&jmn_crid=107785&jmn_au=117581459"])};
            
            if (event.name == 'viewable00')
                return {urls: macros([])};
            
            if (event.name == 'viewable501')
                return {urls: macros([])};

            if (event.name == 'videoPlayInitiated')
                return {urls: macros([])};

            if (event.name == 'videoStart')
                return {urls: macros([])};

            if (event.name == 'videoFirstQuartile')
                return {urls: macros([])};

            if (event.name == 'videoMidpoint')
                return {urls: macros([])};

            if (event.name == 'videoThirdQuartile')
                return {urls: macros([])};

            if (event.name == 'videoComplete')
                return {urls: macros([])};

            if (event.name == 'custom')
                return {urls: macros({}[event.label] || [])};
            
            if (event.name == 'urlOpened')
                return {urls: macros({"Dior Addict Lip Gloss Website":["https:\/\/w.swarmdsp.com\/img\/t\/t.png?jmn_clk=1&jmn_li=25354&jmn_crid=107785&jmn_au=117581459"]}[event.label] || [])};
                
            if (event.name == 'storeOpened')
                return {urls: macros({}[event.label] || [])};

            
        },

        // 3rd-party tracker (click regular)
        function(event) {
            if (event.name === "firstInteraction")
                return {urls: macros([]), events: [{name: 'click'}] };
        },

            // Ad server tracker
            function(event) {
                if (event.name === "firstInteraction")
                    return {urls: macros(["https:\/\/adclick.g.doubleclick.net\/aclk?sa=L&ai=B0EBQNf0eV8r6HZWF3QGw0JSwDqLd1Z9EAAAAEAEgADgAWLL1-4eRA2DJxqmLwKTYD4IBF2NhLXB1Yi0yOTE3MjkzODI4NTc4MzAzsgELd3d3LmJiYy5jb226AQlnZnBfaW1hZ2XIAQnaAS1odHRwOi8vd3d3LmJiYy5jb20vbmV3cy93b3JsZC1ldXJvcGUtMzQ4OTc2NDWYAtg2wAIC4AIA6gI2LzQ4MTcvYmJjY29tLmxpdmUuc2l0ZS5tb2JpbGUubmV3cy9uZXdzX2V1cm9wZV9jb250ZW50-AL80R6QA-ADmAOMBqgDAeAEAdIFBhDi37HZAZAGAaAGINgGAtgHAOAHCw&num=0&cid=CAASEuRobOYsDMzOqXp7AH2I6j8X8w&sig=AOD64_0HM9-ODxsHclQqdbnZEKZNodx1Cg&client=ca-pub-2917293828578303&adurl="]), events: [{name: 'clickReportedToSupplier'}] };
            }
]
        })();
                trackers.urlsAndEventsFor = function(event) {
                    return this.reduce(function(acc, tracker) {
                        var ue = tracker(event) || {};
                        return {
                            urls:   acc.urls.concat(ue.urls || []),
                            events: acc.events.concat(ue.events || [])
                        };
                    }, {urls: [], events: []});
                };
                
                var adLoadingEvent = {"name":"adLoading","sessionId":"s1461648694xb830dc67f46c68x58543957"};
                adLoadingEvent.clientTimestamp = new Date/1000;

                trackers.urlsAndEventsFor(adLoadingEvent).urls.forEach(function(url) {
                    (new Image).src = url;
                });

                // Build payload url
                var pairs = [];
                for (var k in cacheParams)
                    pairs.push(encodeURIComponent(k) + '=' + encodeURIComponent(cacheParams[k]));
                var payloadUrl = payloadBase + '?' + pairs.join('&');
                
                // Request and run payload
                var payload = document.createElement('script');
                payload.src = payloadUrl;
                payload.onload = function() {
                    runtimeParams.payloadJsClientTimestamp = new Date() / 1000;
                    window.celtra.payloads[payloadUrl](script, runtimeParams, trackers, openWebsiteOverrideUrls, getAppOverrideUrls, macros);
                };
                script.parentNode.insertBefore(payload, script.nextSibling);
        
            })();
            