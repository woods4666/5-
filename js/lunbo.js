~(function () {
    class Tab {
        constructor(options = {}) {
            let {
                ele,
                defaultIndex = 0,
                interval = 3000
            } = options;
            $.each(['ele', 'defaultIndex', 'interval'], (index, item) => {
                this[item] = eval(item);
            });
            this.$sider = $(ele);
            this.$tabBox = this.$sider.find('.tabBox');
            this.$tabList = this.$tabBox.find('li');
            this.$imgBox = this.$sider.find('.imgBox');
            this.$imgList = this.$imgBox.find('img');
            this.curIndex = this.defaultIndex;
            this.lastIndex = this.curIndex;

            this._timer = null;
            this.init();
        }

        init() {
            this.default();
            this._timer = setInterval(() => {
                this.autoTab();
            }, 3000);
            this.handleTab();
        }
        default(){
            this.$lastLi = this.$tabList.eq(this.lastIndex);
            this.$current = this.$lastLi.find('.current');
            this.$lastLi.addClass('active');
            this.$imgList.eq(this.lastIndex).addClass('active');
        }
        changeTab(flag) {
            this.$curLi = this.$tabList.eq(this.curIndex);
            this.$lastLi = this.$tabList.eq(this.lastIndex);
            this.$current = this.$curLi.find('.current');  
            if (flag) {
                this.$current.addClass('handle');
            } else {
                this.$current.removeClass('handle');
            }
            this.$curLi.addClass('active');
            this.$lastLi.removeClass('active');
            this.$imgList.eq(this.curIndex).addClass('active');
            this.$imgList.eq(this.lastIndex).removeClass('active');
            this.lastIndex = this.curIndex;
        };

        autoTab() {
            this.curIndex++;
            if (this.curIndex === this.$imgList.length) {
                this.curIndex = 0;
            }
            this.changeTab();
        };

        handleTab() {
            let _this = this;
            _this.$tabList.on("mouseenter", () => {
                clearInterval(this._timer);
            }).on('mouseleave', () => {
                _this._timer = setInterval(() => {
                    _this.autoTab()
                }, _this.interval);
            }).on('click', function() {
                _this.curIndex = $(this).index();
                console.log($(this));
                console.log(_this.curIndex);
                _this.changeTab(1);
            });
        }
    }

    window.Tab = Tab;
    let sider = new Tab({
        ele: '#sider'

    });
    let collection = new Tab({
        ele: '#collection',
        defaultIndex: 1
    });
})();