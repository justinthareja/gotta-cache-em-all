var Pagination = (function(global) {
    const NUM_PAGES = 5;
    var $pagination;
    var currentPage = 1;
    
    EVT.on("init", init);
    
    function init () {
        $pagination = document.querySelector(".js-pagination");
        $pagination.addEventListener("click", handlePageClick);
    
        render();
    }
    
    function handlePageClick(e) {
        if (e.target.matches(".js-page-next")) {
            EVT.emit("pagination-next-clicked");
            return;
        }

        if (e.target.matches(".js-page-previous")) {
            EVT.emit("pagination-previous-clicked");
            return;
        }
    }
    
    
    function makePages() {
        var pages = ["previous"];
    
        // for (var i = 1; i <= NUM_PAGES; i++) {
        //     pages.push(String(i));
        // }
    
        pages.push("next");
        return pages;
    }
    
    function properNoun(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    
    function template() {
        return makePages().reduce(
            function pagesHtml(htmlString, page) {
                var classNames = (`page
                    js-page-${page} 
                    page-${page}
                    ${page == currentPage ? "is-selected" : ""}
                `);
    
                var html = (`
                    <div class="${classNames}">${properNoun(page)}</div>
                `);
    
                return htmlString + html;
            },
            ""
        );
    }
    
    function render() {
        $pagination.innerHTML = template();
    }
    
    var publicAPI = {};
    return {};

})(this);
