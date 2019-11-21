var PLATFORMS_MAP={ipad:isIpad,iphone:isIphone,ios:isIOS,android:isAndroid,phablet:isPhablet,tablet:isTablet,cordova:isCordova,capacitor:isCapacitorNative,electron:isElectron,pwa:isPWA,mobile:isMobile,mobileweb:isMobileWeb,desktop:isDesktop,hybrid:isHybrid};function getPlatforms(t){return setupPlatforms(t)}function isPlatform(t,i){return getPlatforms(t).includes(i)}function setupPlatforms(t){t.Ionic=t.Ionic||{};var i=t.Ionic.platforms;if(null==i){i=t.Ionic.platforms=detectPlatforms(t);var e=t.document.documentElement.classList;i.forEach(function(t){return e.add("plt-"+t)})}return i}function isMobileWeb(t){return isMobile(t)&&!isHybrid(t)}function detectPlatforms(t){return Object.keys(PLATFORMS_MAP).filter(function(i){return PLATFORMS_MAP[i](t)})}function isIpad(t){return testUserAgent(t,/iPad/i)}function isIphone(t){return testUserAgent(t,/iPhone/i)}function isIOS(t){return testUserAgent(t,/iPad|iPhone|iPod/i)}function isAndroid(t){return testUserAgent(t,/android|sink/i)}function isPhablet(t){var i=t.innerWidth,e=t.innerHeight,n=Math.min(i,e),r=Math.max(i,e);return n>390&&n<520&&r>620&&r<800}function isTablet(t){var i=t.innerWidth,e=t.innerHeight,n=Math.min(i,e),r=Math.max(i,e);return n>460&&n<820&&r>780&&r<1400}function isMobile(t){return matchMedia(t,"(any-pointer:coarse)")}function isDesktop(t){return!isMobile(t)}function isHybrid(t){return isCordova(t)||isCapacitorNative(t)}function isCordova(t){return!!(t.cordova||t.phonegap||t.PhoneGap)}function isCapacitorNative(t){var i=t.Capacitor;return!(!i||!i.isNative)}function isElectron(t){return testUserAgent(t,/electron/)}function isPWA(t){return t.matchMedia("(display-mode: standalone)").matches||t.navigator.standalone}function testUserAgent(t,i){return i.test(t.navigator.userAgent)}function matchMedia(t,i){return t.matchMedia(i).matches}export{isPlatform as a,PLATFORMS_MAP as b,getPlatforms as c,setupPlatforms as d,testUserAgent as e};