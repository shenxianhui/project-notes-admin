// import * as THREE from 'three';
import events from '../enum/events'
export default {
  exportGuandaoData({ type }) {
    let guandaoData
    switch (type) {
      case '1':
        guandaoData = this.getGuandaoData1()
        break
      case '2':
        guandaoData = this.getGuandaoData2()
        break
      case '3':
        guandaoData = this.getGuandaoData3()
        console.log(guandaoData)
        break
      case '4':
        guandaoData = this.getGuandaoData4()
        break
      case 'cishan':
        guandaoData = this.cishanGuandaoData()
        break
      case 'dayushan':
        guandaoData = this.dayushanGuandaoData()
        break
      case 'daoli':
        guandaoData = this.daoliGuandaoData()
        break
      case 'digong':
        guandaoData = this.digongGuandaoData()
        break
      case 'guangming':
        guandaoData = this.guangmingGuandaoData()
        break
      case 'hongyun':
        guandaoData = this.hongyunGuandaoData()
        break
      case 'huagong3':
        guandaoData = this.huagong3GuandaoData()
        break
      case 'jiaoyuyuan':
        guandaoData = this.jiaoyuyuanGuandaoData()
        break
      case 'jinhua':
        guandaoData = this.hongyunGuandaoData()
        break
      case 'liaojian':
        guandaoData = this.daoliGuandaoData()
        break
      case 'longzeyuan':
        guandaoData = this.hongyunGuandaoData()
        break
      case 'xiaoqu4':
        guandaoData = this.daoliGuandaoData()
        break
      case 'dongfangguoji':
        guandaoData = this.daoliGuandaoData()
        break
      case 'wanghaishi':
        guandaoData = this.wanghaishiGuandaoData()
        break
      case 'wujintang':
        guandaoData = this.dayushanGuandaoData()
        break
      case 'xishan':
        guandaoData = this.dayushanGuandaoData()
        break
      case 'xinqu':
        guandaoData = this.dayushanGuandaoData()
        break
      case 'zhaolishan':
        guandaoData = this.jiaoyuyuanGuandaoData()
        break
      case 'CBD':
        guandaoData = this.dayushanGuandaoData()
        break
      case 'qingchunjiayuan':
        guandaoData = this.hongyunGuandaoData()
        break
      case 'xiuyuan':
        guandaoData = this.daoliGuandaoData()
        break
      case 'laohetai':
        guandaoData = this.laohetaiGuandaoData()
        break
      case 'yuhuangge':
        guandaoData = this.yuhuanggeGuandaoData()
        break
      case 'zhuanliyuan':
        guandaoData = this.dayushanGuandaoData()
        break
      case 'ercibengzhan':
        guandaoData = this.ercibengzhanGuandaoData()
        break
      case 'wenya':
        guandaoData = this.wenyaGuandaoData()
        break
      case 'wuni':
        guandaoData = this.wuniGuandaoData()
        break
      case 'jiayaojialv':
        guandaoData = this.jiayaojialvGuandaoData()
        break
      case 'jingshui':
        guandaoData = this.jingshuiGuandaoData()
        break
      case 'ertaizi':
        guandaoData = this.ertaiziGuandaoData()
        break
      case 'huailai':
        guandaoData = this.huailaiGuandaoData()
        break
      case 'ZLY':
        guandaoData = this.ZLYGuandaoData()
        break
      case 'LHT':
        guandaoData = this.LHTGuandaoData()
        break
      case 'YHG':
        guandaoData = this.YHGGuandaoData()
        break
      case 'YHGGY':
        guandaoData = this.YHGGYGuandaoData()
        break
      case 'YSC':
        guandaoData = this.getGuandaoDataYSC()
        break
      case 'RCBK':
        guandaoData = this.getGuandaoDataRCBK()
        break
      case 'RCBKFSC':
        guandaoData = this.getGuandaoDataRCBKFSC()
        break
      case 'RCBKFJY':
        guandaoData = this.getGuandaoDataRCBKFJY()
        break
      case 'RCBKJYJ':
        guandaoData = this.getGuandaoDataRCBKJYJ()
        break
      case 'RCBKLC':
        guandaoData = this.getGuandaoDataRCBKLC()
        break
      case 'RCBKCD':
        guandaoData = this.getGuandaoDataRCBKCD()
        break
      case 'LHTSC':
        guandaoData = this.getGuandaoDataLHTSC()
        break
      case 'ETZGY':
        guandaoData = this.getGuandaoDataETZGY()
        break
      case 'GXQ':
        guandaoData = this.getGuandaoDataGXQ()
        break
      case 'HLDBG':
        guandaoData = this.getGuandaoDataHLDBG()
        break
      case 'HLDDYS':
        guandaoData = this.getGuandaoDataHLDDYS()
        break
      case 'HLDWC':
        guandaoData = this.getGuandaoDataHLDWC()
        break
      case 'HLDXS':
        guandaoData = this.getGuandaoDataHLDXS()
        break
      case 'HLDXQ':
        guandaoData = this.getGuandaoDataHLDXQ()
        break
      case 'YHGSC':
        guandaoData = this.getGuandaoDataYHGSC()
        break
      case 'ZLYSC':
        guandaoData = this.getGuandaoDataZLYSC()
        break
      case 'JYJglb': //汝城加药间
        guandaoData = this.getGuandaoDataJYJglb()
        break
      case 'RCBFglb': //汝城泵房
        guandaoData = this.getGuandaoDataRCBFglb()
        break
      case 'CBDBZglb': //CBD泵站工艺debugger
        guandaoData = this.getPositionCBDBZ()
        console.log('hlpTest', guandaoData)
        break
      case 'LHTSWMX': //老合台三维模型
        guandaoData = this.getPositionLHTSWMX()
        break
      case 'ETZSCSP': //二台子水厂沙盘
      case 'ETZSCSPALARM': //二台子水厂沙盘
        guandaoData = this.getGuandaoDataEHTglb()
        break
      case 'ZSSCSP': //章山水厂沙盘
        guandaoData = this.getGuandaoDataZSglb()
        break
      case 'ZSSCSPALARM': //章山水厂沙盘
        guandaoData = this.getGuandaoDataZSALARMglb()
        break
      case 'CNTX': //苍南天信
        guandaoData = this.getGuandaoDataCNTXglb()
        break
      case 'SGWFY': //SGWFY
      case 'SGWFYALARM': //章山水厂沙盘
        guandaoData = this.getGuandaoDataSGWFYglb()
        break
      case 'GXQSC': //高新区水厂
        guandaoData = this.getPositionGXQSC()
        break
      case 'YHGSCSP': //玉皇阁水厂沙盘
        guandaoData = this.getPositionYHGGLB()
        break
      default:
        guandaoData = this.getGuandaoData1()
        break
    }
    return guandaoData
  },
  exportObjData({ type, configType }) {
    let objData
    switch (type) {
      case '1':
        objData = this.getObjData1()
        break
      case '2':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjData2()
        break
      case '3':
        objData = this.getObjData3()
        break
      case '4':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjData4()
        break
      case 'cishan':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataCishan()
        break
      case 'dayushan':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataDayushan()
        break
      case 'daoli':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataDaoli()
        break
      case 'digong':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataDigong()
        break
      case 'guangming':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataGuangming()
        break
      case 'hongyun':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataHongyun()
        break
      case 'huagong3':
        objData = this.getObjDataHuagong3()
        break
      case 'jiaoyuyuan':
        objData = this.getObjDataJiaoyuyuan()
        break
      case 'jinhua':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataHongyun()
        break
      case 'liaojian':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataLiaojian()
        break
      case 'longzeyuan':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataLongzeyuan()
        break
      case 'xiaoqu4':
        objData = this.getObjDataXiaoqu4()
        break
      case 'dongfangguoji':
        objData = this.getObjDataDongfangguoji()
        break
      case 'wanghaishi':
        objData = this.getObjDataWanghaishi()
        break
      case 'wujintang':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataWujintang()
        break
      case 'xishan':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataXishan()
        break
      case 'xinqu':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataXinqu()
        break
      case 'zhaolishan':
        objData = this.getObjDataZhaolishan()
        break
      case 'CBD':
        objData = this.getObjDataCBD()
        break
      case 'qingchunjiayuan':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataQingchunjiayuan()
        break
      case 'xiuyuan':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataXiuyuan()
        break
      case 'laohetai':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataLaohetai()
        break
      case 'yuhuangge':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataYuhuangge()
        break
      case 'zhuanliyuan':
        this.on(events.render, this.shanyeRotate.bind(this))
        objData = this.getObjDataZhuanliyuan()
        break
      case 'ercibengzhan':
        objData = this.getObjDataErcibengzhan()
        break
      case 'wenya':
        objData = this.getObjDataWenya()
        break
      case 'ertaizi':
        objData = this.getObjDataErtaizi()
        break
      case 'jingshui':
        objData = this.getObjDataJingshui()
        break
      case 'jiayaojialv':
        objData = this.getObjDataJiayaojialv()
        break
      case 'wuni':
        objData = this.getObjDataWuni()
        break
      case 'huailai':
        objData = this.getObjDataHuailai()
        break
      case 'ZLY':
        objData = this.getObjDataZLY()
        break
      case 'LHT':
        objData = this.getObjDataLHT()
        break
      case 'YHG':
        objData = this.getObjDataYHG()
        break
      case 'YHGGY':
        objData = this.getObjDataYHGGY()
        break
      case 'YSC':
        objData = this.getObjDataYSC()
        break
      case 'RCBK':
        objData = this.getObjDataRCBK()
        break
      case 'RCBKFSC':
        objData = this.getObjDataRCBKFSC()
        break
      case 'RCBKFJY':
        objData = this.getObjDataRCBKFJY()
        break
      case 'RCBKJYJ':
        objData = this.getObjDataRCBKJYJ()
        break
      case 'RCBKLC':
        objData = this.getObjDataRCBKLC()
        break
      case 'RCBKCD':
        objData = this.getObjDataRCBKCD()
        break
      case 'LHTSC':
        objData = this.getObjDataLHTSC()
        break
      case 'ETZGY':
        objData = this.getObjDataETZGY()
        break
      case 'GXQ':
        objData = this.getObjDataGXQ()
        break
      case 'HLDBG':
        objData = this.getObjDataHLDBG()
        break
      case 'HLDDYS':
        objData = this.getObjDataHLDDYS()
        break
      case 'HLDWC':
        objData = this.getObjDataHLDWC()
        break
      case 'HLDXS':
        objData = this.getObjDataHLDXS()
        break
      case 'HLDXQ':
        objData = this.getObjDataHLDXQ()
        break
      case 'YHGSC':
        objData = this.getObjDataYHGSC()
        break
      case 'ZLYSC':
        objData = this.getObjDataZLYSC()
        break
      case 'JYJglb':
        objData = this.getObjDataJYJglb()
        break
      case 'RCBFglb':
        objData = this.getObjDataRCBFglb()
        break
      case 'CBDBZglb': //CBD泵站工艺
        objData = this.getObjDataCBDBZglb()
        break
      case 'LHTSWMX': //老合台三维模型
        objData = this.getObjDataZLYSC()
        break
      case 'ETZSCSP': //二台子水厂沙盘
        objData = this.getObjDataEHZGLB(configType)
        break
      case 'ETZSCSPALARM': //二台子水厂沙盘
        objData = this.getObjDataEHZALARMGLB(configType)
        break
      case 'ZSSCSP': //章山水厂沙盘
        objData = this.getObjDataZSGLB(configType)
        break
      case 'ZSSCSPALARM': //章山水厂沙盘(异常)
        objData = this.getObjDataALARMZSGLB(configType)
        break
      case 'CNTX': //苍南天信
        objData = this.getObjectDataCNTX(configType)
        break
      case 'SGWFY': //SGWFY
        objData = this.getObjectDataSGWFY(configType)
        break
      case 'SGWFYALARM': //SGWFY
        objData = this.getObjectDataALARMSGWFY(configType)
        break
      case 'GXQSC': //高新区水厂
        objData = this.getObjDataGXQSCglb()
        break
      case 'YHGSCSP': //玉皇阁水厂沙盘
        objData = this.getObjDataYHGGLB()
        break
      default:
        objData = this.getObjData1()
        break
    }
    return objData
  },
}
