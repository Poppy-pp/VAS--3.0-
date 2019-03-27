<!-- 首页 -->
<template>
    <div class="dashboard-wrap">

        <el-row :gutter="20">
            <grid-layout
                    :layout="layout"
                    :col-num="12"
                    :row-height="rowHeight"
                    :is-draggable="true"
                    :is-resizable="true"
                    :is-mirrored="false"
                    :vertical-compact="true"
                    :margin="[10, 10]"
                    :use-css-transforms="true">
                <grid-item v-for="item in layout"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                           @resizedEvent="resizedEvent">

                    <!-- 四个卡片 -->
                    <div :class="item.box + ' widget-card'" v-if="item.type==='card'">
                        <div class="leftPart">
                            <icon class="icon" :name="item.icon" :scale="5"></icon>
                        </div>
                        <div class="rightPart">
                            <div class="number">
                                <v-countup :start-value="start" :end-value="item.data"></v-countup>
                            </div>
                            <div class="font-center">{{item.title}}</div>
                        </div>
                    </div>

                    <!-- 待办事宜/订单统计 -->
                    <el-card shadow="hover" class="todo-wrap" v-else-if="item.type==='todoList'">
                        <div slot="header" class="todo-header">
                            <span>{{$t('dashboard.todo')}}</span>
                            <div class="enterTodo">
                                <el-input @keyup.enter.native="addTasks" v-model="newTasks" placeholder="新增留言"></el-input>
                            </div>
                        </div>
                        <div class="todo-list">
                            <div v-for="(todo, index) in todolist" :key="index">
                                <el-checkbox v-model="todo.state" :class="todo.state ? 'deleteline' : ''">{{todo.task}}</el-checkbox>
                            </div>
                        </div>
                    </el-card>
                    <div v-else-if="item.type==='ordersReceived'" class="line-chart widget-card">
                        <line-chart ref="lineChart" :height="(rowHeight * item.h + 10 * (item.h - 1)) - 20 + 'px'" :w="item.w"></line-chart>
                    </div>

                    <!-- 信息中心/占比统计 -->
                    <el-card shadow="hover" class="system-report" v-else-if="item.type==='messageCenter'">
                        <div slot="header" class="report-header">
                            <span class="">{{$t('dashboard.sr')}}</span>
                        </div>
                        <div class="report-content">
                            <el-tabs v-model="activeName" type="border-card" class="info-tab">
                                <el-tab-pane name="first">
                                    <span slot="label"><i class="el-icon-news"></i> 新闻中心</span>
                                    <el-row :gutter="20" v-for="item in newlist" @click.native="infoDetail(item.id)" class="showline">
                                        <el-col :span="18" class="autow">
                                            {{ item.title }}
                                        </el-col>
                                        <el-col :span="6" class="fixedw">
                                            {{ item.releasedate == null ? "" : dayjsTmp(new Date(item.releasedate)).format('YYYY-MM-DD') }}
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane name="second">
                                    <span slot="label"><i class="el-icon-time"></i> 通知公告</span>
                                    <el-row :gutter="20" v-for="item in noticeList" @click.native="infoDetail(item.id)" class="showline">
                                        <el-col :span="18" class="autow">
                                            {{ item.title }}
                                        </el-col>
                                        <el-col :span="6" class="fixedw">
                                            {{ item.releasedate == null ? "" : dayjsTmp(new Date(item.releasedate)).format('YYYY-MM-DD') }}
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane name="fourth">
                                    <span slot="label"><i class="el-icon-bell"></i> 红头文件</span>
                                    <el-row :gutter="20" v-for="item in redFileList" @click.native="infoDetail(item.id)" class="showline">
                                        <el-col :span="18" class="autow">
                                            {{ item.title }}
                                        </el-col>
                                        <el-col :span="6" class="fixedw">
                                            {{ item.releasedate == null ? "" : dayjsTmp(new Date(item.releasedate)).format('YYYY-MM-DD') }}
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-card>
                    <el-card shadow="hover" class="pie-wrap" v-else-if="item.type==='statistical'">
                        <div slot="header" class="pie-header">
                            <span class="">{{$t('dashboard.pch')}}</span>
                        </div>
                        <pie-chart :height="(rowHeight * item.h + 10 * (item.h - 1)) - 115 + 'px'" :w="item.w"></pie-chart>
                    </el-card>
                </grid-item>
            </grid-layout>
        </el-row>

        <!--信息中心详情弹窗-->
        <el-dialog :modal-append-to-body="false" :title="dtitle" top="10%" :visible.sync="showDetailVisible" :close-on-click-modal="false"></el-dialog>

    </div>
</template>

<script src="./index.js">

</script>
<style type="text/css">
    .system-report .el-card__body {
        padding: 0;
    }

    img {
        border: 0 none;
        max-width: 100%;
    }

</style>
<style lang="stylus">
    .flex-center
        display flex
        justify-content center
        align-items center

    box-style(bg)
        width 100%
        background white
        display flex
        .leftPart
            background bg
            width 130px
            @extend .flex-center

        .rightPart
            flex 1
            color #99a9c0
            @extend .flex-center
            flex-direction column
            .number
                font-size 30px
                padding-bottom 6px
            .font-center
                text-align center
                font-size 1.7rem

    .dashboard-row
        width 100%
        /*height 400px*/
        /*margin-top 15px*/
        background white

    .dashboard-wrap
        margin-top: -15px
        .box1
            box-style(#41b883)
            border 1px solid #ebeef5
        .box2
            box-style(#9ab7e0)
            border 1px solid #ebeef5
        .box3
            box-style(#f7c94d)
            border 1px solid #ebeef5
        .box4
            box-style(#e45f5f)
            border 1px solid #ebeef5

        .line-chart
            @extend .dashboard-row
            padding 15px
            box-sizing border-box
            border 1px solid #ebeef5

        .todo-wrap
            height 100%
            overflow-y auto
            @extend .dashboard-row
            .todo-header
                span
                    font-weight bold
                    color #6fb998
                .enterTodo
                    float right
                    width 140px
                    position relative
                    top -8px
                    right -11px
            .todo-list
                div:not(:first-child)
                    margin-top 15px

        .system-report
            height 100%
            overflow-y auto
            @extend .dashboard-row
            /*height 520px*/
            .report-header
                span
                    font-weight bold
                    color #6fb998
            .report-content
                .info-tab
                    font-size 14px
                .el-row
                    cursor pointer
                    margin 0 -10px 20px
                    .el-col-18
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                .showline
                    &:hover
                        color #41B883
                .el-tabs--border-card
                    border none
                    box-shadow none
                .el-alert:not(:first-child)
                    margin-top 15px
                .progress-wrap
                    margin-top 20px
                    text-align center
                    padding 20px
                    .el-progress:not(:first-child)
                        margin-left 20px

        .pie-wrap
            height 100%
            @extend .dashboard-row
            /*height 520px*/
            .pie-header
                span
                    font-weight bold
                    color #6fb998
</style>
