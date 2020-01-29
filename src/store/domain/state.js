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
    user: {
        domain: '',
    },
    category: {
        form: {
            name: '',
            detailName: ''
        }
    }
}

export default state;