<template>
  <div>
    <header>
      <h4 :style="{ textAlign: 'center', fontSize: '20px' }">
        <slot name="header"> 简约—日历 </slot>
      </h4>
      <div class="operation-month-btn">
        <van-button @click="handlerMonth(-1)">上个月</van-button>
        <van-button @click="resetMonth">重置</van-button>
        <van-button @click="handlerMonth(1)">下个月</van-button>
      </div>
    </header>
    <main>
      <div class="todayDate">{{ currentMonth.format('YYYY年MM月') }}</div>
      <!-- ["日", "一", '二', '三', '四', '五', '六'] -->
      <div class="header">
        <div
          v-for="(item, index) of weeksName"
          :key="index"
          class="header-item"
          :style="{ color: item === '日' || item === '六' ? 'red' : '' }"
        >
          {{ item }}
        </div>
      </div>
      <!-- 日历表 -->
      <div class="content">
        <div
          v-for="(item, index) of dateLists"
          :key="index"
          :class="[item.isRestDate ? 'restDateBox' : 'workDateBox', 'dateBox']"
          :style="{
            background: isToday(item) ? themeColor : undefined
          }"
          @click="selectDate(item)"
        >
          <span>{{ item.dateNumber }}</span>
          <span>
            {{ item.weekName }}
          </span>
          <span :class="[item.isRestDate ? 'restTag' : 'workTag']" v-if="!!item.weekName">
            {{ item.weekName === '周日' || item.weekName === '周六' ? '休' : '班' }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import customMixin from '@/utils/mixin'
import { inject } from 'vue'
const { markRaw, toRefs, reactive, defineEmits, defineProps, moment, getMonthNumber, getTimeInWeekdayNumber, getDate, getTimeInWeekday } = customMixin()
// 创建日列工厂函数 实现功能模块的解耦
defineEmits(['change'])
const users = inject('users')
console.log(users)
setTimeout(() => {
  users[0].name = '赵六'
}, 9000)
function createCalendar () {
  const data = reactive({
    currentMonth: markRaw(moment()),
    weeksName: markRaw(['日', '一', '二', '三', '四', '五', '六']),
    dateLists: markRaw([])
  })
  data.isToday = (date):boolean => {
    return (
      (date.momentDate && date.momentDate.format('YYYY/MM/DD')) ===
        moment().format('YYYY/MM/DD')
    )
  }
  // 上个月,下个月
  data.handlerMonth = (diff) => {
    data.currentMonth = data.currentMonth.add(diff, 'months')
    data.dateLists = markRaw(data.getDateLists(data.currentMonth))
  }
  // 重置
  data.resetMonth = () => {
    data.currentMonth = moment()
    data.dateLists = markRaw(data.getDateLists(data.currentMonth))
  }
  // 选中某个日期
  data.selectDate = (dateInstance) => {
    console.log(dateInstance)
  }
  // 获取时间数据结构
  data.getDateLists = (time) => {
    const MonthNumber = getMonthNumber(time)
    const tempDateList = []
    for (let index = 1; index <= MonthNumber; index++) {
      const weekNameIndex = getTimeInWeekdayNumber(getDate(index, time))
      const weekName = getTimeInWeekday(getDate(index, time))
      const obj = {
        weekName, // 周日
        dateNumber: index, // 几号
        weekNameIndex, // 周几索引
        momentDate: getDate(index, time), // 时间对象
        isRestDate: !!(weekName === '周日' || weekName === '周六'), // 是否休息日
        isDisabled: false // 是否禁用
      }
      tempDateList.push(obj)
    }
    const fisrtLength = tempDateList[0].weekNameIndex
    const lastLength = tempDateList[tempDateList.length - 1].weekNameIndex
    if (tempDateList[0].weekNameIndex !== 0) {
      for (let index = 0; index < fisrtLength; index++) {
        const obj = {
          weekName: '',
          dateNumber: '',
          weekNameIndex: ''
        }
        tempDateList.unshift(obj)
      }
    }
    if (lastLength !== 6) {
      for (let index = 0; index < 6 - lastLength; index++) {
        const obj = {
          weekName: '',
          dateNumber: '',
          weekNameIndex: ''
        }
        tempDateList.push(obj)
      }
    }
    return tempDateList
  }
  data.dateLists = reactive(data.getDateLists(moment()))
  return {
    data,
    ...toRefs(data)
  }
}
const {
  data,
  currentMonth,
  dateLists,
  weeksName,
  handlerMonth,
  resetMonth,
  isToday,
  selectDate
} = createCalendar()

setTimeout(() => {
  // data.weeksName[0] = '3'
  console.log(data)
}, 5000)
</script>
<script lang="ts">
export default {
  name: 'CalendarCard'
}
</script>
<style lang="less" scoped>
.display-conter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.operation-month-btn {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.todayDate {
  margin: 20px 0;
  text-align: center;
  color: #000;
}

.header {
  display: flex;
  width: 100%;
}
.header-item {
  flex: 1;
  text-align: center;
  height: 100px;
  line-height: 100px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.dateBox {
  position: relative;
  flex-direction: column;
  height: 100px;
  width: 14.28vw;
  text-align: center;
  background: #fff;
  .display-conter();
}
.restDateBox {
  color: #c0c4cc;
}
.tag {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
}
.workTag {
  background: #409eff;
  .tag();
}
.restTag {
  background: #f56c6c;
  .tag();
}
</style>
