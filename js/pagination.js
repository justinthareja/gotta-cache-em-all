var Pagination = (function(global) {
    const NUM_PAGES = 5;
    var $pagination;
    var currentPage = 1;
    var pageSet = 0;
    
    EVT.on("init", init);
    EVT.on("pagination-next-clicked", goToNextPage);
    EVT.on("pagination-previous-clicked", goToPreviousPage);
    EVT.on("pagination-number-clicked", goToPage);
    
    function init () {
        $pagination = document.querySelector(".js-pagination");
        $pagination.addEventListener("click", handlePageClick);
    
        render();
    }
    
    function handlePageClick(e) {
        if (e.target.matches(".js-page-next")) {
            // next button is clicked
            EVT.emit("pagination-next-clicked");
        } else if (e.target.matches(".js-page-previous") && currentPage > 1) {
            // previous button is clicked
            EVT.emit("pagination-previous-clicked");
        } else {
            // page number clicked
            const pageNumber = Number(e.target.getAttribute("id"));
            EVT.emit("pagination-number-clicked", pageNumber)
        }
    }
    
    function goToPage(page) {
        currentPage = page;
        render();
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
            pages.push(pageNumber);
        }
    
        pages.push("next");
        return pages;
    }
    
    function properNoun(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    
    function template() {
        // TODO: make previous appear disabled when current page = 1
        return makePages().reduce(
            function pagesHtml(htmlString, page) {
                var classNames = (`page
                    js-page-${page} 
                    page-${page}
                    ${page == currentPage ? "is-selected" : ""}
                `);
    
                var html = (`
                    <div id=${page} class="${classNames}">${
                        typeof page == "string" ? properNoun(page) : page
                    }</div>
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
