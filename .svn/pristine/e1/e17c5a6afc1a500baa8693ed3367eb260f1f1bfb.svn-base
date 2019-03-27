import { getCorporateInfo, update, remove, create } from './service'
import organization from './org-form'
import department from '../department/index.vue'

export default {
    name: 'organizationManage',
    props: ['windowOutHeight'],
    components: {
        organization,
        department,
        // group,
        // position
    },
    data () {
        let options = [];
        for (let i = 0; i < 26; i++) {
            options.push(String.fromCharCode(65 + i))
        }
        return {
            aExpandedKeys: [],
            oExpandedKey: {},
            oTreeNodeChildren: {},
            dataList: [],
            defaultProps: {
                label: 'corpname',
                children: 'children'
            },
            formEdit: true,
            formStatus: '',
            currentData: null,
            loading: false,
            show: true,
            filters: '',
            options,
            // currentTabComponent: 'organization', // organization department group position
            showTooltip: false,
            currentFilter: 'W',
            filterText: ''
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        handlerAdd () {
            this.formEdit = false;
            this.formStatus = 'create';
            if (!this.currentData) {
                this.$refs.tree.setCurrentKey(0)
            }
            // const node = this.$refs.tree.getNode(this.currentData.id);
            // this.addSetComponent(node);
        },
        handlerEdit () {
            if (!this.currentData) {
                this.$message({
                    message: '未选中公司',
                    type: 'warning'
                });
                return
            }
            this.formEdit = false;
            this.formStatus = 'update'
        },
        handleDelete () {
            // const {data} = this.$refs.tree.getNode(this.currentData.id);
            this.$confirm('确定删除此公司?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await remove(this.currentData.id)
                    this.$refs.tree.remove(this.currentData)
                    this.$refs.tree.setCurrentKey(0)
                    this.currentData = null
                    this.onCancel()
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                } catch (e) {

                }
            })
        },
        getNodeData (data, node) {
            if (!this.formEdit) {
                this.formStatus = 'update'
            }
            this.currentData = data;
        },
        /**
         * 更新tree
         * @param form
         */
        async update (form) {
            try {
                let param = Object.assign({}, form);
                param.area = param.addressAll.toString()
                await update(param)
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                });
                this.currentData = param
                this.reload()
                this.onCancel();
            } catch (e) {

            }
        },
        async create (form) {
            try {
                let param = Object.assign({}, form);
                param.area = param.addressAll.toString()
                await create(param)
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
                this.currentData = param
                this.reload()
                this.onCancel();
            } catch (e) {

            }
        },
        onCancel () {
            this.formEdit = true;
            this.formStatus = ''
        },
        /**
         * 重新加载tree
         */
        reload (item) {
            this.show = false;
            this.getCorporateInfo()
            this.$nextTick(() => {
                this.show = true;
            });
            this.onCancel();
        },
        nodeExpand (data) {
            let aChildren = data.children
            if (aChildren.length > 0) {
                this.oExpandedKey[data.id] = true
                this.oTreeNodeChildren[data.id] = aChildren
            }
            this.setExpandedKeys()
        },
        nodeCollapse (data) {
            this.oExpandedKey[data.id] = false
            // 如果有子节点
            this.treeRecursion(this.oTreeNodeChildren[data.id], (oNode) => {
                this.oExpandedKey[oNode.id] = false
            });
            this.setExpandedKeys()
        },
        treeRecursion (aChildren, fnCallback) {
            if (aChildren) {
                for (let i = 0; i < aChildren.length; ++i) {
                    let oNode = aChildren[i]
                    fnCallback && fnCallback(oNode)
                    this.treeRecursion(oNode.children, fnCallback)
                }
            }
        },
        setExpandedKeys () {
            let oTemp = this.oExpandedKey
            this.aExpandedKeys = []
            for (let sKey in oTemp) {
                if (oTemp[sKey]) {
                    this.aExpandedKeys.push(parseInt(sKey));
                }
            }
        },
        /**
         * 查询组织
         * @returns {Promise<void>}
         * @returns item
         */
        async getCorporateInfo (item) {
            // let params = {
            //     corpshortname: item.toLocaleLowerCase()
            // };
            this.loading = true;
            try {
                const {data} = await getCorporateInfo();
                this.loading = false;
                this.dataList = data.data
                // resolve(data.data.records);
            } catch (e) {
                this.loading = false;
            }
        },
        filterOrg (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },
    mounted () {
        this.getCorporateInfo();
    }
}