<template>
    <div class="order-process-box">
        <div style="height: 500px; width: 200px; min-width: 200px; margin-top: 10px" v-if="!$route.query.isEdit">
            <el-steps direction="vertical" :active="0">
                <el-step :title="type === 'INSTALL' ? '新建安装单' : '新建维修/拆除单'"></el-step>
                <el-step title="接单"></el-step>
                <el-step title="施工安装"></el-step>
                <el-step title="保险出单"></el-step>
                <el-step title="订单完成/复核"></el-step>
            </el-steps>
        </div>
        <div style="flex-grow: 1;">
            <el-row>
                <el-col :span="12">
                    <dl class="dllist cust-title">
                        <dt>报单类型 ：</dt>
                        <dd>
                            <el-radio-group v-model="type" @change="changeType" :disabled="!isEmployee || isAdd">
                                <el-radio-button label="INSTALL">安装单</el-radio-button>
                                <el-radio-button label="REPAIR">拆除/维修单</el-radio-button>
                            </el-radio-group>
                        </dd>
                    </dl>
                </el-col>
                <el-col :span="12">
                    <el-form :inline="true" style="float: right">
                        <el-form-item label="报单公司">
                            <el-select
                                    v-if="isEmployee && type === 'INSTALL'"
                                    v-model="corpid"
                                    filterable
                                    remote
                                    reserve-keyword
                                    placeholder="请选择报单公司"
                                    :remote-method="getCorpList"
                                    @focus="getCorpList('')">
                                <el-option
                                        v-for="item in corplist"
                                        :key="item.id"
                                        :label="item.corpname"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <span v-else>{{corpname}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <install-order v-if="type === 'INSTALL'" :corpid="corpid" :baseForm="baseForm" :flow="flow"></install-order>
            <maintain-order v-else :corpid="corpid" :baseForm="baseForm" :flow="flow"></maintain-order>
        </div>
    </div>

</template>

<script src="./index.js">
</script>

<style scoped lang="stylus">
    @import '../../../assets/styl/customerDeclaration.styl';
    @import '../../../assets/styl/variables.styl';
    .order-process-box {
        padding: 10px;
        display flex
    }

    .prompt-text {
        color danger-color
    }

</style>