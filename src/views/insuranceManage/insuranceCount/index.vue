<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <h1 style="margin-bottom: 10px;">数据概况</h1>
                <div class="general-situation">
                    <!--<span>{{corporateinfo.corpname}}</span>-->
                    <el-select v-model="corpId" placeholder="请选择" filterable style="width: 200px; margin-right: 10px;" size="mini" @change="initPolicyno">
                        <el-option label="全部" value="" v-if="isEmployee"></el-option>
                        <el-option
                                v-for="item in corpList"
                                :key="item.id"
                                :label="item.corpname"
                                :value="item.corporateid">
                        </el-option>
                    </el-select>
                    <span>当前大保单编号</span>
                    <el-select v-model="policyno" placeholder="请选择" filterable style="width: 200px;" size="mini" @change="getInsuranceDataCount">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="item in policynos"
                                :key="item.id"
                                :label="item.policyno"
                                :value="item.policyno">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <el-row :gutter="40">
                <el-col :md="12" :lg="6">
                    <div class="count-box bg-cyan" @click="jump('insuranceList', isJump('insuranceList'))">
                        <div class="count-sum">{{countData.issue_num}}</div>
                        <div class="count-content">出单总数</div>
                    </div>
                </el-col>
                <el-col :md="12" :lg="6">
                    <div class="count-box bg-yellow" @click="jump('insuranceList', isJump('insuranceList'))">
                        <div class="count-sum">{{countData.issue_price_total}}</div>
                        <div class="count-content">出单保费（元）</div>
                        <div>最终保费以财务结算为准</div>
                    </div>
                </el-col>
                <el-col :md="12" :lg="6">
                    <div class="count-box bg-blue" @click="jump('policynoList', isJump('policynoList'))">
                        <div class="count-sum">{{countData.total_insurance_price}}</div>
                        <div class="count-content">总保费（元）</div>
                    </div>
                </el-col>
                <el-col :md="12" :lg="6">
                    <div class="count-box bg-red" @click="jump('policynoList', isJump('policynoList'))">
                        <div class="count-sum">{{countData.remain_insurance_price}}</div>
                        <div class="count-content">剩余保费（元）</div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="margin-top: 10px;">
            <div slot="header">
                <h1>出单趋势</h1>
            </div>
            <insurance-count-chart :corpId="corpId" :policyno="policyno"></insurance-count-chart>
        </el-card>
    </div>
</template>

<script src="./index.js"></script>

<style scoped lang="stylus">

</style>