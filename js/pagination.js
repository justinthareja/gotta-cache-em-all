var Pagination = (function(global) {
    const NUM_PAGES = 5;
    var $pagination;
    var currentPage = 1;
    var pageSet = 0;
    
    EVT.on("init", init);
    EVT.on("pagination-next-clicked", goToNextPage);
    EVT.on("pagination-previous-clicked", goToPreviousPage);
    
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

        if (e.target.matches(".js-page-previous") && currentPage > 1) {
            EVT.emit("pagination-previous-clicked");
            return;
        }
    }
    
    function goToNextPage() {
        // TODO: find last page
        currentPage++;
        render();
    }

    function goToPreviousPage() {
        if (currentPage == 1) return;

        currentPage--;
        render();
    }
    
    function makePages() {
        var firstPage = (NUM_PAGES * pageSet) + 1;
        var lastPage = NUM_PAGES * (pageSet + 1);

        if (currentPage > lastPage) {
            pageSet ++;
        }

        if (currentPage < firstPage) {
            pageSet--;
        }

        var pages = ["previous"];
        
        for (let i = 1; i <= NUM_PAGES; i++) {
            let pageNumber = (NUM_PAGES * pageSet + i);
            pages.push(String(pageNumber));
        }
    
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
