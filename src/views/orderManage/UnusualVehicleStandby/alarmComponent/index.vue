<template>
    <div class="alarmComponent">
        <div style="font-weight:bold;">报警组成</div>
        <div class="deviceInfo">
            <p>设备型号：有线WA</p>
            <p>编号：12345678965</p>
        </div>
        <ul>
            <li>2018-12-19 08:30:35,设备XXX报警</li>
            <li>2018-12-19 08:30:35,设备XXX报警</li>
            <li>2018-12-19 08:30:35,设备XXX报警</li>
        </ul>
    </div>
</template>
<script src="./index.js"></script>
<style>
.alarmComponent {
  width: 300px;
  line-height: 28px;
  text-align: center;
}
.deviceInfo {
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}
</style>

