(function(window, angular, undefined) {'use strict';
    /**
    * @ngdoc overview
    * @name angulartics.adobe.analytics
    * Enables analytics support for Adobe Analytics (http://adobe.com/analytics)
    */
    angular.module('angulartics.adobe.analytics', ['angulartics'])
    .config(['$analyticsProvider', function ($analyticsProvider) {
        $analyticsProvider.settings.pageTracking.trackRelativePath = true;
        $analyticsProvider.registerPageTrack(function (path) {
            if (window.s) {
                s.pageName = getPageName(path);
                s.eVar1 = getUrl(path);
                s.t();
                s.clearVars();
            }
        });
        /**
        * Track Event in Adobe Analytics
        * @name eventTrack
        * @param {string} action Required 'action' (string) associated with the event
        */
        $analyticsProvider.registerEventTrack(function (action) {
            if (window.s) {
                if(action) {
                    if(action.toUpperCase() === "DOWNLOAD")
                    s.tl(this,'d',action);
                    else if(action.toUpperCase() === "EXIT")
                    s.tl(this,'e',action);
                    else
                    s.tl(this,'o',action);
                }
            }
        });
    }]);
})(window, window.angular);

function getPageName(path) {
    var pageName = path.substring(1);
    pageName = pageName.split('/');
    pageName = pageName.join(' | ');
    pageName = pageName.split('-').join(' ');
    pageName = toTitleCase(pageName);
    if (pageName === '') {
        pageName = 'Homepage | Post Login';
    }
    return pageName;
}

function getUrl(path) {
    return siteSettings.siteUrl + path;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
