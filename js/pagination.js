var Pagination = (function(global) {
    const NUM_PAGES = 5; // number of pages available on pagination ui
    const ITEMS_PER_PAGE = 20; // total number of pokemon per page

    var $pagination;
    var currentPage = 1;
    var pageSet = 0;
    
    EVT.on("init", init);
    EVT.on("pagination-click", goToPage);
    
    function init () {
        $pagination = document.querySelector(".js-pagination");
        $pagination.addEventListener("click", handlePageClick);
    
        render();
    }
    
    function handlePageClick(e) {
        if (!e.target.matches(".js-page")) {
            return;
        }

        goToPage(e.target.getAttribute("id"));
    }
    
    function goToPage(page) {
        if (page == "previous" && currentPage > 1) {
            currentPage--;
        } else if (page == "next") {
            currentPage ++;
        } else {
            currentPage = Number(page);
        }
        
        EVT.emit("page-update", currentPage);
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
                    page-${page}
                    js-page
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
    
    function getState() {
        return { 
            currentPage, 
            itemsPerPage: ITEMS_PER_PAGE 
        };
    }

    var publicAPI = {
        getState
    };

    return publicAPI;

})(this);
