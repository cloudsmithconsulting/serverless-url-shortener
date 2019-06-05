var apiRoot = "https://csurls.azurewebsites.net/api/UrlIngest?code=j7mYn6pHpSfqoUamO9eDPC1M9okxTaVJqGiVbbWq4Fh2/nC4IiZdSg==";

var app = new Vue({

    el: '#app',

    data: {
        url: '',
        tagSource: true,
        tagMediums: true,
        urls: [],
        busy: false,
        alertText: null,
        showAlert: false
    },

    created: function () {
        this.showAlert = false;
        this.busy = false;
    },

    watch: {

        // set busy flag when count of pending asynchronous operations changes
        // could change busy to a computed field too 
        'busyCount': function () {
            this.busy = this.busyCount > 0;
        }
    },

    methods: {

        // get the group list 
        shorten: function () {
            var _this = this;
            this.busyCount++;
            $.ajax({
                type: 'POST',
                url: apiRoot,
                data: JSON.stringify({
                    tagSource: _this.tagSource,
                    tagMediums: _this.tagMediums,
                    input: encodeURI(_this.url)
                }),
                contentType: 'application/json'
            })
                .done(function (data) {
                    _this.urls = data;
                }).fail(function (err) {
                    _this.showAlert = true;
                    _this.alertText = err;
                }).always(function () { _this.busyCount--; });
        }
    }

});