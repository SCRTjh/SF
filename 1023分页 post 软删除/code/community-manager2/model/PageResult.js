/**
 * 分页的结果集对象
 */

class PageResult {
    /**
     * @param {number} pageIndex  当前的页码
     * @param {number} totalCount  总记录数
     * @param {Array} listData 查询的列表
     */
    constructor(pageIndex, totalCount, listData) {
        this.pageIndex = pageIndex;
        this.totalCount = totalCount;
        this.listData = listData;

        this.pageCount = Math.ceil(totalCount / 10);
        this.pageStart = this.pageIndex - 2 <= 0 ? 1 : this.pageIndex - 2;
        this.pageEnd = this.pageStart + 4 > this.pageCount ? this.pageCount : this.pageStart + 4;
    }
}

module.exports = PageResult;