const state = {
    authority: {
        edit: false,
    },
    colors: ['indigo', 'orange', 'primary', 'green', 'teal', 'pink', 'cyan'],
    loveLinkMenus: [{
        icon: 'add_circle',
        text: '添加喜欢',
        color: 'success',
        com: 'add',
    }, {
        icon: 'delete_forever',
        text: '回收处理',
        color: 'error',
        com: 'delete',
    }],
    categroyLinkMenu: [{
        icon: 'favorite',
        text: '收藏',
        color: 'success',
        com: 'add',
    }, {
        icon: 'delete_forever',
        text: '删除',
        color: 'error',
        com: 'delete',
    }, {
        icon: 'bubble_chart',
        text: '编辑',
        color: 'warning',
        com: 'edit',
    }],
    user: {
        domain: '',
    },
    category: {
        form: {
            name: '',
            detailName: ''
        }
    },
    link: {
        form: {
            url: '',
            name: ''
        }
    }
}

export default state;