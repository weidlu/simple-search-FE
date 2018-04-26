let com;
if (com == undefined) com = {};
if (com.ebay == undefined) com.ebay= {};
if (com.ebay.sre == undefined) com.ebay.sre = {};

com.ebay.sre.search = {
    searchInput: 'searchInput',
    searchContent: 'searchContent',
    init: function () {
        console.log('init index page (search page)');
        com.ebay.sre.search.bindEvent();
        console.log('must be bound.')
    },

    bindEvent: function () {
        let $this = com.ebay.sre.search;
        $this.pageNavigate();
    },

    pageNavigate: function () {
        $this = com.ebay.sre.search;
        $('.pagination').twbsPagination({
            totalPages: 35,
            visiblePages: 7,
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
                console.log('page '+page);
                let searchword = $('#searchword')["0"].placeholder;
                console.log('search:' + {page: page, searchword: searchword});
                $.ajax({
                    type: 'post',
                    url: '/pageNavigate',
                    data: {page: page, searchword: searchword},
                    /*timeout: 10000,*/
                    success: function(data) {
                        console.log('search success.');
                        $('.' + $this.searchContent).html(data);
                    },
                    error: function (response, status, err) {
                        console.log('submission was error', response);
                        console.log(status, err);
                        // cant get response.
                        /*feedback(response);*/
                    }
                });
            }
        })
    },

    search: function () {
        let $this = com.ebay.sre.search;
        let form = $('#' + $this.searchInput);
        form.submit(function (e) {
            e.preventDefault();
            console.log('click search submit btn');
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                /*timeout: 10000,*/
                error: function (response, status, err) {
                    console.log('submission was error', response);
                    // cant get response.
                    /*feedback(response);*/
                },
                success(data) {
                    console.log('Submission was successful.', data);
                    /*$('#' + $this.searchContent).html(data);*/
                    $("html").html(data);
                },
            });
        })
    }

};