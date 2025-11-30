// 确保只有选中的分组默认展开，其他分组默认折叠
(function() {
    function initCollapsibleGroups() {
        // 等待 expandable-chapters 插件初始化完成
        if (typeof require !== 'undefined') {
            require(['gitbook', 'jQuery'], function (gitbook, $) {
                function collapseInactiveGroups() {
                    // 找到所有包含子菜单的分组
                    $('.book-summary .chapter').each(function() {
                        var $chapter = $(this);
                        var $ul = $chapter.find('> ul');
                        
                        // 如果这个分组有子菜单
                        if ($ul.length > 0) {
                            // 检查是否有活动的子项
                            var hasActive = $ul.find('.chapter.active').length > 0;
                            
                            // 如果没有活动项，确保它是折叠的
                            if (!hasActive) {
                                $chapter.removeClass('expanded');
                            }
                            // 如果有活动项，确保它是展开的
                            else {
                                $chapter.addClass('expanded');
                            }
                        }
                    });
                }
                
                // 页面加载时执行
                gitbook.events.bind('page.change', function() {
                    // 延迟执行，确保 expandable-chapters 插件已经处理完
                    setTimeout(collapseInactiveGroups, 200);
                });
                
                // 初始加载时也执行
                setTimeout(collapseInactiveGroups, 500);
            });
        } else {
            // 如果 require 不可用，使用 jQuery
            $(document).ready(function() {
                setTimeout(function() {
                    $('.book-summary .chapter').each(function() {
                        var $chapter = $(this);
                        var $ul = $chapter.find('> ul');
                        
                        if ($ul.length > 0) {
                            var hasActive = $ul.find('.chapter.active').length > 0;
                            
                            if (!hasActive) {
                                $chapter.removeClass('expanded');
                            } else {
                                $chapter.addClass('expanded');
                            }
                        }
                    });
                }, 500);
            });
        }
    }
    
    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCollapsibleGroups);
    } else {
        initCollapsibleGroups();
    }
})();

