/**
 * 分页的结果集对象
 * @author 汤俊豪
 * @date 2022-10-23
 */


class PageResult {

    constructor(pageIndex, totalCount, listDate) {
        this.pageIndex = pageIndex;
        this.totalCount = totalCount;
        this.listDate = listDate;

        this.pageCount = Math.ceil(totalCount / 10);
        this.pageStart = this.pageIndex - 2 <= 0 ? 1 : this.pageIndex - 2;
        this.pageStart + 4 > this.pageCount ? this.pageCount : this.pageStart + 4;
    }
}

module.exports = PageResult;