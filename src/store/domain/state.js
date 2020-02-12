const state = {
    authority: {
        edit: false,
    },
    colors: ['indigo', 'orange', 'primary', 'green', 'teal', 'pink', 'cyan'],
    categroyLinkMenu: [{
        icon: 'favorite',
        text: '收藏',
        color: 'error',
        com: 'add',
    }, {
        icon: 'delete_forever',
        text: '删除',
        color: 'info',
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