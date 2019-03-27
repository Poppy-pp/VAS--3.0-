<template>
    <div>
        <el-collapse v-model="activeNames">
            <el-collapse-item v-if="storageInvoice && storageInvoice.listReceipt" :title="item.receiptno" :name="index" style="margin-bottom: 10px;" :key="item.receiptno"
                              v-for="(item, index) in storageInvoice.listReceipt">
                <invoice-detail :itemInvoice="item" :storageInvoice="storageInvoice" @submit="submit(index)"></invoice-detail>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script src="./index.js"></script>

<style scoped>

</style>